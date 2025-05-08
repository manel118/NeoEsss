const {Router} = require("express")
const AdminControler = require("../Controllers/AdminControler")
const {login_post , logout_get} = require("../Controllers/AuthControler")
const router = Router()
const {requireAuthAdmin} = require("../middleware/authMiddleware")

router.get("/login",requireAuthAdmin,AdminControler.login_get)
router.post('/login', AdminControler.login_post);
router.get('/logout', AdminControler.logout_get);
router.get("/dashboard",requireAuthAdmin,AdminControler.Dashbord_get)
router.post("/get_users",AdminControler.get_users)
router.post('/add_new_user',AdminControler.create_user_account_post)
router.delete('/delete-teacher/:id',AdminControler.delete_teacher)
router.get("/fix_classes",AdminControler.fix_classes)

//module section functions
router.post("/add_module",AdminControler.add_module)
router.get("/get_modules",AdminControler.get_modules)
router.get("/getMatiereByClass/:classeId",AdminControler.getMatrireByclass)

//login

module.exports = router
