const mongoose = require("mongoose")
const express = require("express")
const app = express()
const dbURI = "mongodb+srv://tuts123:tuts123@cluster0.w9ocv.mongodb.net/Esss"
const cookieParser = require("cookie-parser")
const AuthRouter = require("./routers/AuthRoutes")
const adminRouters = require('./routers/AdminRoute')
const studentRouters = require('./routers/StudantRoute')
const teacherRouters = require('./routers/TeacherRoute')
const {requireAuth} = require('./middleware/authMiddleware')


//midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser())

//connect to DB
mongoose.connect(dbURI)
    .then(() => {
        app.listen(3000)
    }).catch(err => console.log(err.message))


    // website
app.get('/', requireAuth, (req, res) => {
    if (req.user) {
        const user = req.user
         res.redirect(`/${user.role}/dashboard`);
    } else {   res.send("home page") }
})



app.use(AuthRouter)

// cookies
app.get('/set_cookies', (req, res) => {
  // header name and value == cookies idenfidication
    // res.cookie('newUser2', false, {
    //     httpOnly: true,
    //     maxAge: 1,
    //     secure: true,
    //     httpOnly: true // can't access it from front-end
    // });
    res.cookie('jwt', false, {
        httpOnly: true
    })

    res.send("you got the cookie!")
})
app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    res.json(cookies)
})
app.use('/admin', adminRouters)
app.use('/student', studentRouters)
app.use('/teacher', teacherRouters)
