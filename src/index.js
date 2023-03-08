const express= require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
/// Se agrega const lista blanca para restringir acceso a mi base de datos a solo el 5173
const ListaBlanca = ['http://localhost:5173/']
app.use(cors({ListaBlanca}));

const morgan =require('morgan');
//configuraciones
app.set('puerto' , process.env.PORT || 3300);
// middlewares
app.use(morgan('runs'));

app.use(function(req, res, next){
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, UPDATE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

//  rutas para mi aplicacion
app.use(require('./router/router'))
// inicia el servidor NODE
app.listen(app.get('puerto'), ()=>{
    console.log('El servidor corriendo en el puerto',app.get('puerto'))
})