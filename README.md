# DesafioCompassAPI
API de produtos

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20.5.1)
- [Git](https://git-scm.com/)

## Instalação

1. Clone o repositório para a sua máquina local usando o Git:

   ```bash
   git clone https://github.com/lipilemos/DesafioCompassAPI.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd seu-projeto-api
   ```
3. Instale as dependências do projeto usando o npm (ou yarn, se preferir):
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente necessárias, como chaves de API ou informações de banco de dados, criando um arquivo `.env` no diretório raiz do projeto, se preferir pode renomear o arquivo de exemplo.
   ```bash
   PORT=5002
   MONGO_PASS=passuol  
   MONGO_USER=useruol
   JWT_SECRET=a8yw7447sx9x
   ```
## Uso

Iniciar o Servidor

Para iniciar o servidor da API, execute o seguinte comando:
   ```bash
   node index.js
   ```
Para iniciar o servidor da API como desenvolvimento utilizando nodemon, execute o seguinte comando:
   ```bash
   npm run server
   ```

A API estará disponível em http://localhost:{PORT} OU [http://localhost:5001](http://localhost:5001)

## Utils

O projeto possui uma pasta chamada utils que contem a collection de todos os endpoints para ser usada no Postman

## Rotas da API

### Products
Endpoints relacionados a produtos

- `GET /product`: Retorna uma lista de produtos
- `POST /product`: Cria um novo produto
- `GET /product/{id}`: Retorna um produto pelo ID
- `PUT /product/{id}`: Atualiza um produto existente
- `DELETE /product/{id}`: Deleta um produto existente

### Auth
Endpoints relacionados a usuários e autenticação

- `POST /user/register`: Registrar um novo usuário
- `POST /user/login`: Login de um usuário
- `GET /user/profile`: Obter informações do usuário atualmente autenticado

### Utils
Retorna a saúde da API

- `GET /health`: Retorna a saúde da API

### Joker
Retorna uma piada aleatória

- `GET /joke`: Retorna uma piada aleatória

Para obter detalhes sobre os parâmetros de cada rota e os dados de solicitação e resposta, consulte a documentação da API.

## Contribuindo

Se desejar contribuir com este projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/minha-feature`).
3. Faça commit das suas mudanças (`git commit -m 'Adicione uma nova feature'`).
4. Faça push para a branch (`git push origin feature/minha-feature`).
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

## Contato

Se você tiver alguma pergunta ou sugestão, sinta-se à vontade para entrar em contato:

- Felipe Lemos - [lipe.dev@outlook.com.br](mailto:lipe.dev@outlook.com.br)
- Link para o projeto: [https://github.com/lipilemos/DesafioCompassAPI](https://github.com/lipilemos/DesafioCompassAPI)
