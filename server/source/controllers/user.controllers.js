const userCtrl = {}

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    try{
        const users = await User.find()
        return res.status(200).json(users);
    }catch{
        console.log("Error: ", error);
        return res.status(404).send("Error");
    }
    
};

userCtrl.createUser = async (req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        console.log("User created");
        return res.status(200).send('User created successfull');
    }catch{
        console.log("Error: ", error);
        return res.status(404).send("Error")
        }
};

userCtrl.getOneUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        console.log(user)
        return res.status(200).send('getting one user: '+user);
    }catch{
        console.log("Error: ",err);
        return res.status(404).send("User not exist");
        }
};

userCtrl.deleteUser = async (req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        return res.status(200).send('User deleted!!');        
    }catch{
        console.log("Error: ");
        return res.status(404).send("User not exist");
        }
};

userCtrl.updateUser = async (req, res) =>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send('Updated user!!!');        
    }catch{
        console.log("Error: ",err);
        return res.status(404).send("User not exist");
        }
};

module.exports = userCtrl;