const pool = require('../config/databaseController');

module.exports = {

    //consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async() => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error);
        }
    },

    //eliminar estudiante
     eliminarEstudiante: async(idestudiante) => {
        try{
            const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ? ', [idestudiante]);
            return result.affectedRows > 0;
        }catch(error){
            console.error('Error al eliminar el registro', error);
        }
    },

    //agregar estudiante
    agregarEstudiante: async(idestudiante, nombre, apellido, email, idcarrera, usuario) => {
        try {
            const result = await pool.query('INSERT INTO estudiantes(idestudiantes,nombre,apellido,email,idcarrera,usuario) VALUES(?,?,?,?,?,?)',[idestudiante],[nombre],[apellido],[email],[idcarrera],[usuario])
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al ingresar el registro', error);
        }
    }


}

