const express= require('express');
const router = express();
const cors = require('cors');
// para encriptar password
const bcrypt= require('bcrypt');
// Para generar token
const jwt= require('jsonwebtoken');

//////archivo de coneccion
const mysqlConeccion = require('../database/database');
//////fin archivo de coneccion

///////ruta raiz
router.get('/', (req, res)=>{
    res.send('Pantalla Inicio de App');
});
//Devuelve a todos los clientes activos de nuestra base de datos 
router.get('/cliente', verificarToken, (req, res)=>{
    jwt.verify(req.token, 'bazarKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
        mysqlConeccion.query('select * from cliente', (err, registro)=>{
            if(!err){

                res.json(registro);
            }else{
                console.log(err)
            }
        })
        }
    })
});
//Devuelve a un cliente puntual
router.get('/cliente/:id', verificarToken, (req, res)=>{
    const  { id } = req.params;
    jwt.verify(req.token, 'bazarKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConeccion.query('select * from cliente where id=?',[id], (err, registros)=>{
                if(!err){
                    res.json(registros);
                }else{
                    console.log(err)
                }
            })
        }
    })
});
//metodo para insertar cliente por el metodo POST
router.post('/cliente', verificarToken, (req, res)=>{
    const { nombre, apellido, estado } =req.body
    jwt.verify(req.token, 'bazarKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            let query=`INSERT INTO cliente (nombre, apellido, estado, tms) VALUES ('${nombre}','${apellido}','${estado}',NOW())`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro dato: '+nombre);
                }else{
                    console.log(err)
                }
            })
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
router.get('/productos/:id', verificarToken,(req, res)=>{
    // const {id} = req.params;
    const  parametro  = req.params.id
    if(esNumero(parametro)){
        res.json(
            {
                status: false,
                mensaje:"El parametro que se espera tiene ser un numero entero"
            });
    }else{
        jwt.verify(req.token, 'bazarKey', (error, valido)=>{
            if(error){
                // console.log(' entra aca')
                res.sendStatus(403);
            }else{
                mysqlConeccion.query('select * from productos where id=?',[parametro], (err, rows)=>{
                    if(!err){
                        if(rows.length!=0){
                            res.json(rows);
                        }else{
                            res.json(
                                {
                                    status: false,
                                    mensaje:"El ID del producto no existe en la base de datos."
                                });
                        }    
                    }else{
                        res.json(
                        {
                            status: false,
                            mensaje:"Error en el servidor."
                        });
                    }
                });
                
            }
        });
    }
})
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
////////////// /////////////////
//////////////Usuarios /////////
////////////// /////////////////
router.get('/usuarios', verificarToken, (req, res)=>{

    jwt.verify(req.token, 'bazarKey', (error, valido)=>{
    if(error){
        res.sendStatus(403);
    }else{
        mysqlConeccion.query('select * from usuarios', (err, registro)=>{
    if(!err){
        // console.log(registro.length)
        res.json(registro);
    }else{
        console.log(err)
    }
})
}

})

});

////////////login de usuarios //////////////
router.post('/login', (req, res)=>{
const {username, password} =req.body
if(username!=undefined && password!=undefined){
    mysqlConeccion.query('select u.id_usuario, u.username,  u.password,  u.email, u.apellido_nombre from usuarios u where u.estado="1" AND username=?',[username], (err, rows)=>{
        if(!err){
            if(rows.length!=0){
                const bcryptPassword = bcrypt.compareSync(password, rows[0].password);
                if(bcryptPassword){
                    jwt.sign({rows}, 'bazarKey', {expiresIn:'1200s'},(err, token)=>{
                        res.json(
                            {
                                status: true,
                                datos: rows,
                                token: token
                            });
                    }) 
                }else{
                    res.json(
                        {
                            status: false,
                            mensaje:"La Contraseña es incorrecta"
                        });
                }
            }else{
                res.json(
                    {
                        status: false,
                        mensaje:"El usuario no existe "
                    });
                
            }
        }else{
            res.json(
                {
                    status: false,
                    mensaje:"Error en el servidor"
                });
            
        }
    });
}else{
    res.json({
        status: false,
        mensaje:"Faltan completar datos"
    });
}
});
////////////login de usuarios //////////////
router.post('/registro', async(req, res)=>{
const {username, password, email, apellido_nombre} =req.body
let hash = bcrypt.hashSync(password,10);

let query=`INSERT INTO usuarios (username, password, email, apellido_nombre, fecha_creacion) VALUES ('${username}','${hash}','${email}','${apellido_nombre}',NOW())`;
mysqlConeccion.query(query, (err, registros)=>{
    if(!err){
        res.send('Se inserto correctamente nuestro usuario: '+username);
    }else{
        res.send('Ocurrio un error desde el servidor'+err);
    }
})
});

router.put('/resetpassword/:id', (req, res)=>{
// asigna a id_usuario el valor que recibe por el parametro 
 let id  = req.params.id;
// //asigna el valor que recibe  en el Body 
 const { password } =req.body 
 let hash = bcrypt.hashSync(password,10); 
//  generamos la query de modificacion del password
 let query=`UPDATE usuarios SET password='${hash}' WHERE id='${id}'`;
 mysqlConeccion.query(query, (err, registros)=>{
    if(!err){
        res.send('El Id que editamos es : '+id+' y cambiamos el password! Muchas gracias!');
    }else{
        console.log(err)
    }
})


});
////////////// /////////////////
// //////////////////////Nuestras funciones /////////
function verificarToken(req, res, next){
const BearerHeader= req.headers['authorization']
if(typeof BearerHeader!=='undefined'){
    const bearerToken= BearerHeader.split(" ")[1]
    req.token=bearerToken;
    next();
}else{
     res.send('Para consultar las apis debe estar autenticado.Gracias');
    // console.log('Ocurrio un error')
}
}

function esNumero(parametro) {
if(!isNaN(parseInt(parametro))){
    return false
} else {
    return true
}
}

module.exports = router;