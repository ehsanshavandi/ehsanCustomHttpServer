let mongoose = require('mongoose');

/**
 * test schema
 * name {string}
 * id {numbers}
 * timestamps
 */
const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id : { type: Number, required: true }
},
    {
        timestamps: true
    });

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
