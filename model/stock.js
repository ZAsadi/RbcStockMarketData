const mongoose = require('mongoose');

const {Schema} = mongoose;

const stockSchema = new Schema({
    quarter: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    open: String,
    high: String,
    low: String,
    close: String,
    volume: Number,
    percent_change_price: Number,
    percent_change_volume_over_last_wk: Number,
    previous_weeks_volume: Number,
    next_weeks_open: String,
    next_weeks_close: String,
    percent_change_next_weeks_price: Number,
    days_to_next_dividend: Number,
    percent_return_next_dividend: Number
});

module.exports = mongoose.model('Stock', stockSchema);