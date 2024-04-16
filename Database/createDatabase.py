# This script creates the database and tables for the event manager. Just run it in the same directory as the .sql files.

import subprocess
import time


subprocess.run(["psql", "-h", "localhost", "-U", "postgres", "-f", "databaseCreation.sql"])
time.sleep(1)
subprocess.run(["psql", "-h", "localhost", "-U", "postgres", "-d", "eventmanager", "-f", "Users.sql"])
time.sleep(1)
subprocess.run(["psql", "-h", "localhost", "-U", "postgres", "-d", "eventmanager", "-f", "Events.sql"])
time.sleep(1)
subprocess.run(["psql", "-h", "localhost", "-U", "postgres", "-d", "eventmanager", "-f", "Reservations.sql"])
time.sleep(1)
subprocess.run(["psql", "-h", "localhost", "-U", "postgres", "-d", "eventmanager", "-f", "Setup.sql"])
