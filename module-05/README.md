# Databases - Our multiple database design 

### Trabalhando com o Docker - PostgreSQL
- PostgreSQL

<code>docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DATABASE=database -p 5432:5432 -d postgres</code>

<code>docker ps</code>

<code>docker exec -it postgres /bin/bash</code>

- Adminer

<code>docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer</code>

<br>

### Trabalhando com o Docker - MongoDB
- MongoDB

<code>docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=username -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 -d mongo:4</code>

- Mongo Client

<code>docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient</code>

<code>docker exec -it mongodb mongo --host localhost -u lemuel -p lemuel --authenticationDatabase admin --eval "db.getSiblingDB('heroes').createUser({user: 'dev_user@1', pwd: 'user1', roles: [{role: 'readWrite', db: 'heroes'}]})"</code>
