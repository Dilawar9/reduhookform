const User = require("../model/UserModel");
const bcrypt = require('bcrypt');
const {generateToken} = require("../helper/utils");
const cloudinary = require("cloudinary");

const dotenv = require('dotenv');
dotenv.config();



cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Checking if the user already exists in the database
        const arleadyUser = await User.findOne({ email: email });
        if (arleadyUser) {
            return res.status(409).json({ status: "failed", message: "Email is already registered" })
        }

        //  Encrypting the password using Bcrypt
        const salt = await bcrypt.genSalt(10);
        hashed = await bcrypt.hash(password, salt);

        //  Creating a new user with encrypted password and saving it to the database
        const user = new User({ name, email, password: hashed });
        await user.save();

        //  Sending back a response with a status of Created (201) and the newly created
        res.status(201).json({ name: user.name, email: user.email, token: generateToken(user) });

    } catch (error) {
        console.log(`Error in SignUp ${error}`);
        res.status(500).json({ status: 'Failed', message: error.message });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user =  await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ status: 'failed', message: 'Invalid Email or Password' });
        }

        // Verify the password using bcrypt compare method
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(401).json({ status:'failed', message:"Invalid Email or Password"})
        }

        return res.status(200).json({
            status: 'success',
            token: generateToken(user) ,
            user:user
        })


    } catch (error) {
        console.log(`Error in SignUp ${error}`);
        res.status(500).json({ status: 'Failed', message: error.message });
    }
}

// update profile

const updateuser = async (req, res) => {
    console.log('22222')
    
        try {
            // converting buffer into base64
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const photoObject = await cloudinary.v2.uploader.upload(dataURI);
            // create post
            
          
    
            const user= await User.findByIdAndUpdate(req.userId,{name:req.body.name,email:req.body.email,photo:photoObject.url},{new:true});
         
    
            return res.status(201).json({
                status: 'success',
                message: "successfully created",
                user: user
            })
        } catch (error) {
            console.log(error.message);
        }
    }


    // get user
    const getuser = async (req, res) => {
        try {
             
            const user =  await User.findById(req.userId)
            return res.status(200).json({
                status: 'success',
                token: generateToken(user) ,
                user:user
            })
    
    
        } catch (error) {
            console.log(`Error in SignUp ${error}`);
            res.status(500).json({ status: 'Failed', message: error.message });
        }
    }



module.exports = { signup, login,updateuser,getuser }