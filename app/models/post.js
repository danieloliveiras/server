var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        texto: {
            type: String,
            require: true
        },
        likes: {
            type: Number,
            require: true
        },
        uid:{
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario'
        }
    });
    return mongoose.model('Post', schema);
}();