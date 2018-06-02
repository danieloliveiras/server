let controller = require("../controllers/posts");
let auth = require('../controllers/auth');

module.exports = function(app){
    app.use("/api/posts/", auth.checar)
    .post('/api/posts', controller.inserirPost)
    .get('/api/posts', controller.listarPosts)
    .get('/api/posts/:id', controller.obterPost)
    .get('/api/posts/:id/usuario', controller.usuarioDePost)
    .put('/api/posts/:id', controller.modificarPost)
    .delete('/api/posts/:id', controller.deletarPost);
}