
import winston from 'winston';
import * as dotenv from 'dotenv'; dotenv.config()
// rutas recibidas con info
// rutas incorrectas con warning
// errores de las apis error
function loggerProd() {
    const loggerProd = winston.createLogger({
        format: winston.format.combine(
            winston.format.simple(),
            winston.format.prettyPrint()
        ),
        transports: [
            new winston.transports.File({
                filename: 'src/logs/debug/debugFile.log', //? CARPETA HACIA DONDE ESTARA DIRIGIDO LOS ARCHIVOS
                level: 'debug',
                maxFiles: 5,
                maxsize: 5242880, /// 5mb
                handleExceptions: true,
                json: true,
                colorize: false
            }),
            new winston.transports.File({
                filename: 'src/logs/debug/errorFile.log', //? CARPETA HACIA DONDE ESTARA DIRIGIDO LOS ARCHIVOS
                level: 'error',
                maxFiles: 5,
                maxsize: 5242880, /// 5mb
            }),
        ],
       
    });

    // //todo --> OTRA FORMA DE CONECTAR CON MORGAN Y MOSTRAR EN ARCHIVOS LOS REGISTROS */
    // loggerProd.stream = {
    //     write: function (message, encoding){
    //         loggerProd.info(message)
    //     }
    // }
    return loggerProd;
}

function loggerDev() {
    const loggerDev = winston.createLogger({
        transports: [new winston.transports.Console({ level: 'info' })],
    });
    return loggerDev;
}

//** CONFIGURACION VARIABLE DE ENTORNO */

let logger = null;
if (process.env.NODE_ENV === 'PRODUCTION') {
    logger = loggerProd();
} else {
    logger = loggerDev();
}

export default logger
