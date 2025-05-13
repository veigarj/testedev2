const faturamentoPorEstado = {
  'SP': 67836.43,
  'RJ': 36678.66,
  'MG': 29229.88,
  'ES': 27165.48,
  'Outros': 19849.53
};

const totalMensal = Object.values(faturamentoPorEstado).reduce((total, valor) => total + valor, 0);

for (const [estado, valor] of Object.entries(faturamentoPorEstado)) {
  const percentual = (valor / totalMensal) * 100;
  console.log(`${estado}: ${percentual.toFixed(2)}%`);
}

console.log(`\nTotal mensal: R$${totalMensal.toFixed(2)}`);