## Server:

* #### Configure database, port and access token properties inside ./server/.env file:
    
    ```
    PORT=3000
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASS=1111
    POSTGRES_NAME=budget
    SECRET_KEY=secret
    TOKEN_EXPIRE_TIME=12h
    ```

* #### Install packages:

   ```
   npm i
   ```

* #### Migrate tables to database and insert data into tables:

    ```
    npm run migrate
    npm run seed
    ```

* #### Start server:

    ```
    npm run start:dev
    ```

## Client:

* #### Install packages:
        
    ```
    npm i
    ```

* #### Configure apiUrl inside ./client/src/eviroment/eviroment.ts file

    ```
    export const environment = {
        production: false,
        apiUrl: 'http://localhost:3000/',
    };
    ```

* #### Start client:

    ```
    ng serve 
    ```