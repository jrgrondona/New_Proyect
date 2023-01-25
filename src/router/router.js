const express= require('express');
const router = express();
const cors = require('cors');

//////archivo de coneccion
const mysqlConeccion = require('../database/database');
//////fin archivo de coneccion

///////ruta raiz
router.get('/', (req, res)=>{
    res.send('Pantalla Inicio de App');
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
////////////// PRODUCTOS //////////////
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
    VALUES ('${nombre}','${descripcion}','${id_marca}','${precio_costo}', '${precio_venta}','${estado}','${stock}',NOW())`;
            mysqlConeccion.query(query, (err)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestros datos');
                }else{
                    console.log(err)
                }
            })
        });
//Metodo para actualizar datos de productos por el metodo PUT
router.put('/productos/:id',(req, res)=>{
    let id = req.params.id
    const {nombre, descripcion, id_marca, precio_costo, precio_venta, estado, stock} =req.body
    let query=`UPDATE productos SET nombre='${nombre}', descripcion='${descripcion}', id_marca='${id_marca}', precio_costo='${precio_costo}', precio_venta='${precio_venta}', estado='${estado}', stock='${stock}', tms=NOW() WHERE id='${id}'`;
            mysqlConeccion.query(query, (err)=>{
                if(!err){
                    res.send('Se actualizó datos del producto id: '+id+' Descripcion: '+descripcion+'');
                }else{
                    console.log(err)
                }
            })
        });
//Eliminacion logica de producto por delete.
router.delete('/productos/:id',(req, res)=>{
    const {id} = req.params;
      mysqlConeccion.query(`UPDATE productos SET estado = 0 WHERE id = ?`,[id], (err)=>{
        if(!err){
            res.send('Se modificó correctamente a estado 0 el id: '+id+'');
        }else{
            console.log(err)
        }
    })
});
////////////// USUARIOS //////////////
//Devuelve a todos los usuarios activos de nuestra DB 
router.get('/usuarios',(req, res)=>{
        const query='select * from usuarios';
            mysqlConeccion.query(query, (err, rows)=>{
                if(!err){
                    res.json(rows);
                }else{
                    console.log(err)
                }
            })
        });    
//Devuelve a un usuario puntual
router.get('/usuarios/:id_usuario',(req, res)=>{
    const {id} = req.params;
      mysqlConeccion.query('select * from usuarios where id_usuario = ?',[id], (err, rows)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err)
        }
    })
});
//metodo para crear usuario por el metodo POST
router.post('/registro',(req, res)=>{
    const {username, password, email, apellido_nombre} =req.body
    let query=`INSERT INTO usuarios (username, password, email, apellido_nombre, fecha_creacion) VALUES ('${username}','${password}','${email}','${apellido_nombre}',NOW())`;
            mysqlConeccion.query(query, (err)=>{
                if(!err){
                    res.send('Se inserto correctamente nuevo usuario '+apellido_nombre);
                }else{
                    res.send('Ocurrio un error en el servidor '+err);
                }
            })
        });
module.exports = router;
