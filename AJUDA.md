# Repositories
Os Repositórios possuem acesso direto a camada de dados podendo persistir dados e realizar as consultas. Lembrando que devemos sempre utilizar um repositório por agregação. Um repositório também pode consultar diretamente serviços externos.

# Domain Services
Os Serviços de Domínio implementam a lógica de negócios a partir da definição de um expert de domínio. Trabalham com diversos fluxos de diversas entidades e agregações, utilizam os repositórios como interface de acesso aos dados e consomem recursos da camada de infraestrutura, como: enviar email, disparar eventos, entre outros.


# Middleware
É um inteceptador de requisiçõs que pode interromper totalmente a requisição ou pode alterar dados da requisição
o formato dele é uma função que recebe Request, devolve um Response e dependendo do que for processado ela pode seguir o fluxo enviando o Next ou dando erro.

# Ordem de criação das features
1. Criar o arquivo de Service recebendo os campos que serão tratados por ele;
2. Importar o Repository dentro do Service;
3. Importar a entidade do modulos em questão;
4. Criar o arquivo de Service.spec;
5. Importar o FakeRepository e o Service;
6. Dentro do arquivo .spec, criar 01 cenário de teste para validar a função CORE do Service.
7. Iniciar a realização do código dentro service para satisfzer os testes.
8. Após feita a funcionalidade, executar os testes novamente e verificar que esta OK;


# Relacionamento
Server -->
Router (principal) --> Chamada para os routes (modulos);
Routes (modulos) --> Chamada para os Controllers;
Controller --> Chamada para os Services;
Services --> Chamada para os Repositories; Responsável pela regra de negócio;
IRepository --> Chamda pelos Services;
Repository --> Implemenmtada pelo IRepository; Deve ser registrado dentro do index do Container; Camada que faz interface com o ORM;
DTOs -->
