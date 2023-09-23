const express = require('express');

//inicializamos
const app = express();

require('dotenv').config()

//ajuste del sevidor
app.set('port', process.env.PORT || 4500);

app.use(require('./routes'));

//iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto: ', app.get('port'));
});