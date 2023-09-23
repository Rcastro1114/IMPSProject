const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const { CONSTANTS } = require('../utils/util');

//console.error(database);
const pool = mysql.createPool(database); //se crea el pool de conexiones


//iniciando conexión en la base de datos
pool.getConnection((error, conexion) => {
    //validar si la conexion tiene algun tipo de error
    if(error) {
        switch(error.code){
            case CONSTANTS.PROTOCOL_CONNECTION_LOST:
                //INDICA QUE LA CONEXION CON LA BASE DE DATOS ESTÁ PERDIDA
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
                //INDICA QUE EXISTEN DEMASIADAS CONEXIONES
            case CONSTANTS.ER_CON_COUNT_ERROR:
                console.error('DATABASE HAS TO MANY CONNECTIONS');
                break;
                //INDICA QUE LA CONEXION FUE RECHAZADA
            case CONSTANTS.ECONNREFUSED:
                console.error('DATABASE CONNECTION WAS REFUSED');
                break;
                //INDICA QUE LA CONEXION FUE DENEGADA
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                console.error('ACCESS DENIED FOR USER');
                break;
            default:
                console.error('ERROR DE BASE DE DATOS NO ENCONTRADA');
                break;                   
        }
    }

    //SI LA CONEXION ES EXITOSA, IMPRIMIR UN MENSAJE INDICANDOLO
    if(conexion){
        console.log('Conexion establecida con la base de datos');
        conexion.release();
    }
    return;
});

//CONFIGURANDO PROMISIFY PARA PERMITIR EN CADA CONSULTA UN async/await (promesas)
pool.query = promisify(pool.query);

module.exports = pool;

