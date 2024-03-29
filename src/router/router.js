const express = require('express');
const router = express();
const cors = require('cors')
// para encriptar password
const bcrypt = require('bcrypt');
// Para generar token
const jwt = require('jsonwebtoken');

//////coneccion a la db
const mysqlConeccion = require('../database/database');
//////fin archivo de coneccion

/// rut de inicio
router.get('/', (req, res) => {
    res.send('Pantalla Inicio');
});
// Devuelve a todos los clientes de nuestra base de datos 
router.get('/cliente', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select *,DATE_FORMAT(tms,"%Y-%m-%d %H:%i") as fecha_de_carga from cliente', (err, registro) => {
                if (!err) {
                    res.json(registro);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
//Devuelve a un cliente puntual
router.get('/cliente/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select * from cliente where id=?', [id], (err, registros) => {
                if (!err) {
                    res.json(registros);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
//metodo para insertar cliente por el metodo POST
router.post('/cliente', verificarToken, (req, res) => {
    const { nombre, apellido, tel, direc, estado } = req.body
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let querySelect = `SELECT COUNT(*) AS count FROM cliente WHERE nombre = '${nombre}' AND apellido = '${apellido}' AND tel = '${tel}' AND direc = '${direc}'`;
              mysqlConeccion.query(querySelect, (errSelect, resultSelect) => {
                if (!errSelect && resultSelect[0].count === 0) {
                    let queryInsert = `INSERT INTO cliente (nombre, apellido, tel, direc, tms) VALUES ('${nombre}', '${apellido}', '${tel}', '${direc}', NOW())`;
                    mysqlConeccion.query(queryInsert, (errInsert, resultInsert) => {
                        if (!errInsert) {
                            res.json({
                                status: true,
                                mensaje: 'Se agregó nuevo cliente'
                            })
                        } else {
                            console.log(errInsert);
                        }
                    });
                } else if (!errSelect) {
                    res.json({
                        status: false,
                        mensaje: 'Ya existe un cliente con los mismos datos'
                    })
                } else {
                    console.log(errSelect);
                }
            });
        };

    })
});
//Se agrega metodo para actualizar datos del cliente por el metodo PUT
router.put('/cliente/:id', verificarToken, (req, res) => {
    let id = req.params.id
    const { nombre, apellido, tel, direc, estado } = req.body
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE cliente SET nombre='${nombre}', apellido='${apellido}',tel='${tel}',direc='${direc}', estado='${estado}', tms=NOW() WHERE id='${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.send('Se actualizó datos del cliente id: ' + id + '');
                    console.log(query)
                } else {
                    console.log(err)
                }
            });
        }
    });
});
//Eliminacion logica de clientes por delete.
router.put('/cliente/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE cliente SET estado = 0 WHERE id = '${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'El cliente fue dado de baja'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
// alta de cliente por PUT OK! 
router.put('/altacliente/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE cliente SET estado = 1 WHERE id = '${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'El cliente fue dado de Alta'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
router.put('/bajacliente/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE cliente SET estado = 0 WHERE id = '${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'El cliente fue dado de Baja'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
//// Busca clientes por nombre o apellido ok ! ////
router.post('/buscar_clientes', verificarToken, (req, res) => {
    let { nombre, apellido } = req.body
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            var query = 'select * from cliente where 1 ';
            if (nombre) {
                query = query + `AND nombre like '%${nombre}%'`;
            }
            if (apellido) {
                query = query + `AND apellido like '%${apellido}%'`;
            }
            mysqlConeccion.query(query, (err, rows) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
////////////// PRODUCTOS //////////////
/// Devuelve a todos los productos de nuestra base de datos ok!
router.get('/productos', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select * ,(precio_venta-precio_costo) AS Ganancia, DATE_FORMAT(tms,"%Y-%m-%d %H:%i") as fecha_de_carga from productos', (err, registro) => {
                if (!err) {

                    res.json(registro);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
//Devuelve un producto puntual
router.get('/productos/:id', verificarToken, (req, res) => {
    const parametro = req.params.id
    if (esNumero(parametro)) {
        res.json(
            {
                status: false,
                mensaje: "El parametro que se espera tiene ser un numero entero"
            });
    } else {
        jwt.verify(req.token, 'bazarKey', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {
                mysqlConeccion.query('select * from productos where id=?', [parametro], (err, rows) => {
                    if (!err) {
                        if (rows.length != 0) {
                            res.json(rows);
                        } else {
                            res.json(
                                {
                                    status: false,
                                    mensaje: "El ID del producto no existe en la base de datos."
                                });
                        }
                    } else {
                        res.json(
                            {
                                status: false,
                                mensaje: "Error en el servidor."
                            });
                    }
                });

            }
        });
    }
})
//metodo para insertar productos por el metodo POST está ok !
router.post('/agregarproductos', verificarToken, (req, res) => {
    const { nombre, descripcion, id_marca, precio_costo, precio_venta, stock } = req.body
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `INSERT INTO productos (nombre, descripcion, id_marca, precio_costo, precio_venta, stock,tms) 
    VALUES ('${nombre}','${descripcion}','${id_marca}','${precio_costo}', '${precio_venta}','${stock}',NOW())`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'Se inserto correctamente el producto'
                    })
                } else {
                    res.json({
                        status: false,
                        mensaje: 'El id de marca no existe, registrelo e intente nuevamente!'
                    })
                }
            })
        }
    })
});
//Metodo para actualizar datos de productos por el metodo PUT
router.put('/productos/:id', verificarToken, (req, res) => {
    let id = req.params.id
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            const { nombre, descripcion, id_marca, precio_costo, precio_venta, estado, stock } = req.body
            let query = `UPDATE productos SET nombre='${nombre}', descripcion='${descripcion}', id_marca='${id_marca}', precio_costo='${precio_costo}', precio_venta='${precio_venta}', estado='${estado}', stock='${stock}', tms=NOW() WHERE id='${id}'`;
            mysqlConeccion.query(query, (err, registros) => {
                if (!err) {
                    res.send('Se actualizó datos del producto id: ' + id + ' Descripcion: ' + descripcion + '');
                } else {
                    console.log(err)
                }
            });
        }
    });
});
// alta de producto por PUT OK! 
router.put('/altaproducto/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE productos SET estado = 1 WHERE id = '${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'Alta con éxito !'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
//// baja de producto por PUT ok ////
router.put('/bajaproducto/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE productos SET estado = 0 WHERE id = '${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'Baja con éxito !'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
//Eliminacion logica de producto por delete.
router.delete('/productos/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE productos SET estado = 0 WHERE id = '${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.send('Se eliminó lógicamente el id : ' + id);
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
//// PRUEBA DE VENTAS ////
router.get('/ventas', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select *,DATE_FORMAT(tms,"%Y-%m-%d %H:%i") as fecha_de_carga from ventas', (err, registro) => {
                if (!err) {
                    res.json(registro);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
///// DEVUELVE DETALLE TOTAL DE VENTAS ////
router.get('/todo_ventas', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('SELECT c.nombre, c.apellido, c.direc, c.tel, p.nombre AS nombre_producto, v.cantidad, p.precio_venta, v.cantidad * p.precio_venta AS Total FROM cliente c INNER JOIN ventas v ON c.id = v.id_cliente INNER JOIN productos p ON p.id = v.id_producto', (err, registro) => {
                if (!err) {
                    res.json(registro);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
///// into ventas ////
router.post('/ventas', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            const { id_cliente, id_producto, Cantidad } = req.body;
            let clienteQuery = `SELECT id FROM cliente WHERE id = ${id_cliente}`;
            mysqlConeccion.query(clienteQuery, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al obtener información del cliente');
                } else if (result.length === 0) {
                    res.json({
                        status: false,
                        mensaje: 'El cliente no existe, registrelo e intente vuevamente !'
                    })
                } else {
                    let productoQuery = `SELECT stock FROM productos WHERE id = ${id_producto}`;
                    mysqlConeccion.query(productoQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Error al obtener información del producto');
                        } else if (result.length === 0) { // si no hay resultados
                            res.json({
                                status: false,
                                mensaje: 'El producto no existe, registrelo e intente vuevamente !'
                            })
                        } else {
                            const stock = result[0].stock;
                            if (stock < Cantidad) {
                                res.json({
                                    status: false,
                                    mensaje: 'La cantidad solicitada es mayor que el stock disponible !'
                                })
                                return;
                            }
                            let updateQuery = `UPDATE productos SET stock = stock - ${Cantidad} WHERE id = ${id_producto}`;
                            mysqlConeccion.query(updateQuery, (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send('Error al actualizar el stock');
                                } else if (result.affectedRows === 0) {
                                    res.status(400).send('El producto no existe');
                                } else {
                                    let insertQuery = `INSERT INTO ventas (id_cliente, id_producto, Cantidad, tms) VALUES (${id_cliente}, ${id_producto}, ${Cantidad}, NOW())`;
                                    mysqlConeccion.query(insertQuery, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(500).send('Error al agregar la venta');
                                        } else {
                                            res.json({
                                                status: true,
                                                mensaje: 'Se agregó nueva venta correctamente !'
                                            })
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
//// Para eliminar registros de ventas /////
router.delete('/delete/:id_ventas', verificarToken, (req, res) => {
    let id_ventas = req.params.id_ventas;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `DELETE FROM ventas WHERE id_ventas = '${id_ventas}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'SE ELIMINO EL REGISTRO DE LA BASE DE DATOS !'
                    })
                    // res.send('Se eliminó físicamente el id venta: ' + id_ventas);
                } else {
                    res.send('El error es: ' + err);
                }
            })
        }
    })
});
///// DETALLE DE LA VENTA ////
router.get('/ventas/:id_ventas', verificarToken, (req, res) => {
    const id_ventas = req.params.id_ventas;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            const query = `SELECT c.nombre, c.apellido, c.direc, c.tel, p.nombre AS nombre_producto, v.cantidad, p.precio_venta, v.cantidad * p.precio_venta AS Total
            FROM cliente c
            INNER JOIN ventas v ON c.id = v.id_cliente
            INNER JOIN productos p ON p.id = v.id_producto
            WHERE v.id_ventas = ?`;
            mysqlConeccion.query(query, [id_ventas], (err, result) => {
                if (!err) {
                    res.json(result);
                } else {
                    console.log(err);
                    res.status(500).send('Error al ejecutar la consulta SELECT');
                }
            });
        }
    });
});
////////////////////////////
///////// MARCAS ///////////
///////////////////////////
router.get('/marcas', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select *,DATE_FORMAT(tms,"%Y-%m-%d %H:%i") as fecha_de_carga from marcas ORDER BY estado ASC', (err, registro) => {
                if (!err) {
                    res.json(registro);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
//Devuelve a una marca puntual
router.get('/marcas/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select * from marcas where id=?', [id], (err, registros) => {
                if (!err) {
                    res.json(registros);
                } else {
                    console.log(err)
                }
            })
        }
    })
});

//Se agrega metodo para actualizar datos de la marca por el metodo PUT
router.put('/marcas/:id', verificarToken, (req, res) => {
    let id = req.params.id
    const { nombre, estado } = req.body
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE marcas SET nombre='${nombre}', estado='${estado}', tms=NOW() WHERE id='${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.send('Se actualizó datos de la marca id: ' + id + '');
                    console.log(query)
                } else {
                    console.log(err)
                }
            });
        }
    });
});
//// baja de marca ok ////
router.put('/bajamarca/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE marcas SET estado = 0 WHERE id = '${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'El marca fue dado de baja'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
//// alta de marca ok ////
router.put('/altamarca/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE marcas SET estado = 1 WHERE id = '${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'El marca fue dado de Alta'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
///// Agregar Marcas /////
router.post('/AgregarMarcas', verificarToken, (req, res) => {
    const { nombre } = req.body
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let querySelect = `SELECT * FROM marcas WHERE nombre = '${nombre}'`;
            mysqlConeccion.query(querySelect, (errSelect, registros) => {
                if (!errSelect && registros.length === 0) {
                    let queryInsert = `INSERT INTO marcas (nombre, tms) VALUES ('${nombre}',NOW())`;
                    mysqlConeccion.query(queryInsert, (errInsert, registrosInsert) => {
                        if (!errInsert) {
                            res.json({
                                status: true,
                                mensaje: 'Se agregó nueva marca'
                            })
                        } else {
                            res.json({
                                status: false,
                                mensaje: 'No se pudo agregar la marca'
                            })
                        }
                    })
                } else {
                    res.json({
                        status: false,
                        mensaje: 'La marca ingresada ya se encuentra registrada en el listado'
                    })
                }
            })
        }
    })
});
//////////////////////////
///// PROVEEDORES ///////
////////////////////////
//Devuelve a un proveedor puntual
router.get('/proveedor/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select * from proveedor where id=?', [id], (err, registros) => {
                if (!err) {
                    res.json(registros);
                } else {
                    console.log(err)
                }
            })
        }
    })
});

//Se agrega metodo para actualizar datos del proveedor por el metodo PUT
router.put('/proveedor/:id', verificarToken, (req, res) => {
    let id = req.params.id
    const { nombre, estado, cuil, id_productos } = req.body
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE proveedor SET nombre='${nombre}', estado='${estado}', cuil='${cuil}', id_productos='${id_productos}', tms=NOW() WHERE id='${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.send('Se actualizó datos del proveedor id: ' + id + '');
                    console.log(query)
                } else {
                    console.log(err)
                }
            });
        }
    });
});
router.get('/proveedor', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select *,DATE_FORMAT(tms,"%Y-%m-%d %H:%i") as fecha_de_carga from proveedor ORDER BY estado ASC', (err, registro) => {
                if (!err) {
                    res.json(registro);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
//// Agrega Proveedor ////
router.post('/agregarproveedor', verificarToken, (req, res) => {
    const { nombre, cuil, id_productos } = req.body
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `INSERT INTO proveedor (nombre, cuil, id_productos, tms) 
    VALUES ('${nombre}','${cuil}','${id_productos}',NOW())`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'El proveedor se creó con exito'
                    })
                } else {
                    res.json({
                        status: false,
                        mensaje: 'Cuil debe ser de tipo numerico'
                    })
                }
            })
        }
    })
});
//// Da de baja un proveedor ////
router.put('/bajaproveedor/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE proveedor SET estado= 0 WHERE id='${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'Baja correctamente!'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
//// Da de alta un proveedor ////
router.put('/altaproveedor/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE proveedor SET estado= 1 WHERE id='${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'Alta correctamente!'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
////////////// ///////////////////
//////////////USUARIOS //////////
////////////// /////////////////
router.get('/usuarios', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select * from usuarios', (err, registro) => {
                if (!err) {
                    res.json(registro);
                } else {
                    console.log(err)
                }
            })
        }

    })

});
//// baja de un usuario ok ////        
router.put('/bajausuario/:id_usuario', verificarToken, (req, res) => {
    let id_usuario = req.params.id_usuario;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE usuarios SET estado= 0 WHERE id_usuario='${id_usuario}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'Baja correctamente!'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
//// alta de un usuario ok ////  
router.put('/altausuario/:id_usuario', verificarToken, (req, res) => {
    let id_usuario = req.params.id_usuario;
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE usuarios SET estado= 1 WHERE id_usuario='${id_usuario}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.json({
                        status: true,
                        mensaje: 'Alta correctamente!'
                    })
                } else {
                    res.send('El error  es : ' + err);
                }
            })
        }
    })
});
////////////login de usuarios //////////////
router.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username != undefined && password != undefined) {
        mysqlConeccion.query('select u.id_usuario, u.username,  u.password,  u.email, u.apellido_nombre from usuarios u where u.estado="1" AND username=?', [username], (err, rows) => {
            if (!err) {
                if (rows.length != 0) {
                    const bcryptPassword = bcrypt.compareSync(password, rows[0].password);
                    if (bcryptPassword) {
                        jwt.sign({ rows }, 'bazarKey', { expiresIn: '9600s' }, (err, token) => {
                            res.json(
                                {
                                    status: true,
                                    datos: rows,
                                    token: token
                                });
                        })
                    } else {
                        res.json(
                            {
                                status: false,
                                mensaje: "La Contraseña es incorrecta"
                            });
                    }
                } else {
                    res.json(
                        {
                            status: false,
                            mensaje: "El usuario no existe "
                        });

                }
            } else {
                res.json(
                    {
                        status: false,
                        mensaje: "Error en el servidor"
                    });

            }
        });
    } else {
        res.json({
            status: false,
            mensaje: "Faltan completar datos"
        });
    }
});
////////////login de usuarios //////////////
router.post('/registro', async (req, res) => {
    const { username, password, email, apellido_nombre } = req.body
    let hash = bcrypt.hashSync(password, 10);

    let query = `INSERT INTO usuarios (username, password, email, apellido_nombre, fecha_creacion) VALUES ('${username}','${hash}','${email}','${apellido_nombre}',NOW())`;
    mysqlConeccion.query(query, (err, registros) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El usuario se creó correctamente"
            });
        } else {
            res.json({
                status: false,
                mensaje: "El usuario ya existe"
            })
        }
    })
});
router.put('/resetpassword/:id', (req, res) => {
    // asigna a id_usuario el valor que recibe por el parametro 
    let id = req.params.id;
    // //asigna el valor que recibe  en el Body 
    const { password } = req.body
    let hash = bcrypt.hashSync(password, 10);
    //  generamos la query de modificacion del password
    let query = `UPDATE usuarios SET password='${hash}' WHERE id='${id}'`;
    mysqlConeccion.query(query, (err, registros) => {
        if (!err) {
            res.send('El Id que editamos es : ' + id + ' y cambiamos el password! Muchas gracias!');
        } else {
            console.log(err)
        }
    })


});
///////// Las funciones ////////////
function verificarToken(req, res, next) {
    const BearerHeader = req.headers['authorization']
    if (typeof BearerHeader !== 'undefined') {
        const bearerToken = BearerHeader.split(" ")[1]
        req.token = bearerToken;
        next();
    } else {
        res.send('Para consultar las Apis debe estar autenticado. Gracias !');
    }
}

function esNumero(parametro) {
    if (!isNaN(parseInt(parametro))) {
        return false
    } else {
        return true
    }
}

module.exports = router;