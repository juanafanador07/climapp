const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("index");
});

router.post("/", (req, res) => {
    res.redirect(`/city/${req.body.city}`);
});

module.exports = router;