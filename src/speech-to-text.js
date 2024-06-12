// https://cloud.ibm.com/services/natural-language-understanding/crn%3Av1%3Abluemix%3Apublic%3Anatural-language-understanding%3Aau-syd%3Aa%2F55a962177a0742b7987ef976d61d681c%3A08951877-97d3-49c3-ae67-d8c8b91dee2c%3A%3A?paneId=manage&new=true

// https://github.com/watson-developer-cloud/node-sdk

// Speech to Text
// Use o serviço Speech to Text para reconhecer o texto de um audio.wav arquivo.

const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: '0tO4DC6LpaciChxqM30Zk4Ou2x6TEKuBQ8bRuqQA5bcd' }),
  serviceUrl: 'https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/9a977f25-03b3-4099-bb87-b02f29fed9bb'
});

// Obter o caminho completo para o arquivo
const filePath = path.join(__dirname, "../president.wav");

app.post('/speech-to-text', (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Arquivo não encontrado");
  }

  // Crie o fluxo de leitura do arquivo
  const audioStream = fs.createReadStream(filePath);

   // Defina os parâmetros para a solicitação de reconhecimento de fala
   const params = {
    audio: audioStream,
    contentType: 'audio/wav',
  };
  
    // Envie a solicitação de reconhecimento de fala
    speechToText.recognize(params)
    .then(response => {
      res.json(response.result); // Envie a resposta JSON para o cliente
    })
    .catch(err => {
      console.error("Erro durante o reconhecimento de fala:", err);
      res.status(500).send("Erro durante o reconhecimento de fala");
    });
})

app.listen(3333, () => {
  console.log("listening on");
});
