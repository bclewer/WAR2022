import mysql.connector
import pandas as pd


user = "root"
password = ""
host = "localhost"
database = "war2022"

cnx = mysql.connector.connect(
        user=user, password=password, host=host, database=database,port=3307,
         auth_plugin='mysql_native_password'
)

cursor=cnx.cursor(buffered=True)

cnx.commit()
cnx.close
