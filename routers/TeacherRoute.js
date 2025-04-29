const {Router} = require("express")
const teacherControler = require("../Controllers/TeacherController")
const router = Router()
const {requireAuth} = require("../middleware/authMiddleware")

router.get("/dashboard",requireAuth,teacherControler.Dashbord_get)
router.get("/get_classes",requireAuth,teacherControler.get_classes)
router.get("/login",requireAuth,teacherControler.get_login)





module.exports = router