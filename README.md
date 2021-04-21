<p align="center">🎉
  <a href="#-sobre"> Sobre </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-documentacao"> Documentação </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-material-de-apoio"> Material de apoio </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#️-funcionalidades"> Funcionalidades </a>
</p>

## 🔖 Sobre

Este projeto tem como objetivo colocar em prática tudo que estou aprendendo na `Rocketseat` com NodeJs, e todas as suas dependências, para criar um sistema de controle de projetos. Este sistema irá me ajudar a no meu dia-a-dia na empresa onde trabalho.

## ✍🏻 Documentação

#### Permissions

**User <-- users_roles --> Role --> permissions_roles --> Permissions**

User: tabela de usuários
users_roles: tabela pivo many-to-many entre User e Role.
Role: tabela de papeis ex: ADM, USER, GUEST; vai contar um combo de permissões dentro dela;
permissions_roles: tabela pivo many-to-many entre Role e Permission
Permissions: tabela de permissões exs: pode editar, pode visualizar, pode criar, pode apagar;

Cria primeiro as permissões e depois atribiu a Role, que é um conjunto de permissões.
Depoiso usuário terá a Role.

#### Cadastro de Projetos
RF
1. O usuário deve poder cadastrar um projeto;
2. O usuário deve listar uma lista de solicitantes de projetos;

RN
1. Cada projeto deve ter um nome e uma breve descrição;
2. O usuário não pode cadastrar um projeto em nome de outro usuário;
3. O status inicial de um projeto deve ser NECESSIADADE ENVIADA PARA ANÁLISE;

#### Comentários do Projeto

RF
1. O usuário deve poder listar os comentários do projeto;

RN
1. O usuário não pode criar ou alterar comentário de um projeo que ele não tem permissão;

RN

#### Atualização de Projetos


## 🗂 Material de apoio

- [TypeORM](typeorm.io/)
- [JWT](https://jwt.io)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [JsonWebToken](www.npmjs.com/package/jsonwebtoken)

## ☑️ Funcionalidades

<p><b> Users </b></p>
<p>
- [x] Create <br/>
- [x] Show<br/>
- [x] Index<br/>
- [x] Update<br/>
- [ ] Delete<br/>
</p>

<p><b> Projects </b></p>
<p>
- [x] Create <br/>
- [x] Show<br/>
- [x] Index<br/>
- [x] Update<br/>
- [x] Delete<br/>
</p>

<p><b> Roles </b></p>
<p>
[ ] Create <br/>
[ ] Show<br/>
[ ] Index<br/>
[ ] Update<br/>
[ ] Delete<br/>
</p>

<p><b> Permissions </b></p>
<p>
[ ] Create <br/>
[ ] Show<br/>
[ ] Index<br/>
[ ] Update<br/>
[ ] Delete<br/>
</p>

<p><b> Authentication </b></p>

<p><b> Relations </b></p>

[ ] User <=> Roles<br/>
[ ] Permission <=> Roles<br/>

<p><b> Reports </b></p>

[ ] Project Status
---
</p>

<h3 align="center">Em desenvolvimento por Renaldy Sousa </h3>
