const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get("/", (req, res) => {
    res.redirect("/")
});

router.get("/:city", async (req, res) => {
    try {
        const response = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: req.params.city,
                appid: process.env.API_KEY,
                units: "metric",
                lang: req.acceptsLanguages()[0].substring(0, 2)
            }
        });

        res.render("city", {
            data: response.data
        })
    } catch (error) {
        res.render("cityNotFound")
    }
});

module.exports = router;