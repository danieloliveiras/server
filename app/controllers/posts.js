let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let Post = require('../models/post');
let Usuario = require('../models/usuario');

module.exports.listarPosts = function(req, res){
    let promise = Post.find().exec();
    promise.then(
        function(post){
            res.json(post);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.obterPost = function(req, res){
    var id = req.params.id;
    Post.findById(id).exec()
    .then(
        (post) => {
            if (post) {
                res.json(post);
            } else{
                res.status(404).send("Post não encontrado");
            }
        },
        (erro) => {
            res.status(500).json(erro);
        }
    )
}

module.exports.inserirPost = function(req, res){
    let payload = jwt.decode(req.query.token);
    let post = new Post({
        texto: req.body.texto,
        likes: req.body.likes,
        uid: payload.userId
    });
    let promise = Post.create(post)
    promise.then(
        function(post){
            res.status(201).json(post);
        },
        function(erro){
            res.status(500).json(erro);
        },
    );
}

module.exports.usuarioDePost = function(req, res){
    let id = req.params.id;
    let promise = Post.findById(id);
    promise.then(
        function(post){
            let promise1 = Usuario.findById(post.uid);
            promise1.then(
                function(usuario){
                    res.json(usuario);
                },
                function(erro){
                    res.status(500).json(erro);
                }
            )
        }
    )
}

module.exports.modificarPost = function(req, res){
    let payload = jwt.decode(req.query.token);
    let id = req.params.id;
    let promise = Post.findById(id);
    console.log(payload);
    console.log(id);

    promise.then(
        function(post){
            if(post.uid == payload.userId){
                let promise2 = Post.findByIdAndUpdate(id, req.body);
                promise2.then(
                    (post) => {
                        res.status(201).json(post);
                    },
                    (erro) => {
                        res.status(500).json(erro);
                    }
                )
            } else{
                res.status(500).json(erro);
            }
        }
    )
}

module.exports.deletarPost = function(req, res){
    let payload = jwt.decode(req.query.token);
    let id = req.params.id;
    let promise = Post.findById(id);

    promise.then(
        function(post){
            console.log(post);
            if(post.uid == payload.userId){
                let promise2 = Post.findByIdAndRemove(id, req.body);
                promise2.then(
                    (post) => {
                        res.status(201).json(post);
                    },
                    (erro) => {
                        res.status(500).json(erro);
                    }
                )
            } else{
                res.status(500).json(erro);
            }
        }
    )
}