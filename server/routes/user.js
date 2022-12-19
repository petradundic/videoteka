const express = require('express')
const User = require('../models/UsersModel')
var bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
const router = express.Router()
const {signJwt, verifyJwt} = require('../jwt');

//getting all

router.get('/', async (req, res) =>{
    try {
        const users=await User.find()
        console.log(users)
        res.json(users)
        
    } catch (error) {
        res.status(500).json({message:error.message})         
    }
})
//getting one

router.get('/:id',getUser,async (req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        console.log(req.params.id)
        res.json(user)
        
    } catch (error) {
        res.status(500).json({message:error.message})        
    }
})

//creating one
router.post('/register',jsonParser, async (req,res)=>{
    console.log("register")
    console.log(req.body)
    const user=new User({
    name:req.body.name,
    surname:req.body.surname,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    role:req.body.role
    })
    await user.save() 
    res.json(user)

})

router.post('/login',jsonParser,(req, res)=>{
    User.find({email: req.body.email}, function (error, users) { 
        if (error || users.length === 0) {
            return res.json({message: "email"});
        }
        if (req.body.email !== users[0].email) {
            return res.json({message: "email"})
        }
        bcrypt.compare(req.body.password, users[0].password, function(err, result) {
            if (result) {
                const token = signJwt(users[0]._id);
                const myuser = {name:users[0].name, role:users[0].role}
                return res.json({accessToken: token, user_id: users[0].id, user_role: users[0].role,  user_name:users[0].name});
           
            }
            else {
                return res.json({message: "password"})
            }
          });
    })
});

//update one
router.post('/:id',jsonParser, getUser, async  (req,res)=>{
    if(req.body.name != null){
        res.user.name=req.body.name
    }
    if(req.body.surname != null){
        res.user.name=req.body.name
    }
    if(req.body.username != null){
        res.user.name=req.body.name
    }
    if(req.body.email != null){
        res.user.email=req.body.email
    }
    if(req.body.password != null){
        res.user.password=req.body.password
    }
    if(req.body.role != null){
        res.user.role=req.body.role
    }
    
    try {
        const updateUser=await res.user.save()
        res.json(updateUser.ime)
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


//delete one
router.delete('/:id',getUser,async (req,res)=>{
     try {
       await res.user.remove()
        res.json({message:'User deleted'})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
})

async function getUser(req,res,next){
    let user

    try {
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message:'Cannot find user'})
        }
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
    res.user=user
    next()
}
module.exports = router;