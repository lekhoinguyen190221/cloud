var mongoose = require('mongoose')

var Schema = mongoose.Schema;

const ToySchema = new Schema({
    name : {type:String, required:true},
    price : {type:Number},
    picURL : {type:String}
});

module.exports = mongoose.model('Toy', ToySchema);