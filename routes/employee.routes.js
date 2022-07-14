module.exports = (app) => {
    const employee = require("../controller/employee.controller");

    const { authAdmin } = require("../controller/helper/admin-jwt");

    var router = require("express").Router();


    router.post("/xls/:admin_id(\\d+)", employee.addEmpsInBulk);
    router.get("/:admin_id(\\d+)", employee.getAllEmployees);
    // router.delete("/delete-admin/:id", authAdmin, admin.deleteAdmin);

    app.use("/api/employee", router);
};