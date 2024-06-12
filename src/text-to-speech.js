// https://cloud.ibm.com/services/natural-language-understanding/crn%3Av1%3Abluemix%3Apublic%3Anatural-language-understanding%3Aau-syd%3Aa%2F55a962177a0742b7987ef976d61d681c%3A08951877-97d3-49c3-ae67-d8c8b91dee2c%3A%3A?paneId=manage&new=true

// https://github.com/watson-developer-cloud/node-sdk

// Texto para fala
// Use o serviço Text to Speech para sintetizar texto em um arquivo de áudio.

const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({ apikey: '0YCyKyhqpXQicsh4ZwdY7XJod3RtKXoDvNZJzHydtpPV' }),
  serviceUrl: 'https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/aaf294c0-4714-4053-9efa-9e1e4b16cbce'
});

// Obter o caminho completo para o arquivo
const filePath = path.join(__dirname, "../bruno-mars.txt");

app.post('/text-to-speech', (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Arquivo não encontrado");
  }

  const params = {
    text: fs.readFileSync(filePath, 'utf-8'), // Corrigido para ler o conteúdo do arquivo
    voice: 'pt-BR_IsabelaV3Voice', // Optional voice
    accept: 'audio/wav'
  };
  
  textToSpeech.synthesize(params)
  .then(response => {
    const audio = response.result;
    return textToSpeech.repairWavHeaderStream(audio);
  })
  .then(repairedFile => {
    fs.writeFileSync('bruno-mars.wav', repairedFile);
    console.log('audio.wav written with a corrected wav header');
    res.send("ok")
  })
  .catch(err => {
    console.log(err);
  });
})

app.listen(3334, () => {
  console.log("listening on");
});
