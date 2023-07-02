const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dbConnection = require('../db/dbConnection')
const auth = require('../middleware/auth')
const { Query } = require('pg')

dotenv.config()
const app = express()

var corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:8080'],
  optionsSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE',
}

app.use(cors(corsOptions))
app.use(express.json())

// Función para realizar una consulta a la base de datos dentro de una transacción
function executeQueryWithTransaction(query, callback) {
  dbConnection.connect((connectError, client, release) => {
    if (connectError) {
      release()
      return callback(connectError)
    }

    client.query('BEGIN', (beginError) => {
      if (beginError) {
        release()
        return callback(beginError)
      }

      client.query(query, (queryError, result) => {
        if (queryError) {
          client.query('ROLLBACK', () => {
            release()
            return callback(queryError)
          })
        } else {
          client.query('COMMIT', (commitError) => {
            if (commitError) {
              client.query('ROLLBACK', () => {
                release()
                return callback(commitError)
              })
            } else {
              release()
              return callback(null, result)
            }
          })
        }
      })
    })
  })
}

// REGISTRO Y LOGIN
app.post('/register', async (req, res) => {
  const {
    nombre,
    apellido,
    ci,
    fecha,
    pass,
    barrio,
    calle,
    esquina,
    numpuerta,
  } = req.body

  console.log(nombre)
  console.log(apellido)
  console.log(ci)
  console.log(fecha)
  console.log(pass)
  console.log(barrio)
  console.log(calle)
  console.log(esquina)
  console.log(numpuerta)

  // Validate user input
  if (
    !(
      nombre &&
      apellido &&
      ci &&
      fecha &&
      pass &&
      barrio &&
      calle &&
      esquina &&
      numpuerta
    )
  ) {
    console.log("NO TE REGISTRAS")
    return res.status(400).send({ msg: 'Todos los datos son requeridos.' })
  }

  // QUERY PARA VER SI EXISTE EL USUARIO
  let user
  try {
    executeQueryWithTransaction(
      `select * from usuarios where ci='${ci}'`,
      (error, result) => {
        if (error) {
          return res.send({ msg: error })
        }
        console.log("CHEQUEO USUARIO")
        user = result.rows
        console.log(user)
        if (user.length !== 0) {
          return res.send({ msg: 'Error al crear usuario.' })
        } else {
          console.log("NO EXISTIA EL USUARIO. VAMOS A CREAR UNO")
          // QUERY PARA VER SI EXISTE LA DIRECCION
          try {
            let fkDireccion
            executeQueryWithTransaction(
              `select * from direcciones
      where calle='${calle}' and numero='${numpuerta}' and esquina='${esquina}' and fkidbarrio=${barrio.idbarrio}`,
              async (error, result) => {
                if (error) {
                  return res.send({ msg: error })
                }
                console.log("QUERY HECHA.")
                console.log(result.rows[0])
                if (result.rows[0]) {
                  fkDireccion = result.rows[0].iddireccion

                  const password = await bcrypt.hash(pass, 8)

                  // INSERTAR EN LA BASE EL USUARIO CON EL NUEVO PASS ENCRIPTADO
                  const fechaActual = new Date();
                  const year = fechaActual.getFullYear();
                  const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
                  const day = fechaActual.getDate().toString().padStart(2, '0');
                  const fechaAlt = `${year}-${month}-${day}`;
                  try {
                    executeQueryWithTransaction(
                      `insert into usuarios 
                    (nombre,apellido,ci,pswd,fechanacimiento,fechaalta,fkiddireccion)
                    values ('${nombre}','${apellido}','${ci}','${password}','${fecha}','${fechaAlt}',${fkDireccion})`,
                      (error, result) => {
                        if (error) {
                          console.log(error)
                          return res.send({ msg: error })
                        }
                        console.log("INSERTE EL USUARIO")
                        res.send({ msg: 'Usuario creado con éxito!' })
                      },
                    )
                  } catch (error) {
                    return res.send({ msg: error })
                  }


                } else {
                  try {
                    let query1 = `
                    insert into direcciones (calle,numero,esquina,fkidbarrio)
                    values ('${calle}','${numpuerta}','${esquina}',${barrio.idbarrio}) returning iddireccion`
                    executeQueryWithTransaction(query1, async (error, result) => {
                      if (error) {
                        return res.send({ msg: error })
                      }

                      fkDireccion = result.rows[0].iddireccion
                      fkDireccion = result.rows[0].iddireccion
                      const password = await bcrypt.hash(pass, 8)

                      // INSERTAR EN LA BASE EL USUARIO CON EL NUEVO PASS ENCRIPTADO
                      const fechaActual = new Date();
                      const year = fechaActual.getFullYear();
                      const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
                      const day = fechaActual.getDate().toString().padStart(2, '0');
                      const fechaAlt = `${year}-${month}-${day}`;
                      try {
                        executeQueryWithTransaction(
                          `insert into usuarios 
                    (nombre,apellido,ci,pswd,fechanacimiento,fechaalta,fkiddireccion)
                    values ('${nombre}','${apellido}','${ci}','${password}',${fecha},${fechaAlt},${fkDireccion})`,
                          (error, result) => {
                            if (error) {
                              return res.send({ msg: error })
                            }
                            res.send({ msg: 'Usuario creado con éxito!' })
                          },
                        )
                      } catch (error) {
                        return res.send({ msg: error })
                      }

                    })
                  } catch (error) {
                    return res.send({ msg: error })
                  }
                }
              },
            )
          } catch (error) {
            return res.send({ msg: error })
          }
        }
      },
    )
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/login', async (req, res) => {
  console.log('llego al back')
  const { ci, pass } = req.body

  if (!ci || !pass) {
    return res.status(400).send({
      error: 'Necesitas ingresar todos los campos.',
    })
  }

  const query = `select * from usuarios where ci='${ci}'`

  let user

  try {
    await executeQueryWithTransaction(query, async (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      user = result.rows[0]

      if (!user) {
        return res.status(400).send({
          error: 'Error al logear',
        })
      }

      // const isMatch = await bcrypt.compare(pass, user.pswd)

      // if (!isMatch) {
      //   return res.status(400).send({
      //     error: 'Error al logear.',
      //   })
      // }

      // Crear jwt y mandarlo, valido por 2h
      const token = jwt.sign(
        { id: user.idusuario, ci: user.ci },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      )

      return res.send({ token, idusuario: user.idusuario })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

//Publicaciones:
app.get('/getPublicaciones', auth(), async (req, res) => {
  const query = `SELECT * FROM publicaciones WHERE fechabaja is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getPublicacionesDashboard', auth(), async (req, res) => {
  const idusuario = req.query.idusuario;
  console.log(idusuario)
  const query = `SELECT p.* FROM publicaciones as p
                where p.fechabaja is null and p.idpublicacion not in(
                SELECT fkidpublicacion
                FROM usuarios_publicaciones
                WHERE fkidusuario = ${idusuario})`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      console.log(result.rows)
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/addPublicacion', auth(), async (req, res) => {
  const {
    titulo,
    descripcion,
    presencial,
    idDireccion,
    idHabilidad,
    idUsuario,
  } = req.body
  if (
    !(
      titulo &&
      descripcion &&
      idDireccion &&
      idHabilidad &&
      idUsuario
    )
  ) {
    return res.status(400).send({ error: 'Todos los datos son requeridos.' })
  }
  try {
    const fechaActual = new Date()
    const year = fechaActual.getFullYear()
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0')
    const day = fechaActual.getDate().toString().padStart(2, '0')
    const fechaAlt = `${year}-${month}-${day}`
    console.log(fechaAlt)
    let query = `INSERT INTO publicaciones(nombre, descripcion, fechaalta, espresencial, fkidusuario, fkidhabilidad, fkiddireccion) 
                VALUES('${titulo}', '${descripcion}', '${fechaAlt}', '${presencial}', '${idUsuario}', '${idHabilidad}', '${idDireccion}')`
    console.log(query)
    executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        console.log("Entro al error 1")
        return res.send({ msg: error })
      }
      res.send({ msg: 'Publicacion agregada con éxito!' })
    })
  } catch (error) {
    console.log("Entro al error 2")
    return res.send({ msg: error })
  }
})

app.post('/deletePublicacion', auth(), async (req, res) => {
  const { idPublicacion } = req.body
  if (!idPublicacion) {
    return res.status(400).send({ error: 'Todos los datos son requeridos.' })
  }
  try {
    const fechaActual = new Date()
    const year = fechaActual.getFullYear()
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0')
    const day = fechaActual.getDate().toString().padStart(2, '0')
    const fechaAlt = `${year}-${month}-${day}`
    console.log(fechaAlt)
    let query = `UPDATE PUBLICACIONES
                SET fechabaja = '${fechaAlt}' 
                WHERE idpublicacion = '${idPublicacion}'`
    executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      res.send({ msg: 'Publicacion eliminada con éxito!' })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getPublicacionById', auth(), async (req, res) => {
  const idPublicacion = req.query.idPublicacion
  console.log(idPublicacion)

  let query = `SELECT * FROM publicaciones WHERE idpublicacion = ${idPublicacion} and fechabaja is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getNullPublicacionById', auth(), async (req, res) => {
  const idPublicacion = req.query.idPublicacion
  console.log(idPublicacion)

  let query = `SELECT * FROM publicaciones WHERE idpublicacion = ${idPublicacion}`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

//Habilidades:
app.get('/getHabilidades', auth(), async (req, res) => {
  const query = `SELECT * FROM habilidades WHERE fechabaja is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getHabilidadById', auth(), async (req, res) => {
  const idHabilidad = req.query.idHabilidad
  const query = `select * from habilidades where idhabilidad = ${idHabilidad} and fechabaja is null `
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      console.log(result.rows)
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getNullHabilidadById', auth(), async (req, res) => {
  const idHabilidad = req.query.idHabilidad
  const query = `select * from habilidades where idhabilidad = ${idHabilidad}`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      console.log(result.rows)
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getHabilidadByName', auth(), async (req, res) => {
  const nombre = req.query.nombre
  console.log(idHabilidad)

  const query = `select * from habilidades where nombre = ${nombre} and fechabaja is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getSkillsByUserId', auth(), async (req, res) => {
  const idusuario = req.query.idusuario
  console.log(idusuario)

  const query = `select * from habilidades where idhabilidad 
  IN (select fkidhabilidad from usuarios_habilidades where fkidusuario=${idusuario} and fechabaja is null)`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

//Preguntas Frecuentes:
app.get('/getPreguntasFrecuentes', auth(), async (req, res) => {
  const query = `SELECT * FROM preguntas_frecuentes WHERE fechabaja is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})


//Amigos:
app.get('/getAmigosByIdUsuario', auth(), async (req, res) => {
  const idusuario = req.query.idusuario

  const query = `SELECT fkidusuario, fkidamigo,fechasolicitud FROM amigos WHERE (fkidamigo = ${idusuario}) and fechabaja is null and fechasolicitud is not null and fechaalta is null`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows }) 
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getAmigosByIdUser', auth(), async (req, res) => {
  const idusuario = req.query.idusuario

  const query = `SELECT fkidusuario, fkidamigo,fechasolicitud FROM amigos WHERE (fkidusuario = ${idusuario} or fkidamigo=${idusuario}) and fechabaja is null and fechasolicitud is not null and fechaalta is not null`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows }) 
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/addAmigo', auth(), async (req, res) => {
  const { idusuario, idamigo } = req.body;
  if (!(idamigo && idusuario)) {
    return res.status(400).send({ error: 'Todos los datos son requeridos.' })
  }
  const query0 = `select * from amigos where ((fkidusuario = ${idusuario} and fkidamigo = ${idamigo}) or (fkidusuario = ${idamigo} and fkidamigo = ${idusuario})) and fechabaja is null and fechasolicitud is not null`
  try {
    executeQueryWithTransaction(query0, (error, result) => {
      if (error) {
        console.log("Error 0")
        console.log(error)
        return res.send({ msg: error })
      }
      try {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaActual.getDate().toString().padStart(2, '0');
        const fechaAlt = `${year}-${month}-${day}`;
        console.log(fechaAlt)
        let query = `UPDATE amigos
                     SET fechaalta = '${fechaAlt}'
                     WHERE fkidusuario = ${idusuario} and fkidamigo=${idamigo} or fkidusuario = ${idamigo} and fkidamigo=${idusuario}`;
        executeQueryWithTransaction(query, (error, result) => {
          if (error) {
            console.log("Error 1")
            console.log(error)
            return res.send({ msg: error })
          }
          else {
            console.log("Salio buneisimo")
            res.send({ msg: 'Solicitud aceptada con éxito!' })
          }
        })
      } catch (error) {
        console.log("Error 2")
        console.log(error)
        res.send({ msg: error })
      }
    })
  } catch (error) {
    console.log("Error 3")
    console.log(error)
    return res.send({ msg: error })
  }
})


app.post('/cancelAmigo', auth(),async (req, res) => {
  const{idusuario,idamigo} = req.body;
  if(!(idamigo && idusuario)){
    return res.status(400).send({ error: 'Todos los datos son requeridos.' })
  }
  const query0 = `select * from amigos where ((fkidusuario = ${idusuario} and fkidamigo = ${idamigo}) or (fkidusuario = ${idamigo} and fkidamigo = ${idusuario})) and fechabaja is null and fechasolicitud is not null`
  try {
    executeQueryWithTransaction(query0, (error, result) => {
      if (error) {
        console.log("Error 0")
        console.log(error)
        return res.send({ msg: error })
      }
      try {
        
        let query = `UPDATE amigos
                    SET fechasolicitud = null
                    WHERE fkidusuario = '${idusuario}' and fkidamigo='${idamigo}' or fkidusuario = '${idamigo}' and fkidamigo='${idusuario}'`;
        executeQueryWithTransaction(query, (error, result) => {
        if (error) {
          console.log("Error 1")
          console.log(error)
          return res.send({ msg: error })
        }
        else{
          console.log("Salio buneisimo")
          res.send({ msg: 'Solicitud rechazada con éxito!' })
        }
      })
      } catch (error) {
        console.log("Error 2")
          console.log(error)
        res.send({ msg: error })
      }
    })
  } catch (error) {
    console.log("Error 3")
    console.log(error)
    return res.send({ msg: error })
  }
})

app.post('/solicitudAmistad', auth(), async (req, res) => {
  const { idusuario, idamigo } = req.body;
  if (!(idamigo && idusuario)) {
    return res.status(400).send({ error: 'Todos los datos son requeridos.' })
  }
  let fechaAlt = new Date();
  const year = fechaAlt.getFullYear();
  const month = (fechaAlt.getMonth() + 1).toString().padStart(2, '0'); // Agrega el padding de ceros si es necesario
  const day = fechaAlt.getDate().toString().padStart(2, '0'); // Agrega el padding de ceros si es necesario
  try{
    let query0 = `Select * from amigos where fkidusuario = ${idusuario} and fkidamigo = ${idamigo}`
    executeQueryWithTransaction(query0, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      else {
        console.log("Viendo que trae el get")
        console.log(result.rows[0])
        if(result.rows[0]){
          try{
            let query1 = `UPDATE amigos
                        SET fechasolicitud = '${year}-${month}-${day}', fechabaja = null, fechaalta = null
                        WHERE fkidusuario = ${idusuario} AND fkidamigo = ${idamigo}`
            executeQueryWithTransaction(query1, (error, result) => {
              if (error) {
                return res.send({ msg: error })
              }
              else {
                res.send({ msg: 'Solicitud actualizada con éxito!' })
              }
            })
          }catch(error){
            res.send({ msg: error })
          }
        }
        else{
          try {
            let query = `INSERT INTO amigos (FkIdUsuario, FkIdAmigo,FechaSolicitud, FechaAlta, FechaBaja)
                VALUES (${idusuario},${idamigo},'${year}-${month}-${day}',null,null)`;
            executeQueryWithTransaction(query, (error, result) => {
              if (error) {
                return res.send({ msg: error })
              }
              else {
                res.send({ msg: 'Solicitud enviada con éxito!' })
              }
            })
          } catch (error) {
            res.send({ msg: error })
          }
        }
      }
    })
  }catch(error){
    res.send({ msg: error })
  }
})

//Barrios
app.get('/getBarrios', auth(), async (req, res) => {
  const query = `SELECT * FROM barrios`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getBarrioByName', auth(), async (req, res) => {
  const nombre = req.query.nombre
  console.log(nombre)

  const query = `select * from barrios where nombre = ${nombre}`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getBarrioByDireccionId', auth(), async (req, res) => {
  const idDireccion = req.query.idDireccion
  console.log(idDireccion)

  const query = `select br.* from barrios as br 
                join direcciones as d on d.fkidbarrio = br.idbarrio
                where d.iddireccion=${idDireccion}`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get("/getCitasByIdSolicitor", auth(), async (req, res) => {
  const idUsuario = req.query.idUsuario
  console.log(idUsuario)

  const query = `select up.* from usuarios_publicaciones as up 
  join publicaciones as p on up.fkidpublicacion = p.idpublicacion
  where p.fkidusuario =  ${idUsuario} and up.fechafin is not null`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get("/getCitasByIdUsuario", auth(), async (req, res) => {
  const idusuario = req.query.idusuario
  console.log(idusuario)
  const query = `select up.* from usuarios_publicaciones as up 
                join publicaciones as p on up.fkidpublicacion = p.idpublicacion
                where p.fkidusuario =  ${idusuario} and p.fechabaja is null and up.fechabaja is null and up.fechaalta is null and up.fechasolicitud is not null`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      } else {
        return res.send({ msg: result.rows })
      }
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/addCita', auth(), async (req, res) => {
  const { idusuario, idpublicacion } = req.body;
  try {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaActual.getDate().toString().padStart(2, '0');
    const fechaAlt = `${year}-${month}-${day}`;
    console.log(fechaAlt)
    let query = `UPDATE usuarios_publicaciones
                 SET fechaalta = '${fechaAlt}'
                 WHERE fkidusuario = ${idusuario} and fkidpublicacion = ${idpublicacion}`;
    executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        console.log("Error 1")
        console.log(error)
        return res.send({ msg: error })
      }
      else {
        console.log("Salio buneisimo")
        res.send({ msg: 'Solicitud aceptada con éxito!' })
      }
    })
  } catch (error) {
    console.log("Error 2")
    console.log(error)
    return res.send({ msg: error })
  }
})

app.post('/cancelCita', async (req, res) => {
  const { idusuario, idpublicacion } = req.body;
  console.log(idusuario);
  try {
    let query = `UPDATE usuarios_publicaciones
                 SET fechasolicitud = null, fechasolicitada = null
                 WHERE fkidusuario = ${idusuario} and fkidpublicacion = ${idpublicacion}`;
    executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      } else {
        res.send({ msg: 'Solicitud cancelada con éxito!' })
      }
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getCalificacionCita', auth(), async (req, res) => {
  const idusuario = req.query.idusuario
  const idpublicacion = req.query.idpublicacion

  const query = `select * from usuarios_publicaciones_calificaciones Where fkidpublicacion=${idpublicacion} and fkidusuario=${idusuario}`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})


//Direcciones:
app.get('/getDireccion', auth(), async (req, res) => {
  const calle = req.query.calle
  const numero = req.query.numero
  const esquina = req.query.esquina
  const idBarrio = req.query.idBarrio
  const query = `select * from direcciones where calle='${calle}' and numero='${numero}' and esquina='${esquina}' and fkidbarrio=${idBarrio}`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/addDireccion', auth(), async (req, res) => {
  console.log('Entre a addDireccion')
  const { calle, numero, esquina, idBarrio } = req.body
  if (!(calle && numero && esquina && idBarrio)) {
    return res.status(400).send({ error: 'Todos los datos son requeridos.' })
  }
  const query = `select * from direcciones where calle='${calle}' and numero='${numero}' and esquina='${esquina}' and fkidbarrio=${idBarrio}`
  try {
    console.log(query)
    executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        console.log('Error 1')
        console.log(error)
        return res.send({ msg: error })
      }
      console.log(result.rows[0])
      if (!result.rows[0]) {
        try {
          let query2 = `INSERT INTO direcciones(calle, numero, esquina, fkidbarrio) 
                      VALUES('${calle}', '${numero}', '${esquina}', '${idBarrio}')`
          executeQueryWithTransaction(query2, (error, result) => {
            if (error) {
              return res.send({ msg: error })
            }
            res.send({ msg: 'Direccioin agregada con éxito!' })
          })
        } catch (error) {
          return res.send({ msg: error })
        }
      } else {
        return res.send({ msg: result.rows[0] })
      }
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getDireccionById', auth(), async (req, res) => {
  const idDireccion = req.query.idDireccion
  console.log(idDireccion)

  const query = `select * from direcciones where iddireccion = ${idDireccion}`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

//SolicitudesCita:
app.post('/addSolicitudCita', auth(), async (req, res) => {
  const { idusuario, idpublicacion, iddireccion, fechaSolicitada } = req.body;
  try {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaActual.getDate().toString().padStart(2, '0');
    const fechaAlt = `${year}-${month}-${day}`;
    console.log(fechaAlt)
    let query = `insert into usuarios_publicaciones (fkidusuario, fkidpublicacion, fkiddireccion,fechasolicitada,fechasolicitud)
    values(${idusuario},${idpublicacion},${iddireccion},'${fechaSolicitada}','${fechaAlt}')`;
    console.log(query)
    executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      res.send({ msg: 'Solicitud realizada con éxito!' })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

//Solicitudes Pendientes:
app.get('/getSolicitudesAmistadPendientes'), async (req, res) => {
  const { xIdPersona } = req.body
  if (!xIdPersona) {
    return res.status(400).send({
      error: 'Error al obtener a la persona',
    })
  }
  const query = `SELECT * FROM Amigos WHERE fechasolicitud != null AND fechaalta = null AND fechabaja = null AND fkIdAmigo = '${xIdPersona}'`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
}

//Citas Pendientes:
// app.get('/getCitasPendientes'),
//   async (req, res) => {
//     const { xIdPersonaPublica } = req.body
//     if (!xIdPersonaPublica) {
//       return res.status(400).send({
//         error: 'Error al obtener a la persona',
//       })
//     }
//     const query = `SELECT p.*, pp.fechasolicitud, pp.fkidpersona FROM personaspublicaciones pp
//                 JOIN publicaciones p ON pp.fkidpersona = p.idpersona
//                 WHERE pp.fechasolicitud != null AND fechaAlta = null AND p.fechabaja = null AND p.FkIdPersona = '${xIdPersonaPublica}'`
//     try {
//       await executeQueryWithTransaction(query, (error, result) => {
//         if (error) {
//           return res.send({ msg: error })
//         }
//         return res.send({ msg: result.rows })
//       })
//     } catch (error) {
//       return res.send({ msg: error })
//     }
//   }

app.post('/deleteAmigo', auth(), async (req, res) => {
  const { idusuario, idamigo } = req.body

  let fechaAlt = new Date()
  const year = fechaAlt.getFullYear()
  const month = (fechaAlt.getMonth() + 1).toString().padStart(2, '0') // Agrega el padding de ceros si es necesario
  const day = fechaAlt.getDate().toString().padStart(2, '0') // Agrega el padding de ceros si es necesario

  const query = `UPDATE amigos 
    SET FechaBaja = '${year}-${month}-${day}'
  WHERE(FkIdUsuario = ${idusuario} AND FkIdAmigo = ${idamigo}) OR(FkIdUsuario = ${idamigo} AND FkIdAmigo = ${idusuario}); `
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: 'amigo eliminado correctamente' })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getPublicacionesRealizadas', auth(), async (req, res) => {
  const idusuario = req.query.idusuario
  console.log(idusuario)

  const query = `SELECT idpublicacion, nombre, descripcion, p.fechaalta, p.fechabaja, espresencial, p.fkidusuario, fkidhabilidad, p.fkiddireccion, fechasolicitud, fechainicio, fechafin
    FROM publicaciones p INNER JOIN usuarios_publicaciones u ON p.idpublicacion = u.fkidpublicacion
    WHERE p.fkidusuario = ${idusuario} AND p.FechaBaja IS  null AND u.FechaBaja Is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getPublicacionesRecibidas', auth(), async (req, res) => {
  const idusuario = req.query.idusuario
  console.log(idusuario)

  const query = `SELECT * FROM usuarios_publicaciones 
      WHERE FkIdUsuario = ${idusuario}  AND  fechafin is not null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})



app.post('/ratePublicacionRecibida', auth(), async (req, res) => {
  const { idusuario, idpublicacion, rate, comentario } = req.body

  const query = `INSERT INTO usuarios_publicaciones_calificaciones(fkidusuario, fkidpublicacion, fkidcalificacion, comentario)
  VALUES(${idusuario}, ${idpublicacion}, ${rate}, '${comentario}')`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: 'calificacion agregada correctamente' })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})



app.get('/getUsuarioById', auth(), async (req, res) => {
  const idusuario = req.query.idusuario

  const query = `select idusuario, nombre, apellido, ci, fechanacimiento, fechaalta, fechabaja, fkiddireccion from usuarios where idusuario = ${idusuario} and fechabaja is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})


app.get('/getNullUsuarioById', auth(), async (req, res) => {
  const idusuario = req.query.idusuario

  const query = `select idusuario, nombre, apellido, ci, fechanacimiento, fechaalta, fechabaja, fkiddireccion from usuarios where idusuario = ${idusuario}`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getUsuarios', auth(), async (req, res) => {
  const query = `select idusuario, nombre, apellido, ci, fechanacimiento, fechaalta, fechabaja, fkiddireccion FROM usuarios where fechabaja is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getUsuariosNoAmigos', auth(), async (req, res) => {
  const idusuario = req.query.idusuario
  const query = `SELECT u.* FROM usuarios u  WHERE u.IdUsuario <> ${idusuario}
  AND NOT EXISTS(SELECT 1 FROM amigos a  WHERE((a.FkIdUsuario = u.IdUsuario AND a.FkIdAmigo = ${idusuario})
  OR(a.FkIdAmigo = u.IdUsuario AND a.FkIdUsuario = ${idusuario})) AND a.fechabaja is null and u.fechabaja is null)`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getDirecById', auth(), async (req, res) => {
  const iddirec = req.query.iddirec
  console.log(iddirec)

  const query = `select * from direcciones where iddireccion = ${iddirec} `
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getBarrioById', auth(), async (req, res) => {
  const idbarrio = req.query.idbarrio
  console.log(idbarrio)

  const query = `select * from barrios where idbarrio = ${idbarrio} `
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows[0] })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/addSkillToUser', auth(), async (req, res) => {
  const { id, idhabilidad } = req.body

  let fechaAlt = new Date()
  fechaAlt =
    fechaAlt.getFullYear() +
    '-' +
    fechaAlt.getMonth() +
    '-' +
    fechaAlt.getDate()

  const query = `insert into usuarios_habilidades
    (fkidusuario, fkidhabilidad, fechaalta) values(${id}, ${idhabilidad}, '${fechaAlt}')`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: 'Habilidad agregada correctamente' })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/deleteSkillFromUser', auth(), async (req, res) => {
  const { id, idhabilidad } = req.body

  let fechaAlt = new Date()
  fechaAlt =
    fechaAlt.getFullYear() +
    '-' +
    fechaAlt.getMonth() +
    '-' +
    fechaAlt.getDate()

  const query = `update usuarios_habilidades set fechabaja = '${fechaAlt}'
    where fkidusuario = ${id} and fkidhabilidad = ${idhabilidad} `
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: 'Habilidad eliminada correctamente' })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/editUsuario', auth(), async (req, res) => {
  let {
    nombre,
    apellido,
    calle,
    esquina,
    numpuerta,
    usuario,
    barrio,
    direccion,
    idusuario,
  } = req.body
  console.log(direccion)

  let direc = direccion.iddireccion
  nombre = nombre ? nombre : usuario.nombre
  apellido = apellido ? apellido : usuario.apellido

  calle = calle ? calle : direccion.calle
  esquina = esquina ? esquina : direccion.esquina
  numpuerta = numpuerta ? numpuerta : direccion.numero
  barrio = barrio ? barrio.idbarrio : direccion.fkidbarrio

  const query = `select * from direcciones where calle = '${calle}'
  and numero = '${numpuerta}' and esquina = '${esquina}' and fkidbarrio = ${barrio} `
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        console.log('Entre a error1')
        console.log(error)
        return res.send({ msg: error })
      }
      if (!result.rows[0]) {
        try {
          const query2 = `insert into direcciones
    (calle, numero, esquina, fkidbarrio) values
      ('${calle}', '${numpuerta}', '${esquina}', ${barrio}) RETURNING iddireccion`
          executeQueryWithTransaction(query2, (error, result) => {
            if (error) {
              console.log('Entre a error1')
              console.log(error)
              return res.send({ msg: error })
            }
            direc = result.rows[0].iddireccion
            try {
              const query4 = `update usuarios 
              set nombre = '${nombre}', apellido = '${apellido}', fkiddireccion = ${direc}
              where idusuario = ${idusuario} `

              executeQueryWithTransaction(query4, (error, result) => {
                if (error) {
                  console.log('Entre a error1')
                  console.log(error)
                  return res.send({ msg: error })
                }
                return res.send({ msg: 'Usuario editado!' })
              })
            } catch (error) {
              console.log('Entre a error2')

              return res.send({ msg: error })
            }
          })
        } catch (error) {
          console.log('Entre a error2')
          return res.send({ msg: error })
        }
      } else {
        try {
          direc = result.rows[0].iddireccion
          const query5 = `update usuarios 
          set nombre = '${nombre}', apellido = '${apellido}', fkiddireccion = ${direc}
          where idusuario = ${idusuario} `

          executeQueryWithTransaction(query5, (error, result) => {
            if (error) {
              console.log('Entre a error1')
              console.log(error)
              return res.send({ msg: error })
            }
            return res.send({ msg: 'Usuario editado!' })
          })
        } catch (error) {
          console.log('Entre a error2')

          return res.send({ msg: error })
        }
      }
    })
  } catch (error) {
    console.log('Entre a error2')
    return res.send({ msg: error })
  }
})

