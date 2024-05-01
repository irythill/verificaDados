document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const showResult = document.querySelector('#result');
  const showParityType = document.querySelector('#parityType');

  form.addEventListener('submit', function (event) {
    // Previne que a página recarregue após envio do formulário
    event.preventDefault();

    // Pega o nº binário informado pelo usuário
    const inputBinary = document.querySelector('#inputBinary').value;

    // Verificações pra validar o dado
    if (inputBinary.trim() === '') {
      alert('Você precisa digitar um número antes de checar a paridade!');
      return;
    } else if (inputBinary.length > 100) {
      alert(
        `Você digitou um número binário com ${inputBinary.length} bits. Precisa ser até 100 bits!`,
      );
      return;
    }

    // Recebe a função checkParity passando como arg o nº binário informado pelo usuário
    const parityResult = checkParity(inputBinary);

    // Armazena o último bit do binário informado pelo usuário
    const parityBit = inputBinary[inputBinary.length - 1];

    // Ternário pra informar o tipo de paridade
    const parityType = parityBit === '0' ? 'Par' : 'Ímpar';

    if (parityResult) {
      showResult.textContent = `O número ${inputBinary} possui paridade correta`;
      showParityType.textContent = `Tipo de paridade: ${parityType}`;
    } else {
      showResult.textContent = `O número ${inputBinary} possui paridade incorreta`;
      showParityType.textContent = '';
    }
  });
});

function checkParity(binaryNum) {
  const parityBit = binaryNum[binaryNum.length - 1]; // Armazena o último bit do número binário
  const dataBits = binaryNum.slice(0, -1); // Armazena o restante dos bits (excluindo o último)

  const ctOne = dataBits
    .split('') // Divide os bits em um array de caracteres ["0", "1" etc...]
    .reduce((counter, bit) => counter + parseInt(bit), 0); // Conta quantos números 1s existem no número informado

  if (parityBit === '0' && ctOne % 2 === 0) {
    return true; // Se o bit de paridade é 0 e a quantidade de 1s é par = true
  } else if (parityBit === '1' && ctOne % 2 === 1) {
    return true; // Se o bit de paridade for 1 e a quantidade de 1s for ímpar = true
  } else {
    return false; // Paridade incorreta
  }
}
