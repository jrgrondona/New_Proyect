const express = require('express');
const router = express();
// const cors = require('cors')
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
// Devuelve a todos los clientes activos de nuestra base de datos ok !
router.get('/cliente', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select * from cliente', (err, registro) => {
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
    jwt.verify(req.token, 'bazarKey', (error) => {
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
//metodo para insertar cliente por el metodo POST ok!
router.post('/cliente', verificarToken, (req, res) => {
    const { nombre, apellido, estado } = req.body
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `INSERT INTO cliente (nombre, apellido, estado, tms) VALUES ('${nombre}','${apellido}','${estado}',NOW())`;
            mysqlConeccion.query(query, (err, registros) => {
                if (!err) {
                    res.send('Se agregó nuevo cliente : ' + nombre);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
//Se agrega metodo para actualizar datos del cliente por el metodo PUT
router.put('/cliente/:id', verificarToken, (req, res) => {
    let id = req.params.id
    const { nombre, apellido, estado } = req.body
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `UPDATE cliente SET nombre='${nombre}', apellido='${apellido}', estado='${estado}', tms=NOW() WHERE id='${id}'`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.send('Se actualizó datos del cliente id: ' + id + '');
                } else {
                    console.log(err)
                }
            });
        }
    });
});
//Eliminacion logica de clientes por PUT ok !
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
            mysqlConeccion.query('select * ,(precio_venta-precio_costo) AS Ganancia from productos', (err, registro) => {
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
    const { nombre, descripcion, id_marca, precio_costo, precio_venta, cantidad } = req.body
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            let query = `INSERT INTO productos (nombre, descripcion, id_marca, precio_costo, precio_venta, cantidad,tms) 
    VALUES ('${nombre}','${descripcion}','${id_marca}','${precio_costo}', '${precio_venta}','${cantidad}',NOW())`;
            mysqlConeccion.query(query, (err) => {
                if (!err) {
                    res.send('Se inserto correctamente nuestros datos');
                } else {
                    console.log(err)
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
//Eliminacion logica de producto por delete.
router.delete('/productos/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    jwt.verify(req.token, 'bazarKey', (error, valido) => {
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
/////////////////////////////
///////// MARCAS ///////////
///////////////////////////
router.get('/marcas', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select * from marcas ORDER BY estado ASC', (err, registro) => {
                if (!err) {
                    res.json(registro);
                } else {
                    console.log(err)
                }
            })
        }
    })
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
            let query = `INSERT INTO marcas (nombre, tms) VALUES ('${nombre}',NOW())`;
            mysqlConeccion.query(query, (err, registros) => {
                if (!err) {
                    res.send('Se agregó nueva marca : ' + nombre);
                } else {
                    console.log(err)
                }
            })
        }
    })
});
//////////////////////////
///// PROVEEDORES ///////
////////////////////////
router.get('/proveedor', verificarToken, (req, res) => {
    jwt.verify(req.token, 'bazarKey', (error) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConeccion.query('select * from proveedor ORDER BY estado ASC', (err, registro) => {
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
                    res.send('Se inserto correctamente nuestros datos');
                } else {
                    console.log(err)
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
                        jwt.sign({ rows }, 'bazarKey', { expiresIn: '3600s' }, (err, token) => {
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
            res.send('Ocurrio un error desde el servidor' + err);
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