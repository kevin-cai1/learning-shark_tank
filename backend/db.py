import sqlite3

def get_conn():
    conn = None
    try:
        conn = sqlite3.connect('learning.db')
    except Error as e:
        print(e)
    
    return conn

def test_db_call():
    conn = sqlite3.connect('learning.db')
    c = conn.cursor()

    # Insert a row of data
    c.execute("INSERT INTO User VALUES ('email1','name','sdf','100','coach')")

    # Save (commit) the changes
    conn.commit()

    c.execute("SELECT * FROM User")
    print(c.fetchall())

    conn.close()

def init_db():
    db = sqlite3.connect('learning.db')
    load_schema(db)
    insert_data(db)

    db.commit()
    db.close()

def load_schema(db):
    with open('db.sql', 'r') as sql_file:
        sql_script = sql_file.read()
    cursor = db.cursor()
    cursor.executescript(sql_script)

def insert_data(db):
    with open('db_insert.sql', 'r') as sql_file:
        sql_script = sql_file.read()
    cursor = db.cursor()
    cursor.executescript(sql_script)


if __name__ == "__main__":
    init_db()
    #get_conn()