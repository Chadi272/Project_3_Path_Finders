from dataclasses import replace
from flask import Flask, render_template, redirect
import psycopg2


# Create an instance of Flask
app = Flask(__name__)

# Establish connection to Postgresql database

def get_db_connection():
    conn = psycopg2.connect(database="Uni_Ranking",
                            user="postgres",
                            password="258080",
                            host="localhost",
                            port= 5432
                            )
    return conn


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    conn = get_db_connection()
    cur = conn.cursor()

    str(cur.execute("SELECT DISTINCT institution,rank FROM uni_ranking WHERE year = 2022 ORDER BY rank FETCH FIRST 10 ROWS ONLY;"))

    unis = cur.fetchall()

    universities = []
    for uni in unis:
        universities.append(uni[0])
    
    print(unis)
    cur.close()
    conn.close()


    return render_template("index.html", top10 = universities)
    
@app.route("/DF")
def df():

    return render_template("DF.html")

@app.route("/tableau")
def tableau():

    return render_template("tableau.html")

if __name__ == "__main__":
    app.run(debug=True)

