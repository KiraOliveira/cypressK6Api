import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'https://api.restful-api.dev/objects';  // URL da sua API simulada no Wiremock
  
  const payload = JSON.stringify({
    brand: 'Apple iPhone 11, 64GB',
    model: 'Purple',
    year: 2024,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  // Verifica se o status da resposta é 201 e se a mensagem de sucesso está correta
  check(response, {
    'status is 200': (r) => r.status === 201,
    "message is correct": (r) => r.json('message') === "Device successfully registered!",
    "id is 6": (r) => r.json('id') === 6,
  });

  // Aguarda 1 segundo entre as requisições para simular um intervalo
  sleep(1);
}