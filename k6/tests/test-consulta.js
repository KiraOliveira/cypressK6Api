import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = '/api.restful-api.dev/objects';  // URL da sua API simulada no Wiremock

  const response = http.get(url);

  // Verifica se o status da resposta é 200
  check(response, {
    'status is 200': (r) => r.status === 200,
    'contains 5 devices': (r) => r.json().length === 5,
    /*'device 1 is Google Pixel 6 Pro': (r) => r.json()[0].color === 'Cloudy White' && r.json()[0].name === 'Google Pixel 6 Pro',
    'device 5 is Samsung Galaxy Z Fold2': (r) => r.json()[4].color === 'Brown' && r.json()[4].name === 'Samsung Galaxy Z Fold2',*/
  });

  // Aguarda 1 segundo entre as requisições
  sleep(1);
}