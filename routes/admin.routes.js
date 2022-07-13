module.exports = (app) => {
    const admin = require("../controller/admin.controller");
  
    // const { authAdmin } = require("../controller/helper/admin-jwt");
  
    var router = require("express").Router();
  
    router.post("/create-admin", admin.createAdmin);
    router.post("/login-admin", admin.loginAdmin);
    router.get("/", admin.getAllAdmins);
    router.get("/:id", admin.getAnAdmin);
    router.put("/update-admin/:id", admin.updateAdmin);
    // router.delete("/delete-admin/:id", authAdmin, admin.deleteAdmin);
  
    app.use("/api/admin", router);
  };