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

data = pd.read_csv("PlayersList2022.csv",sep=',',keep_default_na=False)

data['Good_Type'] = 'Single'
data['Evil_Type'] = 'Single'
data.loc[data['Good_Faction'].str.contains(' LL'), 'Good_Type'] = 'LL'
data.loc[data['Evil_Faction'].str.contains(' LL'), 'Evil_Type'] = 'LL'
data.loc[data['Good_Faction'].str.contains('\+'), 'Good_Type'] = 'Alliance'
data.loc[data['Evil_Faction'].str.contains('\+'), 'Evil_Type'] = 'Alliance'

print(data)

for x in range(len(data)):

    name = data["FORENAME"][x] + " " + data["SURNAME"][x]
    print(name)
    goodfact = data["Good_Faction"][x]
    evilfact = data["Evil_Faction"][x]
    goodtype = data["Good_Type"][x]
    eviltype = data["Evil_Type"][x]

    cursor.execute("INSERT INTO players_info (Name,Good_Army,Good_Type,Evil_Army,Evil_Type,Sporting_Votes,Painted_Votes) Values (%s, %s, %s, %s, %s, 0, 0)",(name,goodfact,goodtype,evilfact,eviltype))
    cursor.execute("INSERT INTO scoring (PlayerName) Values (%s)",(name,))
    cursor.execute("INSERT INTO opponents (PlayerName) Values (%s)",(name,))

cnx.commit()
cnx.close

