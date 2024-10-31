from flask import Flask, jsonify, request, render_template
from db import get_db_connection
from auth import authorize_user, register_user
import hashlib

app = Flask(__name__, template_folder="../templates", static_folder="../static")

@app.route('/main_page')
def main_page():
    return render_template('index.html')

@app.route('/authorization_page')
def authorization_page():
    return render_template('authorization.html')

@app.route('/register_page')
def register_page():
    return render_template('registration.html')

@app.route('/authorize', methods=['POST'])
def authorize():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    #HASH PASSWORD
    table_name = email.split('@')[0]
    h = hashlib.new("SHA256")
    user_pass_salt = password + table_name + password + (table_name + 'salthash')  # salt for hash
    h.update(user_pass_salt.encode())  
    password = h.hexdigest()   # hash pass

    result = authorize_user(email, password)
    return jsonify(result)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    #HASH PASSWORD
    table_name = email.split('@')[0]
    h = hashlib.new("SHA256")
    user_pass_salt = password + table_name + password + (table_name + 'salthash')  # salt for hash
    h.update(user_pass_salt.encode())  
    password = h.hexdigest()   # hash pass

    result = register_user(email, password)
    return jsonify(result)

@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users ORDER BY id;')
    users = cur.fetchall()
    cur.close()
    conn.close()
    
    users_list = [{'id': item[0], 'email': item[1], 'password': item[2], 'table_name': item[3]} for item in users]
    
    return jsonify(users_list)

@app.route('/items', methods=['GET'])
def get_items():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM sklad ORDER BY id, category, product_type, product_name;')
    items = cur.fetchall()
    cur.close()
    conn.close()
    
    item_list = [{'id': item[0], 'product_name': item[1], 'category': item[2], 'product_type': item[3],
                  'unit': item[4], 'quantity': item[5], 'sold_quantity': item[6], 
                  'status': item[7], 'last_updated': item[8]} for item in items]
    
    return jsonify(item_list)
