const userCtrl = {}

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
};

userCtrl.createUser = async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.send('User created successfull')
};

userCtrl.getOneUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    console.log(user)
    res.send('getting one user: '+user)
};

userCtrl.deleteUser = async (req, res) =>{
    const user = await User.findById(req.params.id)
    res.send('delete user: ', user)
    user.deleteOne()
    res.send('delete user: ', user)
};

userCtrl.updateUser = async (req, res) =>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send('Updated user: ');
};

module.exports = userCtrl;