const shortid = require('shortid');
const URL = require('../models/url');

async function handleCreateShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ errro: "Url required" });
    const shortID = shortid();
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render('home', { id: shortID });
    // return res.status(201).json({ id: shortID });
}

async function handleRedirectTo(req, res) {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID: shortID
    }, {
        $push: {
            visitHistory: {
                timeStamps: Date.now()
            }
        }
    })
    if (!entry) return res.status(400).json({ error: "No url present with this id" });
    res.redirect(entry.redirectURL);
}

async function handleShowAnalytics(req, res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortID: shortID });
    if (!result) return res.status(400).json({ error: "No url present with this short id" });
    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleCreateShortURL,
    handleRedirectTo,
    handleShowAnalytics
}