const {Router} = require("express")
const AdminControler = require("../Controllers/AdminControler")
const router = Router()
const {checkUser} = require("../middleware/authMiddleware")
router.get("/dashboard",AdminControler.Dashbord_get)
router.post('/create_student_account',AdminControler.create_student_account_post)

module.exports = router