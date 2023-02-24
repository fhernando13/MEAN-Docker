const { Router } = require('express');
const router = Router();

const userCtrl = require('../controllers/user.controllers');

// /api/users
router.get('/', userCtrl.getUsers);


router.get('/:id', userCtrl.getOneUser);


router.post('/', userCtrl.createUser);


router.put('/:id', userCtrl.updateUser);


router.delete('/:id', userCtrl.deleteUser);


module.exports = router;