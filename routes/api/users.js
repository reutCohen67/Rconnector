const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

const User = require('../../models/Users');

// @route    POST api/users 
//@desc      Test route
//@access    Public

router.post('/', [
    check('name','Name is required').not().isEmpty(),
    check('email','A valid email is required').isEmail(),
    check('password','Please enter a password with 6 characters minimum').isLength({min:6})

],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});

    }

const {name,email,password} = req.body;

try{
    
    let user= await User.findOne({ email });

    //See if user exist
    if(user){
        res.status(400).json({errors: [ {msg: 'User already exist'}]});
    }

    //Get user gravatar
    const avatar = gravatar.url(email, {

        s: '200',
        r: 'pg',
        d: 'mm'

    })
 
    //creates a new user instance 
    user = new User({
        name,
        email,
        avatar,
        password
    });


    //for hashing
    const salt = await bcrypt.genSalt(10);

    //Encrypt password
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    
    //Return jsonwebtoken
    res.send('User registered');


}catch(err){
    console.error(err.message);
    res.status(500).send('server error');
}



//Return jsonwebtoken







});


module.exports = router;
