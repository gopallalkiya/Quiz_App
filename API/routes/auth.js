const User = require('../Schemas/userSchema');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  let password = crypto.createHash('sha256').update(req.body.password).digest('hex');
  let user = await User.findOne({ email_id: req.body.email_id ,password: password});
  if (!user) return res.status(400).send('Invalid email or password.');
  const token = user.generateAuthToken();
  res.json({token:token,name:user.name});
});

module.exports = router; 
