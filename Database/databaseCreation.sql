/* 
    This script is used to create the database and grant all privileges to the user postgres, which we will use to connect to the database.
    The database is called eventmanager
*/
DROP DATABASE eventmanager;
CREATE DATABASE eventmanager;
GRANT ALL PRIVILEGES ON DATABASE eventmanager TO postgres;