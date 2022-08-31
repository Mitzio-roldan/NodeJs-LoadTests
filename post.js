const autocannon = require("autocannon");
require("dotenv").config();

//----------------------------\\
// PRUEBA METODO POST CON BODY
//----------------------------\\

// Variable para las peticiones 
let Inicio_contador = 2413



function startBench() {

    // URL para testear 
    const url = "http://localhost:" + process.env.PORT || 3000;

    const args = process.argv.slice(2);

    // Numero de conexiones/Usuarios
    const numConnections = args[0] || 500;

    // Numero de peticiones por conexion/usuario
    const maxConnectionRequests = args[1] || 1;

    // contador de request
    let requestNumber = 0;

    const instance = autocannon(
        {
            url,
            connections: numConnections,
            // Duracion maxima permitida de la prueba
            duration: 50,
            maxConnectionRequests,
            headers: {
                "content-type": "application/json",
            },
            // Timeout maximo permitido
            timeout: 50,
            requests: [
                {
                    method: "POST",
                    // Path de la URL
                    path: "/api/usuarios",
                    setupRequest: function (request) {
                        console.log("Request Number: ", requestNumber + 1);

                        // Body de la petición
                        request.body = JSON.stringify({
                            "nombre": `User${Inicio_contador}`,
                            "correo": `User${Inicio_contador}@test.com`,
                            "password": "123456",
                            "dni": "4385200",
                            "numero": "45464522",
                            "rol": "User"
                        });

                        requestNumber++;
                        Inicio_contador++

                        return request;
                    },
                },
            ],
        },
        finishedBench
    );

    autocannon.track(instance);

    // Devuelve los resultados
    function finishedBench(err, res) {
        console.log("Finished Bench", err, res);
    }
}

startBench();