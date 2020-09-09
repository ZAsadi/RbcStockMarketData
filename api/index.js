const path = require('path');
const router = require('express').Router();


router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/index.html'));
});

router.use('/stock', require('./stock'));

router.use((request, response, next) => {
    const error = new Error("The request url not found on the server")
    error.status = 404;
    next(error);
});

module.exports = router;