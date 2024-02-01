CREATE DATABASE crudpersona;

CREATE TABLE crudpersona.persona (
    idPer INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(50),
    apellidos VARCHAR(50),
    fecha_de_nacimiento DATE,
    tipo_documento VARCHAR(20),
    numero_documento VARCHAR(20),
    estado VARCHAR(10)
);

INSERT INTO crudpersona.persona (nombres, apellidos, fecha_de_nacimiento, tipo_documento, numero_documento, estado) VALUES
('Juan', 'Pérez', '1990-05-15', 'DNI', '12345678', 'Activo'),
('María', 'Gómez', '1985-08-22', 'Pasaporte', 'A123456', 'Inactivo'),
('Carlos', 'Rodríguez', '1995-02-10', 'Cédula', '98765432', 'Activo'),
('Ana', 'Martínez', '1980-11-30', 'DNI', '87654321', 'Inactivo');

SELECT * FROM crudpersona.persona;
