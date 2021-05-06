const hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = hapi.Server({
        port: 5000,
        host: 'localhost',
        //TODO 11: Penerapan CORS dengan menggunakan Hapi.
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    //TODO 9: gunakan route configuration pada server.
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();