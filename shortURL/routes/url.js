const express = require('express');
const { handleCreateShortURL, handleRedirectTo, handleShowAnalytics } = require('../controllers/url');

const router = express.Router();

router.post('/', handleCreateShortURL);
router.get('/:shortID', handleRedirectTo)
router.get('/analytics/:shortID', handleShowAnalytics)

module.exports = router;