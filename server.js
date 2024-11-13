const express = require('express');
const fs = require('fs');
const cors = require('cors');  // Importe o pacote cors
const app = express();
const port = 3000;

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Endpoint para receber dados do quiz e salvar em respostas.txt
app.post('/saveQuiz', (req, res) => {
    const { nome, respostasCorretas, dataHora } = req.body;

    // Formata os dados em uma linha de texto
    const resposta = `Nome: ${nome}, Respostas Corretas: ${respostasCorretas}, Data e Hora: ${dataHora}\n`;

    // Adiciona a resposta ao final do arquivo "respostas.txt"
    fs.appendFile('respostas.txt', resposta, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao salvar a resposta.' });
        }
        res.status(200).json({ message: 'Resposta salva com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
