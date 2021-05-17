import express from 'express';
import AWS from 'aws-sdk';

// Função para envio da mensagem
async function sendSMS({ sns, Message, PhoneNumber }) {
  // Definições sobre o tipo de mensagem
  await sns.setSMSAttributes({
    attributes: {
      DefaultSMSType: 'Promotional'
    }
  }).promise();
  
  // Envio da mensagem
  sns.publish({
    Message,
    PhoneNumber, 
  }).promise();

  
}

AWS.config.update({region: 'sa-east-1'});

const sns = new AWS.SNS({apiVersion: '2010-03-31'});

// Criação da API
const app = express();
app.use(express.json());
app.post('/send-sms', (req, res) => {
  const { PhoneNumber, Message } = req.body;
  console.log(`PhoneNumber: ${PhoneNumber} and Message: ${Message}`);
  
  sendSMS({ sns, PhoneNumber, Message });
  return res
    .status(201)
    .end();
});

app.listen(process.env.PORT || 3000);
console.log('Serviço Iniciado!')


/*
O arquivo de credenciais compartilhado no Linux, Unix e macOS: ~/.aws/credentials

O arquivo de credenciais compartilhado no Windows: C:\Users\USER_NAME\.aws\credentials

Se você ainda não tiver um arquivo de credenciais compartilhadas, consulte Obter as credenciais. Depois que seguir essas instruções, você verá um texto semelhante ao seguinte no arquivo de credenciais, em que <YOUR_ACCESS_KEY_ID> é seu ID de chave de acesso e <YOUR_SECRET_ACCESS_KEY> é a chave de acesso secreta:

[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>

*/


/*
// Configuração da SDK
const {
  AWS_ACCESS_KEY_ID: accessKeyId,
  AWS_SECRET_ACCESS_KEY: secretAccessKey,
 } = process.env;

AWS.config.update({
  region: 'sa-east-1',
  accessKeyId,
  secretAccessKey,
});
*/
