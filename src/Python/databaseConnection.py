# class to connect to the database and execute queries useful for API calls

class DatabaseConnection:
    def __init__(self):
        self.connection = None
        self.cursor = None

    
    # Connect to the database
    def connect(self):
        try:
            self.connection = psycopg2.connect(
                dbname="eventmanager",
                user="postgres",
                host="localhost",
                password="password"
            )
            self.cursor = self.connection.cursor()
        except Exception as e:
            print("Error connecting to the database: ", e)

    # Close the connection
    def close(self):
        self.cursor.close()
        self.connection.close()

    # Execute a query
    def execute(self, query):
        try:
            self.cursor.execute(query)
            self.connection.commit()
        except Exception as e:
            print("Error executing query: ", e)

    # Fetch the results of a query
    def fetch(self):
        return self.cursor.fetchall()
