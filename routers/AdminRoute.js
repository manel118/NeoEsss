const {Router} = require("express")
const AdminControler = require("../Controllers/AdminControler")
const {login_post , logout_get} = require("../Controllers/AuthControler")
const router = Router()
const {requireAuthAdmin} = require("../middleware/authMiddleware")

router.get("/login",requireAuthAdmin,AdminControler.login_get)
router.post('/login', AdminControler.login_post);
router.get('/logout', AdminControler.logout_get);
router.get("/dashboard",requireAuthAdmin,AdminControler.Dashbord_get)
router.post('/create_student_account',AdminControler.create_user_account_post)

//login

module.exports = router
