document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const outputData = document.querySelector('#outputData');
  const outputCRC = document.querySelector('#outputCRC');
  const warning = document.querySelector('#warning');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputData = document.querySelector('#inputData').value;

    if (inputData.trim() === '') {
      alert('Você precisa digitar o dado para calcular o CRC!');
      return;
    } else if (inputData.length < 4) {
      alert('O dado precisa ter mais que 4 bits!');
      return;
    } else if (!/^[01]+$/.test(inputData)) {
      alert('O dado deve ser composto apenas por caracteres "0" ou "1"!');
      return;
    } else {
      const crc = calculateCRC32(inputData);

      outputData.textContent = `Dado inserido: ${inputData}`;
      outputCRC.textContent = `CRC: ${crc}`;
      warning.textContent = '';
    }
  });
});

function calculateCRC32(data) {
  // Polinômio CRC-32 em formato binário
  const polynomial = '100000100110000010001110110110111';

  // Converte o polinômio de binário para decimal de base 2
  const numPoly = parseInt(polynomial, 2);

  // Converte o dado inserido em binário para decimal
  let regist = parseInt(data, 2);

  // Armazena o comprimento do polinômio
  const polyLength = polynomial.length;

  // Loop por cada bit do dado inserido
  for (let i = 0; i < data.length; i++) {
    // Calcula o MSB da variável regist
    // Para isso, os bits são deslocados pra direita e pegando o último bit
    const mostSignificantBit = (regist >> (polyLength - 1)) & 1;

    // Desloca o valor de regist para a esquerda e adiciona o próximo bit (data[i]) do dado usando o parseInt
    regist = (regist << 1) | parseInt(data[i], 2);

    // Verifica se o bit mais significativo é 1, se for, realiza um XOR
    if (mostSignificantBit === 1) {
      regist ^= numPoly;
    }
  }
  return regist.toString(2);
}
