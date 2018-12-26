const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PageSchema = new Schema({
  name: {type: String, required: true, max: 100},
  content: {type: Object, required: true}
});

module.exports = mongoose.model('Page', PageSchema);
