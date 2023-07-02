INSERT INTO preguntas_frecuentes(pregunta, respuesta)
VALUES('¿Cómo puedo crear una cuenta en el sitio web?', 'Para crear una cuenta en nuestro sitio web, simplemente haz clic en el botón "Registrarse". Luego, completa el formulario de registro con la información requerida.'),
('¿Se puede cancelar una cita?', 'Es posible cancelar una cita siempre y cuando la cita no se encuentre en progreso.'),
('¿Donde puedo visualizar a mis amigos?', 'Para visualizar la lista de amigos, simplemente haz clic en el botón “Amigos”  de la barra de navegación. Se te desplegara una lista de tus amigos.'),
('¿Cómo agrego a un amigo?', 'Para agregar a un usuario como amigo, debes buscarlo en la sección de “Usuarios” por nombre o apellido y presionar el botón “Añadir”.');

INSERT INTO barrios(Nombre)
VALUES ('Parque rodó'), ('Palermo'),
('MalvIn'),('La Blanqueada'), ('Punta Gorda'), ('Buceo'),('Pocitos'),('Carrasco');

INSERT INTO Calificaciones (numero)
Values (1),
(2),
(3),
(4),
(5);

INSERT INTO habilidades(Nombre, FechaAlta, FechaBaja) 
VALUES ('Cortar el pasto', '2023-07-23', null),
 ('Limpieza del hogar', '2023-06-15', null),
 ('Pintura de interiores', '2023-08-02', null),
 ('Reparación de electrodomésticos', '2023-07-10', null),
 ('Clases de yoga', '2023-06-28', null),
 ('Diseño de páginas web', '2023-08-10', null),
 ('Servicio de catering', '2023-07-01', null),
 ('Entrenamiento personalizado', '2023-07-17', null),
 ('Asesoría financiera', '2023-08-05', null),
 ('Traducción de documentos', '2023-07-05', null),
 ('Servicio de plomería', '2023-06-20', '2023-09-10'),
 ('Clases de piano', '2023-07-05', '2023-08-30');

INSERT INTO direcciones(Calle, Numero, Esquina, FkIdBarrio)
VALUES ('Av. 8 de Octubre',2733,'Estero Bellaco', 4),
('Av. Ramón Anador', 1234, 'Canelones', 1),
('18 de Julio', 5678, ' Ejido', 2),
('Av. Italia', 910, 'Rambla OHiggins', 3),
('Av. 8 de Octubre', 4321,  'Gonzalo Ramírez', 4),
('Rambla República de México', 2468, 'Prudencio Vázquez',5),
('Av. Brasil', 1357, 'Luis Alberto de Herrera', 6),
('Rambla República del Perú', 9876, 'Ellauri', 7),
( 'Av. Arocena', 5432, 'Rambla República Argentina', 8);

