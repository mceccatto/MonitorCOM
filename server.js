const { SerialPort } = require('serialport');
const cors = require('cors');
const http = require('http');
const express = require('express');
const conf = require('./configuracoes');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

const server = http.createServer(app);
server.listen(conf.portaTCP, conf.hostIP, () => {
    console.log('API sendo executada na porta em http://' + conf.hostIP + ':' + conf.portaTCP);
});

let respostaJson = {
    success: null,
    closeMessage: null,
    errorMessage: null,
    reconnectMessage: null,
    peso: null
};

let conexaoCOM = function () {
    const port = new SerialPort({
        path: conf.portaCOM,
        baudRate: conf.baudRate
    }).setEncoding('hex');

    port.on('readable', function () {
        let hex = port.read();
        var str = '';
        for (var i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        str = parseInt(str.replace(/[^\x20-\x7E]/g, ''));
        if (!isNaN(str)) {
            if (str > 0) {
                respostaJson.peso = str;
            } else {
                respostaJson.peso = 0;
            }
        }
        respostaJson.success = true;
        respostaJson.closeMessage = null;
        respostaJson.errorMessage = null;
        respostaJson.reconnectMessage = null;
    });

    port.on('close', function () {
        respostaJson.success = false;
        respostaJson.closeMessage = 'A conexão com a porta ' + conf.portaCOM + ' foi fechada';
        respostaJson.peso = null;
        reconexaoCOM();
    });

    port.on('error', function (err) {
        respostaJson.success = false;
        respostaJson.errorMessage = '' + err;
        respostaJson.peso = null;
        reconexaoCOM();
    });
}

let reconexaoCOM = function () {
    respostaJson.reconnectMessage = 'Iniciando tentativas de conexão com a porta ' + conf.portaCOM;
    console.log(respostaJson);
    setTimeout(function () {
        conexaoCOM();
    }, 5000);
}

conexaoCOM();

app.get('/', function (req, res) {
    res.status(200).json(respostaJson);
});