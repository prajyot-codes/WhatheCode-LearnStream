const express = require('express')
const router =express.Router();
const {loginStudent,signupStudent}= require('../controllers/userstudentController');


router.post('/signup',signupStudent)
router.post('/login',loginStudent)

export default router