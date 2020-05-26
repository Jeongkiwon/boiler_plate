const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {User} = require("./models/User")
const config = require('./config/key')
const cookieParser = require('cookie-parser')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

app.use(cookieParser());

mongoose.connect(config.mongoURI
,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false})
.then(()=>console.log('MongoDB connected')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login',(req, res)=>{
    User.findOne({email:req.body.email}, (err,user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "입력하신 이메일은 없는 이메일입니다."
            })
        }
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "입력하신 비밀번호가 일치하지 않습니다."
                })
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                res.cookie("x_auth",user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })
        })
    })
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));