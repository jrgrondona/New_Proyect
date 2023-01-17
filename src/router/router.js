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
        const query='select * from cliente';
            mysqlConeccion.query(query, (err, rows)=>{
                if(!err){
                    res.json(rows);
                }else{
                    console.log(err)
                }
            })
        });    
//Devuelve a un cliente puntual
router.get('/cliente/:id',(req, res)=>{
    const {id} = req.params;
      mysqlConeccion.query('select * from cliente where id = ?',[id], (err, rows)=>{
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
                    res.send('Se inserto correctamente nuestros datos');
                }else{
                    console.log(err)
                }
            })
        });
//Se agrega metodo para actualizar datos del cliente por el metodo PUT
router.put('/cliente/:id',(req, res)=>{
    let id = req.params.id
    const {nombre, apellido, estado} =req.body
    let query=`UPDATE cliente SET nombre='${nombre}', apellido='${apellido}', estado='${estado}', tms=NOW() WHERE id='${id}'`;
            mysqlConeccion.query(query, (err)=>{
                if(!err){
                    res.send('Se actualizó datos del cliente id: '+id+'');
                }else{
                    console.log(err)
                }
            })
        });
//Eliminacion logica de clientes por delete.
router.delete('/cliente/:id',(req, res)=>{
    const {id} = req.params;
      mysqlConeccion.query(`UPDATE cliente SET estado = 0 WHERE id = ?`,[id], (err)=>{
        if(!err){
            res.send('Se modificó correctamente a estado 0 el id: '+id+'');
        }else{
            console.log(err)
        }
    })
});

//Devuelve a todos los productos de nuestra base de datos 
router.get('/productos',(req, res)=>{
    const query='select * from productos';
        mysqlConeccion.query(query, (err, rows)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err)
            }
        })
    });    
//Devuelve un producto puntual
router.get('/productos/:id',(req, res)=>{
    const {id} = req.params;
      mysqlConeccion.query('select * from productos where id = ?',[id], (err, rows)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err)
        }
    })
});
//metodo para insertar productos por el metodo POST
router.post('/productos',(req, res)=>{
    const { nombre, descripcion, id_marca, precio_costo, precio_venta, estado, stock } =req.body
    let query=`INSERT INTO productos (nombre, descripcion, id_marca, precio_costo, precio_venta, estado, stock,tms) 
    VALUES ('${nombre}','${descripcion}','${id_marca}','${precio_costo}','${precio_venta}','${estado}','${stock}',NOW())`;
            mysqlConeccion.query(query, (err)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestros datos');
                }else{
                    console.log(err)
                }
            })
        });

module.exports = router;
