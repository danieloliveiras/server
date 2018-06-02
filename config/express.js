let express = require('express');
let bodyParser = require('body-parser');

let usuariosRouter = require('../app/routes/usarios');
let postsRouter = require('../app/routes/posts');

module.exports = function(){
    let app = express();
    app.set("port", 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    usuariosRouter(app);
    postsRouter(app);
    return app;
}