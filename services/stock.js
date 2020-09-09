const {Container} = require('typedi')

class StockService {
    constructor() {
        this.Stock = Container.get('Stock');
        this.options = {lean: false};
    }

    async insertAll(stocks) {
        await this.Stock.insertMany(stocks, this.options);
    }

    async insert(stockDTO) {
        return new Promise(((resolve, reject) => {
            const stock = new this.Stock(stockDTO);
            if (!stock.validateSync()) {
                this.Stock.create(stock, (err) => {
                    if (err) {
                        const error = new Error("Can not insert data into database")
                        error.status = 400;
                        reject(error)
                    } else {
                        resolve(stockDTO);
                    }
                });
            } else {
                const error = new Error("There is something missing in stock market data")
                error.status = 400;
                reject(error)
            }
        }));
    }

    async get(name) {
        return new Promise((resolve, reject) => {
            let query = {};
            if (name && name.length > 0)
                query = {stock: name};
            this.Stock.find(query, (err, result) => {
                if (err) {
                    const error = new Error("Can not fetch stock data from database")
                    error.status = 500;
                    reject(error)
                } else {
                    resolve(result)
                }
            }).exec();
        });
    }
}

module.exports = StockService;
