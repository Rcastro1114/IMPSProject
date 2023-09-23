const express = require('express');

//inicializamos
const app = express();

//ajuste del sevidor
app.set('port', process.env.PORT || 4000);

//iniciar el servidor
app.listen(app.get('port'), ()=> {
    console.log('Servidor iniciado en el puerto: ', app.get('port'));
});