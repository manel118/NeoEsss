const {Router} = require("express")
const StudentControler = require("../Controllers/StudantControler")
const router = Router()
const authentication = require("../middleware/authMiddleware")

router.get("/dashboard",authentication.requireAuth,StudentControler.Dashbord_get)

module.exports = router