const { Formidable } = require("formidable");
const fs = require("fs");
var xlsx = require('xlsx');
const bcrypt = require("bcryptjs");
const logger = require("../logger");
const jwt = require("jsonwebtoken");

const { getPagingData, getPagination } = require("./helper/pagination.helper")

const db = require("../models");
const Op = db.Sequelize.Op;
const Employee = db.employee;
const Admin = db.admin;

exports.addEmpsInBulk = async (req, res, next) => {

    let adminCheck = await Admin.findOne({ where: { id: req.params.admin_id } })
    if (!adminCheck)
        return res.status(200).json({
            status: false,
            message: "Admin not found",
            data: {},
        });

    let resp = await uploadExcelSheet(req)

    // res.send(resp)
    if (resp.status) {
        let x = await convertExcelFileToJsonUsingXlsx(resp.path)

        for (let i = 0; i < x.length; i++) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hashSync((x[i].password).toString(), salt);
            x[i].password = hashedPassword
            x[i].admin_id = req.params.admin_id
        }
        fs.unlinkSync(resp.path);

        let emps = await await Employee.bulkCreate(x, { ignoreDuplicates: true });

        return res.send(emps)
    }

    return res.status(200).json({
        status: false,
        message: "Error while uploading file",
        data: {}
    })
}

async function uploadExcelSheet(req) {
    var options = {
        uploadDir: __dirname + "/uploads/",
        maxFileSize: 1024 * 1024 * 1024, // 1 GB
        multiples: true,
    };
    const form = new Formidable(options);
    form.on("progress", async (bytesReceived, bytesExpected) => {
        console.log(bytesReceived, bytesExpected);
    });

    let formfields = new Promise(function (resolve, reject) {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                //   console.log(err);
                //   return;
                logger.error(err.message);
                return reject({ status: false, message: err.message });
            }

            if (files.filetoupload == undefined) {
                return reject({ status: false, message: "No File Found" });
            }

            // Check if multiple files or a single file
            if (!files.filetoupload.length) {
                //Single file

                const file = files.filetoupload;
                const type = file.originalFilename.split(".").pop();

                const isFileValid = (file) => {
                    // const validTypes = ["jpg", "jpeg", "png", "pdf"];
                    const validTypes = [
                        "xlsx",
                        "xlsm",
                        "xlsb",
                        "csv"
                    ];
                    if (validTypes.indexOf(type) === -1) {
                        return false;
                    }
                    return true;
                };

                // checks if the file is valid
                const isValid = isFileValid(file);

                // creates a valid name by removing spaces
                const fileName = encodeURIComponent(
                    // new Date().getTime() + "-" + file.originalFilename.replace(/\s/g, "-")
                    new Date().getTime() + "-" + file.originalFilename.replace(/[^A-Z0-9]+/ig, "_") + '.' + type
                );

                if (!isValid) {
                    // throes error if file isn't valid
                    return reject({
                        status: false,
                        message: "The file type is not a valid type",
                    });
                }
                try {
                    // renames the file in the directory
                    let fURL = `${options.uploadDir}${fileName}`;
                    console.log(fURL);
                    fs.renameSync(file.filepath, fURL);
                } catch (error) {
                    console.log(error);
                    logger.error(error.message);
                    return reject({
                        status: false,
                        message: error.message,
                    });
                }

                try {
                    // stores the fileName in the database
                    // const newFile = await File.create({
                    //   name: `files/${fileName}`,
                    // });
                    return resolve({
                        status: true,
                        path: `${options.uploadDir}${fileName}`,
                        message: "File uploaded successfully!!",
                    });
                } catch (error) {
                    logger.error(error.message);
                    console.log(error);
                    return reject({
                        status: false,
                        message: error.message,
                    });
                }
            }
        });
    })

    return formfields
}

async function convertExcelFileToJsonUsingXlsx(path) {
    // Read the file using pathname
    const file = xlsx.readFile(path);
    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;
    // Variable to store our data 
    let parsedData = [];
    // Loop through sheets
    for (let i = 0; i <= totalSheets; i++) {
        // Convert to json using xlsx
        const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
        // Skip header row which is the colum names

        // Add the sheet's json to our data array
        parsedData.push(...tempData);
    }
    // call a function to save the data in a json file
    // console.log(parsedData);
    return (parsedData);
}


exports.getAllEmployees = async (req, res, next) => {
    try {
        const { page, size } = req.query;
        if (size > 100)
            return res.status(200).json({
                status: false,
                message: "Size limit exceed. Size must be <= 100"
            })
        const { limit, offset } = getPagination(page, size);
        const condition = { admin_id: req.params.admin_id }
        Employee.findAndCountAll({ where: condition, limit, offset, attributes: { exclude: ['password'] } })
            .then(data => {
                const response = getPagingData(data, page, limit);
                response.status = true
                response.message = "success"
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });

    } catch (error) {
        logger.error(error.message);
        console.log(error);
        return res.status(200).json({
            status: false,
            message: error.message,
        });
    }
}

