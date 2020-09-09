const mongoose = require('mongoose');

let INSTANCE;

class Database {
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.DATABASE_URL = "mongodb://mongo:27017/stock";
        } else {
            this.DATABASE_URL = "mongodb://localhost:27017/stock";
        }

    }

    async connect() {
        return new Promise((resolve, reject) => {
            mongoose.connect(this.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, db) => {
                if (error)
                    reject(error);
                else
                    resolve(db);
            });
        });
    }
}

function getInstance() {
    if (!INSTANCE)
        INSTANCE = new Database();
    return INSTANCE;
}

module.exports = {getInstance}