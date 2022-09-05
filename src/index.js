const express = require('express');
const morgan = require('morgan');
const app = express();
const swagger_ui = require('swagger-ui-express');
const swagger_jsdoc = require('swagger-jsdoc');
const path = require('path');
const swagger_spec ={
    definition:{
        openapi:"3.0.0",
        info:{
            title: "R2",
            version: "1.0.0"
        },
        servers:[
            {
                url:"http://localhost:3000"
            }
        ]
    },
    apis:[`${path.join(__dirname, "./routes/*.js")}`]
}

app.set('port', 3000);
app.set('json spaces', 2);


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/api/doc", swagger_ui.serve, swagger_ui.setup(swagger_jsdoc(swagger_spec)));

app.use(require('./routes/index'));

app.use('/admin/productos', require('./routes/productos_web'));
app.use('/admin/ordenes', require('./routes/ordenes_web'));

app.use('/productos', require('./routes/productos_movil'));
app.use('/comprar', require('./routes/comprar_movil'));

app.listen(app.get('port'), () => {
    console.log("Server on");
});