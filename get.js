const autocannon = require("autocannon");
require("dotenv").config();

//----------------------------\\
// PRUEBA METODO GET
//----------------------------\\




function startBench() {

  // URL para testear
  const url = "http://localhost:" + process.env.PORT || 3000;

  const args = process.argv.slice(2);

  // Numero de conexiones/Usuarios
  const numConnections = args[0] || 1000;

  // Numero de peticiones por conexion/usuario
  const maxConnectionRequests = args[1] || 10;

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
      requests: [
        {
          method: "GET",
          // Path de la URL
          path: "/api/usuarios",
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