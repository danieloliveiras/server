let controller = require("../controllers/usuarios.js");
let auth = require('../controllers/auth');

module.exports = function(app){
    app.post("/api/usuarios/signin", auth.logar)
    .post("/api/usuarios", controller.inserirUsuario)
    .use("/api/usuarios/", auth.checar)
    .get("/api/usuarios", controller.listarUsuarios)
    .get("/api/usuarios/:id", controller.obterUsuarios)
    .get('/api/usuarios/:id/posts', controller.postsDeUsuario)
    .put("/api/usuarios/", controller.modificarUsuario)
    .delete("/api/usuarios", controller.deletarUsuario);
}