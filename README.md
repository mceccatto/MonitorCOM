### Monitoramento de recebimento de porta COM

- Testado com balança BLEU ONE da UPX Solution
> Para os testes, a balança estava com as seguintes configurações:\
> Velocidade de comunicação: 9600\
> Modo de transmissão: Contínuo

**Processo de instalação**
- Crie uma pasta __MonitorCOM__ no diretório __C:/__
- Copie o conteúdo do projeto para dentro da pasta __C:/MonitorCOM__
- Altere as informações necessárias no arquivo __configuracoes.js__\
![](https://github.com/mceccatto/MonitorCOM/blob/main/prints/configuracoes.jpg)
- Abra o terminal e navegue até a pasta __C:/MonitorCOM__
- Execute o comando abaixo para criar o serviço de monitoramento (Lembre-se de instalar o NodeJS)\
`$ node installService.js`
- Para desinstalar o serviço de monitoramento, execute o comando abaixo (Lembre-se de navegar até a pasta __C:/MonitorCOM__)\
`$ node uninstallService.js`
- A API entregará um JSON com a seguinte estrutura:\
![](https://github.com/mceccatto/MonitorCOM/blob/main/prints/json.jpg)

**Visualização final**
- success === true\
![](https://github.com/mceccatto/MonitorCOM/blob/main/prints/success-true.jpg)
- success === false\
![](https://github.com/mceccatto/MonitorCOM/blob/main/prints/success-false.jpg)