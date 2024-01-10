const Service = require('node-windows').Service;

const service = new Service({
    name: 'Monitoramento de porta COM',
    description: 'Serviço de monitoramento de recebimento de dados oriundos da porta COM.',
    script: 'C:\\MonitorCOM\\server.js'
});

service.on('install', function () {
    console.log('O serviço de monitoramento da porta COM foi instalado com sucesso.');
    service.start();
});

service.install();