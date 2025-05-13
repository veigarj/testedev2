const express = require('express');
const app = express();
const fs = require('fs').promises;
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function carregarDados() {
  const dados = await fs.readFile('dados.json', 'utf-8');
  return JSON.parse(dados);
}

app.get('/', async (req, res) => {
    res.send('API de dados JSON');
});

app.get('/dias', async (req, res) => {
  try {
    const dados = await carregarDados();
    res.send(dados);
    
    const diasComFaturamento = dados.filter(dia => dia.valor > 0);

    const menorFaturamento = Math.min(...diasComFaturamento.map(dia => dia.valor));

    const maiorFaturamento = Math.max(...diasComFaturamento.map(dia => dia.valor));

    const mediaMensal = diasComFaturamento.reduce((sum, dia) => sum + dia.valor, 0) / diasComFaturamento.length;

    const diasAcimaDaMedia = diasComFaturamento.filter(dia => dia.valor > mediaMensal).length;

    // Result
    console.log('Menor valor de faturamento:', menorFaturamento);
    console.log('Maior valor de faturamento:', maiorFaturamento);
    console.log('Número de dias com faturamento acima da média:', diasAcimaDaMedia);


  } catch (err) {
    res.status(500).json({ erro: "Erro ao ler o arquivo JSON" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});