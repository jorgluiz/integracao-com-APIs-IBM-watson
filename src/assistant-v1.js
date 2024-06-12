// // https://cloud.ibm.com/services/natural-language-understanding/crn%3Av1%3Abluemix%3Apublic%3Anatural-language-understanding%3Aau-syd%3Aa%2F55a962177a0742b7987ef976d61d681c%3A08951877-97d3-49c3-ae67-d8c8b91dee2c%3A%3A?paneId=manage&new=true

// // https://github.com/watson-developer-cloud/node-sdk

// // https://us-east.assistant.watson.cloud.ibm.com/crn%3Av1%3Abluemix%3Apublic%3Aconversation%3Aus-east%3Aa%2F55a962177a0742b7987ef976d61d681c%3A3716c1ee-f343-48b3-ab23-d5cdcf004b00%3A%3A/assistants/6a7f8979-ae14-444d-be3c-6048736d12ba/home

// // Texto para fala
// // Use o serviço Text to Speech para sintetizar texto em um arquivo de áudio.

// const express = require("express");
// const bodyParser = require('body-parser');
// const app = express();

// const AssistantV1 = require('ibm-watson/assistant/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const assistant = new AssistantV1({
//   authenticator: new IamAuthenticator({ apikey: 'n7X3rmXI0_xvNmFI7_-vsbCaOtGgdTo-hAdOBKJoUjT9' }),
//   url: "https://api.us-east.assistant.watson.cloud.ibm.com/instances/3716c1ee-f343-48b3-ab23-d5cdcf004b00",
//   serviceUrl: 'https://api.us-east.assistant.watson.cloud.ibm.com',
//   version: '2018-02-16',
//   headers: {
//     "X-Watson-Learning-Opt-Out": "true",
//   }
// });

// app.post('/assistant', (req, res) => {
//   const text = req.body.text

//   assistant.message(
//     {
//       input: {text: "estou precisando de uma dica?"},
//       workspaceId: '4cb3fd6a-ec34-42ed-b6b7-2497eb698003'
//     })
//     .then(response => {
//       res.send(JSON.stringify(response.result, null, 2))
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(404).send({message: "Not Found"})
//     });
  
//   })

// app.listen(3333, () => {
//   console.log("listening on");
// });



const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV1({
  authenticator: new IamAuthenticator({ apikey: 'qJ35KyTvGikpod6v7P2oh30SDjCGdmhfEzUPgIT_Y5C0' }),
  serviceUrl: 'https://api.us-east.assistant.watson.cloud.ibm.com/instances/3716c1ee-f343-48b3-ab23-d5cdcf004b00',
  version: '2018-02-16'
});

// Endpoint para enviar uma mensagem para o assistente
app.get('/assistant/message', async (req, res) => {
  const text = req.body.text;

  assistant.message(
    {
      input: { text: "tudo bem?" },
      workspaceId: 'e952bcd1-37ca-409b-a4f0-81acbf87e2df'
    })
    .then(response => {
      res.send(JSON.stringify(response.result, null, 2))
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3333, () => {
  console.log("listening on");
});

