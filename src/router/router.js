const express= require('express');
const router = express();

//////archivo de coneccion
const mysqlConeccion = require('../database/database');
//////fin archivo de coneccion

///////ruta raiz
router.get('/', (req, res)=>{
    res.send('Pantalla Inicio de nuestra aplicacion');
});
//Devuelve a todos los clientes activos de nuestra base de datos 
router.get('/cliente',(req, res)=>{
    // res.send('Listado de clientes');
    const query='select * from cliente';
            mysqlConeccion.query(query, (err, rows)=>{
                if(!err){
                    res.json(rows);
                }else{
                    console.log(err)
                }
            })
        });    
//metodo para insertar cliente por el metodo POST
router.post('/cliente',(req, res)=>{
    const { nombre, apellido, estado } =req.body
    let query=`INSERT INTO cliente (nombre, apellido, estado, tms) VALUES ('${nombre}','${apellido}','${estado}',NOW())`;
            mysqlConeccion.query(query, (err)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro dato: ');
                }else{
                    console.log(err)
                }
            })
        });
module.exports = router;