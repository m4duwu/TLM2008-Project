const express = require('express')
let cors = require("cors");
// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()
router.use(cors());
// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router