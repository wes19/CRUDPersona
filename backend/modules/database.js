const mysql = require('mysql2/promise');

class Database {
    constructor() {
        this.initialize();
    }

    async initialize() {
        try {
            this.pool = mysql.createPool({
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: '12345678',
                database: 'crudpersona'
            });

            const connection = await this.pool.getConnection();
            console.log('CONEXION EXITOSA A LA BASE DE DATOS');
            connection.release();
        } catch (error) {
            console.error('ERROR AL CONECTARSE A LA BASE DE DATOS: ', error);
        }
    }

    async query(sql, values) {
        const connection = await this.pool.getConnection();
        try {
            const [results, fields] = await connection.query(sql, values);
            return results;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = new Database();
