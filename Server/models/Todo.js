const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  item: {type: String, lowercase: true}
});

module.exports = mongoose.model('Item',ItemSchema);