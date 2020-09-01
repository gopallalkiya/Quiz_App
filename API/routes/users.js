require('dotenv').config()

const auth = require('../middleware/auth');
var express = require('express');
var router = express.Router();
const User = require('../Schemas/userSchema');
const crypto = require('crypto');

router.post('/signup', async (req, res) => {
  let password = req.body.password;
  const newPassword = crypto.createHash('sha256').update(password).digest('hex');

  try {
    let user = new User({
      name: req.body.name,
      email_id: req.body.email_id,
      password: newPassword
    });
    await user.save();
    res.json({ "status": "User Created Successfully" });
  }
  catch (err) {
    res.status(500).json({ "status": "User already Exists" });
  }

});

router.get('/getUserDetails', auth, async (req, res) => {
  const user = await User.findOne({ email_id: req.user.email_id }).select({ _id: 0, __v: 0, password: 0 });
  res.json(user);
});

module.exports = router;
