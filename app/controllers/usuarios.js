let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

var Usuario = require('../models/usuario');
var Post = require('../models/post');

module.exports.listarUsuarios = function(req, res){
    let promise = Usuario.find().exec();
    promise.then(
        function(usuarios){
            res.json(usuarios);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.obterUsuarios = function(req, res){
    var id = req.params.id;
    Usuario.findById(id).exec()
    .then(
        (usuario) => {
            if (usuario) {
                res.json(usuario);
            } else{
                res.status(404).send("Usuario não encontrado");
            }
        },
        (erro) => {
            res.status(500).json(erro);
        }
    )
}

module.exports.inserirUsuario = function(req, res){
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync (req.body.senha, 10)
    });
    let promise = Usuario.create(usuario)
    promise.then(
        function(usuario){
            res.status(201).json(usuario);
        },
        function(erro){
            res.status(500).json(erro);
        },
    );
}

module.exports.deletarUsuario = function(req, res){
    let payload = jwt.decode(req.query.token);
    let promise = Usuario.findByIdAndRemove(payload.userId);
    promise.then(
        (usuario) => {
            res.status(201).json(usuario);
        },
        (erro) => {
            res.status(500).json(erro);
        }
    )
}

module.exports.modificarUsuario = function(req, res){
    let payload = jwt.decode(req.query.token);
    req.body.senha = bcrypt.hashSync(req.body.senha, 10);
    promise = Usuario.findByIdAndUpdate(payload.userId, req.body);

    promise.then(
        (usuario) => {
            res.status(201).json(usuario);
        },
        (erro) => {
            res.status(500).json(erro);
        }
    )
}

module.exports.postsDeUsuario = function(req, res){
    let id = req.params.id;
    let promise = Usuario.findById(id);
    promise.then(
        function(usuario){
            let promise1 = Post.find({'uid': usuario._id});
            console.log(usuario);
            console.log(Post);
            promise1.then(
                function(post){
                    res.json(post);
                    console.log('ta entrando');
                },
                function(erro){
                    res.status(500).send();
                }
            )
        }
    )
}