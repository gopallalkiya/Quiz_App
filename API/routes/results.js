const Results = require('../Schemas/resultSchema');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/getMyResults', auth, async (req, res) => {
    try {
        let results = await Results.find({ email_id: req.user.email_id });
        res.json(results);
    } catch (err) {
        res.status(500).json({ "status": "Result fetching failed" });
    }
});



module.exports = router;


