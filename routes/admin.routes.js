module.exports = (app) => {
    const admin = require("../controller/admin.controller");

    const { authAdmin } = require("../controller/helper/admin-jwt");

    var router = require("express").Router();

    router.post("/create-admin", admin.createAdmin);
    router.post("/login-admin", admin.loginAdmin);
    router.get("/", authAdmin, admin.getAllAdmins);
    router.get("/:id", authAdmin, admin.getAnAdmin);
    router.put("/update-admin/:id", authAdmin, admin.updateAdmin);
    // router.delete("/delete-admin/:id", authAdmin, admin.deleteAdmin);

    app.use("/api/admin", router);
};