const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', auth, getUser);

module.exports = router;