const express = require("express");
const { registerHandler } = require("../handler/register");
const { verifyToken } = require("../middleware/verifyToken");
const { loginHandler } = require("../handler/loginHandler");
const { verifyEmailHandler } = require("../handler/verifyEmailHandler");
const { forgetHandler } = require("../handler/forgetHandler");
const { resetPassword } = require("../handler/resetPassword");
const { registorEmployee } = require("../handler/registorEmployee");
const { logOut } = require("../handler/logoutHandler");
const { verifyReset } = require("../handler/verifyReset");
const { addNEwCategory } = require("../handler/news/addCategory");
const { getNEwCategory } = require("../handler/news/getCategory");
const { deletenewsCategoryHandler } = require("../handler/news/deleteCategory");
const { addNews } = require("../handler/news/addNews");
const { getNews } = require("../handler/news/getNews");
const { getNew } = require("../handler/news/getNew");
const { updateNew } = require("../handler/news/updateNew");
const { deleteNew } = require("../handler/news/deleteNew");
const { getServices } = require("../handler/services/getServices");
const { getService } = require("../handler/services/getService");
const { deleteService } = require("../handler/services/deleteService");
const { addServices } = require("../handler/services/addServices");
const { addServiceCategory } = require("../handler/services/addCategory");
const { getServiceCategory } = require("../handler/services/getCategory");
const { deleteServiceCategory } = require("../handler/services/deleteCategory");
const {
  getSingleServiceCategory,
} = require("../handler/services/getSingleCategory");
const { updateServiceCategory } = require("../handler/services/updateCategory");
const { updateService } = require("../handler/services/updateService");
const { getProducts } = require("../handler/products/getProducts");
const { getProduct } = require("../handler/products/getProduct");
const { updateProduct } = require("../handler/products/updateProduct");
const { addProducts } = require("../handler/products/addProducts");
const { deleteProduct } = require("../handler/products/deleteProduct");
const { createPartnership } = require("../handler/partneship/addPartnership");
const { getPartnership } = require("../handler/partneship/getPartneship");
const { deletePartnership } = require("../handler/partneship/deleteParnership");
const { getUsers } = require("../handler/users/getUsers");
const { verifyEmailToken } = require("../middleware/verifyEmailToken");
const { deleteUsers } = require("../handler/users/deleteUsers");
const { changeStatus } = require("../handler/users/changeStatus");
const { addTestimonial } = require("../handler/testimonial/addTestimonial");
const { getTestimonial } = require("../handler/testimonial/getTestimonial");
const {
  deleteTestimonial,
} = require("../handler/testimonial/deleteTestimonial");
const { addProfile } = require("../handler/company/addProfile");
const { getCompany } = require("../handler/company/getCompany");
const { updateCompany } = require("../handler/company/updateCompany");
const { createContactUS } = require("../handler/contactUS/addContact");
const { getContactUS } = require("../handler/contactUS/getContactUs");
const { setupPassword } = require("../handler/setupAccount");
const { dashboard } = require("../handler/metaData/dashboard");
const { subscribe } = require("../handler/subscribe/addSubscrib");
const router = express.Router();

// authentication router handler
router.post("/register", registerHandler);
router.post("/verifyEmail", verifyEmailToken, verifyEmailHandler);
router.post("/login", loginHandler);
router.post("/forgetPassword", forgetHandler);
router.post("/resetPassword", resetPassword);
router.post("/registerEmployee", verifyToken, registorEmployee);
router.post("/logout", logOut);
router.post("/resetPasswordVerify", verifyEmailToken, verifyReset);
router.get("/getUsers", verifyToken, getUsers);
router.delete("/deleteUser/:id", verifyToken, deleteUsers);

//news router handler
router.post("/createNewsCategory", verifyToken, addNEwCategory);
router.get("/getNewsCategory", verifyToken, getNEwCategory);
router.get("/getNews", verifyToken, getNews);
router.get("/getNew", verifyToken, getNew);
router.put("/updateNew", verifyToken, updateNew);
router.delete("/deleteNew/:id", verifyToken, deleteNew);
router.post("/createNews", verifyToken, addNews);
router.delete(
  "/deteteNewsCategory/:id",
  verifyToken,
  deletenewsCategoryHandler
);

//service router handler
router.get("/getServices", verifyToken, getServices);
router.get("/singleService", verifyToken, getService);
router.delete("/deleteService/:id", verifyToken, deleteService);
router.post("/createService", verifyToken, addServices);
router.get("/getServiceCategory", verifyToken, getServiceCategory);
router.post("/createServiceCategory", verifyToken, addServiceCategory);
router.delete("/deleteServiceCategory/:id", verifyToken, deleteServiceCategory);
router.put("/updateService", verifyToken, updateService);
router.get("/getSingleServiceCategory", verifyToken, getSingleServiceCategory);
router.put("/updateServiceCategory", verifyToken, updateServiceCategory);

// products router handler
router.get("/getProducts", getProducts);
router.get("/getProduct", verifyToken, getProduct);
router.put("/updateProduct", verifyToken, updateProduct);
router.post("/addProducts", verifyToken, addProducts);
router.delete("/deleteProduct/:id", verifyToken, deleteProduct);

// stackholders

router.post("/addStackholders", verifyToken, createPartnership);
router.get("/getStackholders", verifyToken, getPartnership);
router.delete("/deleteStackholder/:id", verifyToken, deletePartnership);

//testimonial handler
router.post("/addTestimonial", verifyToken, addTestimonial);
router.get("/getTestimonial", getTestimonial);
router.delete("/deleteTestimonial/:id", deleteTestimonial);

// users handler

router.get("/users", getUsers);
router.put("/changeStatus", verifyToken, changeStatus);
router.delete("/deleteUser", verifyToken, deleteUsers);

// Profile Handler

router.post("/addProfile", verifyToken, addProfile);
router.get("/getProfile", verifyToken, getCompany);
router.put("/updateProfile", verifyToken, updateCompany);

//contact us handler
router.post("/contactUs", createContactUS);
router.get("/getContact", getContactUS);
router.post("/setupPassword", verifyEmailToken, setupPassword);

//meta datahndler

router.get("/metadata", dashboard);

//subscribe handler

router.post("/subscrib", subscribe);

module.exports = { router };
