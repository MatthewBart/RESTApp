const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Route for getting all / GET
router.get('/', async (req, res)=>{
    try{
        const users =  await User.find()
        res.json(users)
        
    } catch(err){
        res.status(500).json({message: err.message})
    }
})
// Getting a specific id
router.get('/:id', getUser,(req, res)=>{
    res.json(res.user.userName)
})
// Creating / POST
router.post('/', async (req, res)=>{
    const user=new User({
        userName: req.body.userName,
        admin: req.body.admin
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})
// Updating 
router.patch('/:id', getUser, async (req, res)=>{
    if(req.body.userName != null){
        res.user.userName = req.body.userName
    }
    if(req.body.admin != null){
        res.user.admin = req.body.admin
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// Deleting a specific ID
router.delete('/:id', getUser, async (req, res)=>{
    try{
        await res.user.remove()
        res.json({message: "Deleted User"})
    }catch(err){
        res.status(500).json({message: err.message})
    }

})

async function getUser(req,res,next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(400).json({message: 'Cannot find User'})
        }
    } catch(err){
        return res.statue(500).json({message:err.message})
    }
    res.user = user
    next()
}

module.exports = router