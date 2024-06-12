// https://cloud.ibm.com/services/natural-language-understanding/crn%3Av1%3Abluemix%3Apublic%3Anatural-language-understanding%3Aau-syd%3Aa%2F55a962177a0742b7987ef976d61d681c%3A08951877-97d3-49c3-ae67-d8c8b91dee2c%3A%3A?paneId=manage&new=true

// https://github.com/watson-developer-cloud/node-sdk

// Natural Language Understanding
//Compreensão da linguagem natural

const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("hello world");
});

const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({
    apikey: "jFt_oNSKfEwuL9CR0FPXsa4eWDpz-HJBA6cVmvX0HhR4",
  }),
  version: "2018-04-05",
  serviceUrl:
    "https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/08951877-97d3-49c3-ae67-d8c8b91dee2c",
});

// Obter o caminho completo para o arquivo
const filePath = path.join(__dirname, "../chatGPT.txt");

// Ler o conteúdo do arquivo HTML
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }

  // Chamar o método analyze com o conteúdo do arquivo
  nlu
    .analyze({
      text: data, // Buffer or String
      features: {
        entities: {
          sentiment: true,
          limit: 5, // número máximo de entidades a serem retornadas
        },
        keywords: {
          emotion: true,
          sentiment: true,
          limit: 5, // número máximo de palavras-chave a serem retornadas
        },
      },
    })
    .then((response) => {
      console.log(JSON.stringify(response.result, null, 2));
    })
    .catch((err) => {
      console.log("error: ", err);
    });
});

app.listen(3333, () => {
  console.log("listening on");
});
