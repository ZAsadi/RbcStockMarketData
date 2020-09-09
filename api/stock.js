const {Container} = require('typedi')
const router = require('express').Router();
const multer = require('multer');

const upload = multer()

router.get('/', async (request, response, next) => {
    const stockServices = new (Container.get('StockServices'))();
    try {
        const result = await stockServices.get(request.query.stock);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (e) {
        next(e)
    }
});

router.post('/', async (request, response, next) => {
    const stockServices = new (Container.get('StockServices'))();
    try {
        const requestDTO = request.body;
        await stockServices.insert(requestDTO);
        response.status(200).json({});
    } catch (e) {
        next(e);
    }
});

router.post('/upload', upload.single('data'), async (request, response, next) => {
    const fileParser = new (Container.get('FileParser'))();
    const stockServices = new (Container.get('StockServices'))();
    try {
        const stocks = await fileParser.parse(request.file);
        await stockServices.insertAll(stocks);
        response.status(200).send("File has been uploaded successfully")
    } catch (error) {
        next(error)
    }
});

module.exports = router;