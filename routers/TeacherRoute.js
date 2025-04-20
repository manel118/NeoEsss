const {Router} = require("express")
const teacherControler = require("../Controllers/TeacherController")
const router = Router()
const authentication = require("../middleware/authMiddleware")

router.get("/dashboard",teacherControler.Dashbord_get)

module.exports = router