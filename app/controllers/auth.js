let bcrypt = require('bcrypt');
let Usuario = require('../models/usuario');
let jwt = require('jsonwebtoken');

module.exports.logar = function(req, res){
    function logar(user){
        if(!bcrypt.compareSync(req.body.senha, user.senha)){
            falhar();
            console.log(bcrypt.compareSync(req.body.senha, user.senha));
        }else{
            let token = jwt.sign({userId: user._id}, 'secret');
            res.status(200).json({
                message: "Logado",
                token: token,
                userId: user._id
            })
        }
    }
    function falhar(){
        res.status(401).send('Invalid login');
    }
    Usuario.findOne({email: req.body.email}).exec().then(logar, falhar);
}

module.exports.checar = function (req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if (err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
}