require('dotenv').config();

const express = require("express");
const ejs = require('ejs');
const bodyParser = require("body-parser");

const app = express();

/*Configuración de motor de plantillas*/
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

/*Configuración de body parser*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.disable('x-powered-by');

/*Redirigir http a https*/
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(301, 'https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    } else {
        return next();
    }
});

/*Router*/
app.use('/', require(__dirname + '/routers/root.js'));
app.use('/city', require(__dirname + '/routers/city.js'));

/*Archivos estáticos*/
app.use(express.static(__dirname + "/public"));

/*Activar servidor*/
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor andando en el puerto ${process.env.PORT}`);
})