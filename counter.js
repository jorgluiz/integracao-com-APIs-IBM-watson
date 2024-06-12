const fs = require('fs');
const path = require('path');

  // Obter o caminho completo para o arquivo
  const filePath = path.join(__dirname, './chatGPT.txt');

// Função para ler o conteúdo do arquivo
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Conta ocorrências da palavra "you"
    const count = (data.match(/you/gi) || []).length;

    console.log("Número de ocorrências da palavra 'you' no arquivo:", count);
});
