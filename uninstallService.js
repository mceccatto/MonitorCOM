const Service = require('node-windows').Service;

const service = new Service({
    name: 'Monitoramento de porta COM',
    description: 'Serviço de monitoramento de recebimento de dados oriundos da porta COM',
    script: 'C:\\MonitorCOM\\server.js'
});

service.stop();

service.on('uninstall', function () {
    console.log('O serviço de monitoramento da porta COM foi desinstalado com sucesso.');
});

service.uninstall();