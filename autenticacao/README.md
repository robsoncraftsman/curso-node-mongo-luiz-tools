# Pasta de dados do MongoDB

Criar na raíz do projeto a pasta "data" que será o local onde serão armazenados os dados do MongoDB.

# Configurar o MongoDB para usar autenticação

1. Abrir uma janela de terminal na raíz do projeto e digitar o seguinte comando para iniciar o MongoDB num diretório específico, numa porta fora da porta padrão (mais segurança) e exigindo autenticação nas conexões:

```
mongod --dbpath data -port 27050 --auth
```

2. Abrir uma nova janela de terminal e conectar na instância do MongoDB recém iniciada:

```
mongo -port 27050
```

3. Criar um usuário para administrar a instância do MongoDB:

```
use admin
db.createUser(
  { user: "admin",
  pwd: "12345678",
  roles:[{role: "userAdminAnyDatabase" , db:"admin"}]
})
```

4. Criar um usuário para conectar no database da aplicação:

```
use autenticacao
db.createUser(
  { user: "dbuser",
  pwd: "12345678",
  roles:[{role: "dbOwner" , db:"autenticacao"}]
})
```

5. Fechar as janelas de terminais

# Rodar o MongoDB com autenticação

Abrir uma janela de terminal na raíz do projeto e executar o seguinte comando:

```
mongod --dbpath data -port 27050 --auth
```

# Testar conexão com o MongoDB junto com a autenticação

```
mongo -port 27050 -u dbuser -p 12345678 -authenticationDatabase autenticacao
```

# String conexão driver MongoDB

> mongodb://dbuser:12345678@localhost:27050/?authSource=autenticacao