INSERT INTO usuarios (Nombre, Apellido, Ci, Pswd, FechaNacimiento, FechaAlta, FechaBaja, FkIdDireccion)
VALUES ('Pepe','Martinez','2345678', '' ,'2002-08-28','2023-07-23',null,1),
('Jose','Perez','3456789', '','1999-04-12','2023-07-23',null,2),
('Maria', 'Martinez', '1234567', '', '1987-07-07', '2023-06-26',null,3),
('Luis', 'Ramirez', '3232451', '', '1991-01-03', '2023-06-26',null,4),
('Juan', 'Lopez', '6782731', '', '2000-05-05', '2023-06-26', null, 5),
('Gonzalo', 'González', '9838921', '', '2001-08-09', '2023-06-26',null,6),
('Nicolas','Maisonnave','51368035','$2b$08$hBa6wic6XBnbVfm8pjYHW.CkMYY.rPCGDkaV3ByeGxYJObyBkA1d.
','2000-08-25', '2023-06-26',null,7),
('Test','prueba','12345678','$2b$08$hBa6wic6XBnbVfm8pjYHW.CkMYY.rPCGDkaV3ByeGxYJObyBkA1d.
','2000-08-25', '2023-06-26',null,7);

INSERT INTO amigos (FkIdUsuario, FkIdAmigo , FechaSolicitud , FechaAlta , FechaBaja ) 
VALUES (7,2,'2023-07-23','2023-07-23',null),
(7,3,'2023-07-23','2023-06-23',null),
(7,4, '2023-06-26',null,null ),
(7,5, '2023-06-26', '2023-06-26',null),
(7,6, '2023-06-26', null, null),
(8,2,'2023-07-23','2023-07-23',null),
(8,3,'2023-07-23','2023-06-23',null),
(8,4, '2023-06-26',null,null ),
(8,5, '2023-06-26', '2023-06-26',null),
(8,6, '2023-06-26', null, null);

INSERT INTO usuarios_habilidades(FkIdUsuario, FkIdHabilidad ,FechaAlta ,FechaBaja )
VALUES (7,1,'2023-06-23',null),
(7,2,'2023-06-23',null),
(7,3,'2023-06-23',null),
(7,4,'2023-06-23',null),
(8,1,'2023-06-23',null),
(8,2,'2023-06-23',null),
(8,3,'2023-06-23',null),
(8,4,'2023-06-23',null),
(5,6,'2023-06-23',null),
(5,7,'2023-06-23',null),
(2,8,'2023-06-23',null),
(1,9,'2023-06-23',null),
(1,1,'2023-06-23',null),
(3,7,'2023-06-23',null),
(3,6,'2023-06-23',null),
(4,4,'2023-06-23',null),
(6,1,'2023-06-23',null);

INSERT INTO publicaciones(Nombre, Descripcion, FechaAlta, FechaBaja, EsPresencial, FkIdUsuario, FkIdHabilidad, FkIdDireccion)
VALUES ('Servicio de reparación de electrodomésticos', 'Ofrezco servicios de reparación de todo tipo de electrodomésticos, como lavadoras, refrigeradores y hornos. Cuento con experiencia en el campo y garantizo un trabajo de calidad.', '2023-06-27', null, true, 7, 4, 3), ('Clases de yoga', 'Imparto clases de yoga para todos los niveles, desde principiantes hasta avanzados. Las clases se enfocan en la relajación, la flexibilidad y el bienestar general. ¡Ven y únete a una clase!', '2023-06-28', null, true, 5, 6, 5),
('Servicio de catering para eventos', 'Brindo servicios de catering para todo tipo de eventos, como bodas, fiestas de cumpleaños y reuniones corporativas. Ofrezco una variedad de opciones de menú y garantizo una experiencia culinaria excepcional.', '2023-06-29', null, true, 2, 8, 7),
('Diseño de páginas web personalizadas', 'Creo páginas web personalizadas según las necesidades y preferencias del cliente. Utilizo tecnologías modernas y garantizo un diseño atractivo y funcional.', '2023-06-30', null, false, 1, 9, 8),
('Servicio de plomería', 'Realizo servicios de plomería, incluyendo reparaciones de tuberías, instalación de grifos y desatascos. Cuento con herramientas profesionales y experiencia en el campo.', '2023-07-01', null, true, 4, 4, 6),
('Servicio de corte de césped', 'Ofrezco servicios de corte de césped para jardines de cualquier tamaño. Utilizó herramientas profesionales y garantizo un trabajo de calidad.', '2023-06-25', null, true, 7, 1, 1),
('Servicio de limpieza de hogar', 'Realizó limpieza profunda de hogares, incluyendo habitaciones, baños, cocinas y áreas comunes. Utilizo productos ecológicos y tengo experiencia en limpieza de alta calidad.', '2023-06-26', null, false, 8, 2, 2),
('Servicio Premium de corte de césped','Ofrezco servicios de corte de césped para jardines de cualquier tamaño. Utilizó herramientas profesionales y garantizo un trabajo de calidad.', '2023-06-25', null, true, 8, 1, 3),
('Clases de piano', 'Ofrezco clases de piano para estudiantes de todas las edades y niveles. Enseñó técnicas de interpretación, teoría musical y repertorio variado. ¡Ven y descubre el maravilloso mundo de la música!', '2023-07-02', null, true, 5, 7, 4),
('Asesoría financiera personalizada', 'Brindó asesoramiento financiero personalizado para ayudarte a alcanzar tus metas financieras. Analizo tu situación actual, desarrollo estrategias y te proporcionó recomendaciones claras y concisas.', '2023-07-03', null, false, 3, 7, 5), ('Traducción de documentos', 'Realizo traducciones precisas y profesionales de documentos en varios idiomas. Ya sea que necesites traducir documentos legales, técnicos o generales, puedo ayudarte a comunicarte efectivamente.', '2023-07-04', null, true, 3, 6, 6);

INSERT INTO usuarios_publicaciones (FkIdUsuario, FkIdPublicacion, FkIdDireccion, FechaSolicitud, FechaSolicitada, FechaAlta, FechaBaja, FechaInicio, FechaFin)
VALUES (2,6,1,'2023-07-23','2023-07-23','2032-07-23',null,'2023-07-24',null),
(3,5,1,'2023-07-23','2023-07-23','2023-07-23',null,'2023-07-24', '2023-07-24');

INSERT INTO usuarios_publicaciones (FkIdUsuario, FkIdPublicacion, FkIdDireccion, FechaSolicitud, FechaSolicitada, FechaAlta, FechaBaja, FechaInicio, FechaFin) VALUES 
(2,1,1,'2023-05-05','2023-06-06',null,null,null,null), (3,1,2,'2023-05-05','2023-06-06','2023-06-25',null,null,null),
(4,1,3,'2023-05-05','2023-06-06','2023-06-25',null,'2023-06-27',null),
(5,1,4,'2023-05-05','2023-06-06','2023-06-25',null,'2023-06-27','2023-07-03'),
(2,7,1,'2023-05-05','2023-06-06',null,null,null,null), (3,7,2,'2023-05-05','2023-06-06','2023-06-25',null,null,null),
(4,7,3,'2023-05-05','2023-06-06','2023-06-25',null,'2023-06-27',null),
(5,7,4,'2023-05-05','2023-06-06','2023-06-25',null,'2023-06-27','2023-07-03');

INSERT INTO usuarios_publicaciones_calificaciones (FkIdUsuario,FkIdPublicacion,FkIdCalificacion,comentario)
VALUES (5,1,5,'Muy bueno trabajo.'),(5,7,3,'Mal trato');