app.get('/getPublicacionesById', auth(), async (req, res) => {
  const query = `SELECT * FROM publicaciones WHERE fechabaja is null and fkidusuario = ${req.query.idusuario}`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        console.log(error)
        return res.send({ msg: error })
      }
      console.log(result.rows)
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getAllCitasById', auth(), async (req, res) => {
  const idUsuario = req.query.idUsuario
  console.log(idUsuario)

  const query = `select up.* from publicaciones as p
  join usuarios_publicaciones as up on p.idpublicacion = up.fkidpublicacion
  where p.fkidusuario = ${idUsuario} and up.fechabaja is null`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getCitasPendientes', auth(), async (req, res) => {
  const idUsuario = req.query.idUsuario
  console.log(idUsuario)

  const query = `select up.* from publicaciones as p
  join usuarios_publicaciones as up on p.idpublicacion = up.fkidpublicacion
  where p.fkidusuario = ${idUsuario} and up.fechaalta is not null and up.fechabaja is null and up.fechainicio is null and up.fechafin is null`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getCitasEnProceso', auth(), async (req, res) => {
  const idUsuario = req.query.idUsuario
  console.log(idUsuario)

  const query = `select up.* from publicaciones as p
  join usuarios_publicaciones as up on p.idpublicacion = up.fkidpublicacion
  where p.fkidusuario = ${idUsuario} and up.fechaalta is not null and up.fechabaja is null and
  up.fechainicio is not null and up.fechafin is null`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get('/getCitasFinalizadas', auth(), async (req, res) => {
  const idUsuario = req.query.idUsuario
  console.log(idUsuario)

  const query = `select up.* from publicaciones as p
  join usuarios_publicaciones as up on p.idpublicacion = up.fkidpublicacion
  where p.fkidusuario = ${idUsuario} and up.fechaalta is not null and up.fechabaja is null and
  up.fechainicio is not null and up.fechafin is not null`
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/pasarAEnProceso', auth(), async (req, res) => {
  const { fkidusuario, fkidpublicacion } = req.body
  console.log(fkidusuario + " " + fkidpublicacion)

  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaActual.getDate().toString().padStart(2, '0');
  const fechaAlt = `${year}-${month}-${day}`;
  console.log(fechaAlt)

  const query = `update usuarios_publicaciones
set fechainicio = '${fechaAlt}'
where fkidusuario = ${fkidusuario} and fkidpublicacion = ${fkidpublicacion} `
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: "Cita actualizada!" })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/cancelarCita', auth(), async (req, res) => {
  const { fkidusuario, fkidpublicacion } = req.body

  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaActual.getDate().toString().padStart(2, '0');
  const fechaAlt = `${year}-${month}-${day}`;
  console.log(fechaAlt)

  const query = `update usuarios_publicaciones
set fechabaja = '${fechaAlt}'
where fkidusuario = ${fkidusuario} and fkidpublicacion = ${fkidpublicacion} `
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: "Cita actualizada!" })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.post('/pasarAFinalizadas', auth(), async (req, res) => {
  const { fkidusuario, fkidpublicacion } = req.body

  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaActual.getDate().toString().padStart(2, '0');
  const fechaAlt = `${year}-${month}-${day}`;
  console.log(fechaAlt)

  const query = `update usuarios_publicaciones
set fechafin = '${fechaAlt}'
where fkidusuario = ${fkidusuario} and fkidpublicacion = ${fkidpublicacion} `
  console.log(query)
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        return res.send({ msg: error })
      }
      return res.send({ msg: "Cita actualizada!" })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get("/getPublisFiltradas", async (req, res) => {
  console.log("HLEHGEOHKHE")
  const filtro = req.query.filtro

  const query = `SELECT p.*
    FROM publicaciones AS p
  JOIN habilidades AS h ON h.idhabilidad = p.fkidhabilidad
  JOIN direcciones AS d ON d.iddireccion = p.fkiddireccion
  JOIN barrios AS b ON b.idbarrio = d.fkidbarrio
  WHERE(h.nombre LIKE '%${filtro}%' OR b.nombre LIKE '%${filtro}%' OR p.nombre LIKE '%${filtro}%') and p.fechabaja is null`
  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        console.log(error)
        return res.send({ msg: error })
      }
      console.log(result.rows)
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }
})

app.get("/getUsuariosFiltrados",auth(),async (req,res)=>{
  const filtro = req.query.filtro
  const idusuario = req.query.idusuario

  const query = `SELECT u.* FROM usuarios u  WHERE u.IdUsuario <> ${idusuario}
  AND
    (u.nombre LIKE '%${filtro}%' or u.apellido LIKE '%${filtro}%')
  AND NOT EXISTS(SELECT 1 FROM amigos a  WHERE
    ((a.FkIdUsuario = u.IdUsuario AND a.FkIdAmigo = ${idusuario})
  OR
    (a.FkIdAmigo = u.IdUsuario AND a.FkIdUsuario = ${idusuario}))
  AND 
    a.fechabaja is null
  AND
    u.fechabaja is null)`

  try {
    await executeQueryWithTransaction(query, (error, result) => {
      if (error) {
        console.log(error)
        return res.send({ msg: error })
      }
      console.log(result.rows)
      return res.send({ msg: result.rows })
    })
  } catch (error) {
    return res.send({ msg: error })
  }

})

app.listen(process.env.PORT || 8080, async () => {
  console.log(`Backend is running on port: ${process.env.PORT || 8080} `)
})
