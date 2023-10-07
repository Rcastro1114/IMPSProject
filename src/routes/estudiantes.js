const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
const estudiantes = await queries.obtenerTodosLosEstudiantes();

    response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
// Renderizamos el formulario
response.render('estudiantes/agregar');
});

// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {
    const {idestudiante, nombre, apellido, email, idcarrera, usuario} = request.params;
    const resultado = await queries.agregarEstudiante(idestudiante, nombre, apellido, email, idcarrera, usuario);
    if(!resultado.nombre == ''){
        console.log('Debe ingresar todos los campos');
    }else{
        console.log('Datos ingresados correctamente');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
        const { idestudiante } = request.params;
        const resultado = await queries.eliminarEstudiante(idestudiante);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});
module.exports = router;