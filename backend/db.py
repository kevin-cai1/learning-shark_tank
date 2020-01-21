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
    conn = sqlite3.connect('new.db')

    f = open('./db.sql', 'r')
    str = f.read()
    
    cur = conn.cursor()
    cur.execute(str)


if __name__ == "__main__":
    init_db()
    #get_conn()