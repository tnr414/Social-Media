const express = require('express');
const { signUP, signIn } = require("../controllers/user");


const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUP);


module.exports = router;
