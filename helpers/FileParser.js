const readline = require('readline');
const {Container} = require('typedi');
const stream = require('stream');

class FileParser {

    async parse(file) {
        return new Promise(((resolve, reject) => {
            const bufferStream = new stream.PassThrough();
            try {
                bufferStream.end(file.buffer, () => {
                    this.readline = readline.createInterface({input: bufferStream})
                    let count = 0;
                    const errorLines = [];
                    const stocks = [];
                    this.readline.on('line', (line) => {
                        count += 1;
                        const keys = line.split(',');
                        const data = {
                            quarter: keys[0],
                            stock: keys[1],
                            date: keys[2],
                            open: keys[3],
                            high: keys[4],
                            low: keys[5],
                            close: keys[6],
                            volume: keys[7],
                            percent_change_price: keys[8],
                            percent_change_volume_over_last_wk: keys[9],
                            previous_weeks_volume: keys[10],
                            next_weeks_open: keys[11],
                            next_weeks_close: keys[12],
                            percent_change_next_weeks_price: keys[13],
                            days_to_next_dividend: keys[14],
                            percent_return_next_dividend: keys[15]
                        }
                        const stock = new (Container.get('Stock'))(data);
                        if (!stock.validateSync()) {
                            stocks.push(stock)
                        } else {
                            errorLines.push(count)
                        }
                    });
                    this.readline.on('close', () => {
                        if (errorLines.length > 0) {
                            console.log('[warn] These lines have invalid stock market data: ', errorLines)
                        }
                        if (stocks.length > 0) {
                            console.log('[info] total number of valid data: ', stocks.length)
                            resolve(stocks)
                        } else {
                            const error = new Error("There is no stock data in file");
                            error.status = 400;
                            reject(error)
                        }
                    });
                });
            } catch (e) {
                reject(e)
            }
        }));
    }
}

module.exports = FileParser;