--Creacion tablas
CREATE TABLE usuarios(
    IdUsuario SERIAL PRIMARY KEY,
    Nombre varchar(255),
    Apellido varchar(255),
    Ci varchar(255),
	Pswd varchar(255),
    FechaNacimiento varchar(255),
	FechaAlta Date,
	FechaBaja Date,
	FkIdDireccion int
);
Create table amigos(
	FkIdUsuario int,
	FkIdAmigo int,
	FechaSolicitud Date,
	FechaAlta Date,
	FechaBaja Date
);
Create table habilidades(
	IdHabilidad SERIAL PRIMARY KEY,
	Nombre varchar(255),
	FechaAlta Date,
	FechaBaja Date
);
CREATE TABLE usuarios_habilidades(
	FkIdUsuario int,
	FkIdHabilidad int,
	FechaAlta Date,
	FechaBaja Date
);
Create table publicaciones(
	IdPublicacion SERIAL PRIMARY KEY,
	Nombre varchar(255),
	Descripcion varchar(255),
	FechaAlta Date,
	FechaBaja Date,
	EsPresencial boolean,
	FkIdUsuario int,
	FkIdHabilidad int,
	FkIdDireccion int
);
Create table usuarios_publicaciones(
	FkIdUsuario int,
	FkIdPublicacion int,
	FkIdDireccion int,
	FechaSolicitud Date,
	FechaSolicitada Date,
	FechaAlta Date,
	FechaBaja Date,
	FechaInicio Date,
	FechaFin Date
);
Create table calificaciones(
	IdCalificacion SERIAL PRIMARY KEY,
	Numero int
);
Create table usuarios_publicaciones_calificaciones(
	FkIdUsuario int, 
	FkIdPublicacion int,
	FkIdCalificacion int,
	Comentario varchar(255)
);
Create table barrios(
	IdBarrio SERIAL PRIMARY KEY,
	Nombre varchar(255)
);
Create table direcciones(
	IdDireccion SERIAL PRIMARY KEY,
	Calle varchar(255),
	Numero varchar(10),
	Esquina varchar(255),
	FkIdBarrio int
);
CREATE TABLE preguntas_frecuentes(
	IdPreguntaFrecuente SERIAL PRIMARY KEY,
	Pregunta varchar(255),
	Respuesta varchar(255),
	FechaAlta Date,
	FechaBaja Date
);


--Agregando PKs
ALTER TABLE amigos ADD CONSTRAINT PK_amigos PRIMARY KEY (FkIdUsuario, FkIdAmigo);
ALTER TABLE usuarios_habilidades ADD CONSTRAINT PK_usuarios_habilidades PRIMARY KEY (FkIdUsuario,FkIdHabilidad);
ALTER TABLE usuarios_publicaciones ADD CONSTRAINT PK_usuarios_publicaciones PRIMARY KEY (FkIdUsuario,FkIdPublicacion);
ALTER TABLE usuarios_publicaciones_calificaciones ADD CONSTRAINT PK_usuarios_publicacionescalificaciones PRIMARY KEY (FkIdUsuario,FkIdPublicacion,FkIdCalificacion);


--Agregando FKs
--Usuario
Alter table usuarios add constraint Fk_UsuarioBarrio
	Foreign key (FkIdDireccion) references direcciones(IdDireccion);
--amigos
Alter table amigos add constraint Fk_UsuarioAmigoUNO 
	Foreign key (FkIdUsuario) references usuarios(IdUsuario);
Alter table amigos add constraint Fk_UsuarioAmigoDOS 
	Foreign key (FkIdAmigo) references usuarios(IdUsuario);
--usuariosHabiliadades
Alter table usuarios_habilidades add constraint FK_UsuariosHabiliadadUsuario 
	Foreign key (FkIdUsuario) references usuarios(IdUsuario);
Alter table usuarios_habilidades add constraint FK_UsuariosHabiliadadHabiliadad
	Foreign key (FkIdHabilidad) references habilidades(IdHabilidad);
--publicaciones
Alter table publicaciones add constraint FK_PublicacionesUsuarioHabilidad 
	Foreign key (FkIdUsuario,FkIdHabilidad) references usuarios_habilidades(FkIdUsuario,FkIdHabilidad);
Alter table publicaciones add constraint FK_PublicacionesDireccion
	Foreign key (FkIdDireccion) references direcciones(IdDireccion);
--UsuarioPublicacion
Alter table usuarios_publicaciones add constraint FK_UsuarioPublicacionUsuario 
	Foreign key (FkIdUsuario) references usuarios(IdUsuario);
Alter table usuarios_publicaciones add constraint FK_UsuarioPublicacionPublicacion
	Foreign key (FkIdPublicacion) references publicaciones(IdPublicacion);
Alter table usuarios_publicaciones add constraint FK_UsuarioPublicacionDireccion
	Foreign key (FkIdDireccion) references direcciones(IdDireccion);
--UsuarioPublicacionCalificacion
Alter table usuarios_publicaciones_calificaciones ADD CONSTRAINT FK_UsuarioPublicacionCalificacionUsuarioPublicacion
	FOREIGN KEY (FkIdUsuario,FkIdPublicacion) REFERENCES usuarios_publicaciones(FkIdUsuario,FkIdPublicacion);
Alter table usuarios_publicaciones_calificaciones ADD CONSTRAINT FK_UsuarioPublicacionCalificacionCalificacion
	FOREIGN KEY (FkIdCalificacion) REFERENCES calificaciones(IdCalificacion);
--Direccion
ALTER TABLE direcciones ADD CONSTRAINT FK_DireccionBarrio
	FOREIGN KEY (FkIdBarrio) REFERENCES barrios(IdBarrio);




