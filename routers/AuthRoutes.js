
const {Router} = require("express")
const authController = require("../Controllers/AuthControler")
const router = Router()



router.get('/signup', authController.signup_get); // for me this will be a route for the admin to create an account a new studant/teacher
router.post('/signup', authController.signup_post); // for me this will be a route for the admin to create an account a new studant/teacher
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);




module.exports = router
