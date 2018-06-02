var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        nome: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            index: {
                unique: true
            }
        },
        senha:{
            type: String,
            require: true
        }
    });
    return mongoose.model('Usuario', schema);
}();