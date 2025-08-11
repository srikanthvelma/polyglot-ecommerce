from flask import Flask, jsonify, request
import psycopg2
import os

app = Flask(__name__)

DB_HOST = os.getenv("DB_HOST", "postgres-inventory")
DB_NAME = os.getenv("DB_NAME", "inventorydb")
DB_USER = os.getenv("DB_USER", "inventoryuser")
DB_PASS = os.getenv("DB_PASS", "inventorypass")

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )
    return conn

@app.route('/inventory', methods=['GET'])
def get_inventory():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT product_id, quantity FROM inventory')
    rows = cur.fetchall()
    cur.close()
    conn.close()

    inventory_list = [{"product_id": r[0], "quantity": r[1]} for r in rows]
    return jsonify(inventory_list)

@app.route('/inventory', methods=['POST'])
def update_inventory():
    data = request.json
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if not product_id or quantity is None:
        return jsonify({"error": "Invalid payload"}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO inventory (product_id, quantity)
        VALUES (%s, %s)
        ON CONFLICT (product_id) DO UPDATE SET quantity = EXCLUDED.quantity
    """, (product_id, quantity))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Inventory updated"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8005)
