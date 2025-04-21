const {Router} = require("express")
const teacherControler = require("../Controllers/TeacherController")
const router = Router()
const {requireAuth} = require("../middleware/authMiddleware")

router.get("/dashboard",requireAuth,teacherControler.Dashbord_get)





module.exports = router