import sqlite3

def get_conn():
    conn = sqlite3.connect('learning.db')

    c = conn.cursor()


    # Insert a row of data
    c.execute("INSERT INTO User VALUES ('email1','name','sdf','100','coach')")

    # Save (commit) the changes
    conn.commit()

    c.execute("SELECT * FROM User")
    print(c.fetchall())

    conn.close()


if __name__ == "__main__":
    get_conn()