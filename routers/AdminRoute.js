const {Router} = require("express")
const AdminControler = require("../Controllers/AdminControler")
const {login_post , logout_get} = require("../Controllers/AuthControler")
const router = Router()
const {requireAuth} = require("../middleware/authMiddleware")

router.get("/login",requireAuth,AdminControler.login_get)
router.post('/login', login_post);
router.get('/logout', logout_get);
router.get("/dashboard",requireAuth,AdminControler.Dashbord_get)
router.post('/create_student_account',requireAuth,AdminControler.create_user_account_post)

//login

module.exports = router
