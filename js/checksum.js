document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const outputData = document.querySelector('#outputData');
  const outputChecksum = document.querySelector('#outputChecksum');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputData = document.querySelector('#inputData').value;

    if (inputData.trim() === '') {
      alert('Você precisa um binário antes de calcular o checksum!');
      return;
    } else if (inputData.length < 32) {
      alert('O dado precisa ter pelo menos 4 bytes (32 bits)!');
      return;
    } else if (!/^[01]+$/.test(inputData)) {
      alert('O dado deve ser composto apenas por caracteres "0" ou "1"!');
      return;
    } else {
      const checksum = checksumCalc(inputData);

      outputData.textContent = `Dado inserido: ${inputData}`;
      outputChecksum.textContent = `Checksum: ${checksum}`;
    }
  });
});

function checksumCalc(data) {
  let sum = 0; // Acumulador

  // Percorre o dado em grupos de 1 byte
  for (let i = 0; i < data.length; i += 8) {
    const byte = data.substr(i, 8); // O byte será uma substring de 8 caracteres (8 bits)
    sum += parseInt(byte, 2); // O byte é convertido pra um valor inteiro com base 2
  }

  const checksum = (256 - (sum % 256)) % 256;
  return checksum.toString(2).padStart(8, '0');
  // O valor do checksum é convertido pra uma representação binária de 8 bits. Se necessário, adiciona zeros na esquerda até atingir 8 bits
}
