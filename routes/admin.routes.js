module.exports = (app) => {
    const admin = require("../controller/admin.controller");

    const { authAdmin } = require("../controller/helper/admin-jwt");

    var router = require("express").Router();

    router.post("/create-admin", admin.createAdmin);
    router.post("/login-admin", admin.loginAdmin);
    router.get("/", authAdmin, admin.getAllAdmins);
    router.get("/:id(\\d+)", authAdmin, admin.getAnAdmin);
    router.put("/update-admin/:id(\\d+)", authAdmin, admin.updateAdmin);

    // router.post("/xls/:admin_id(\\d+)", admin.addAdminsInBulk);
    // router.delete("/delete-admin/:id", authAdmin, admin.deleteAdmin);

    app.use("/api/admin", router);
};