import pymysql


conn = pymysql.connect(host='localhost',
       user = 'root',
       password = 'eeNsAEn9s1B4!',
       db = 'test',
       charset = 'utf8mb4')


def mysql_insert(datas):
    try:
        with conn.cursor() as cursor:
            sql = "INSERT INTO users (email, password) VALUES (%s, %s)"
            
            print(sql)
            cursor.execute(sql,datas)
        
        conn.commit()
        print(cursor.lastrowid)
    finally:
        conn.close()  
