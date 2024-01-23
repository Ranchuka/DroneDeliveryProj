# Drone Delivery backend API

Descrição breve do projeto: _Drone Delivery API_ é um serviço de backend desenvolvido em Node.js e Express, que fornece funcionalidades para o cálculo de rotas de entrega para drones, utilizando um tabuleiro de xadrez como base para as coordenadas.

## Recursos da API

### POST /calculate-route

Esta rota é responsável por calcular a rota mais rápida de um drone, dados os pontos de partida, coleta e entrega.

#### Input

- `startPosition` (String): Posição inicial no formato de coordenadas de xadrez (ex: "A1").
- `pickupPoint` (String): Ponto de coleta no formato de coordenadas de xadrez (ex: "C3").
- `deliveryPoint` (String): Ponto de entrega no formato de coordenadas de xadrez (ex: "F6").



#### Body da Requisição

```json
{
  "positions": ["A1", "C3", "F6"]
}
```



#### Resposta da requisição 
```json
{
  "route": ["A1", "A2", "B2", "C2", "C3", "D3", "E3", "F3", "F4", "F5", "F6"],
  "timer": 1320
}
```
#### Algoritimo de Dijkstra

O cálculo da rota mais rápida é feito utilizando o algoritmo de Dijkstra. Este algoritmo encontra o caminho mais curto entre dois pontos em um grafo, neste caso, o tabuleiro de xadrez, onde cada posição é um nó e cada movimento possível é uma aresta com um peso, que é o tempo necessário para mover-se de uma posição para outra.


#### Como Usar

git clone URL_DO_REPOSITORIO
cd drone-delivery-backend
npm install
npm start




