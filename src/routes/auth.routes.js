const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

console.log("UPLOAD =", JSON.stringify(upload, null, 2));
console.dir(upload, { depth: null });
console.log("TYPE =", typeof upload);
console.log("SINGLE =", upload.single);

const {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    uploadProfileImage,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", auth, getProfile);

router.put("/profile", auth, updateProfile);

router.put("/change-password", auth, changePassword);

//router.post(
  //  "/upload-profile",
    //auth,
    //upload.single("profileImage"),
 //   uploadProfileImage
//);

module.exports = router;