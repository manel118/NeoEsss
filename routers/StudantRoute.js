const {Router} = require("express")
const StudentControler = require("../Controllers/StudantControler")
const {login_post} = require("../Controllers/AuthControler")

const router = Router()
const {requireAuth} = require("../middleware/authMiddleware")

router.get("/dashbord",requireAuth,StudentControler.Dashbord_get)


module.exports = router