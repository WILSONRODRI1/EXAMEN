from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route('/productos', methods=['GET'])
def get_productos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM productos')
    productos = cursor.fetchall()
    conn.close()
    return jsonify(productos)

@app.route('/productos', methods=['POST'])
def add_producto():
    data = request.get_json()
    nombre = data['nombre']
    categoria = data['categoria']
    stock = data['stock']
    precio_unitario = data['precio_unitario']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO productos (nombre, categoria, stock, precio_unitario) VALUES (%s, %s, %s, %s)',
                   (nombre, categoria, stock, precio_unitario))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Producto agregado'}), 201

@app.route('/productos/<int:id>', methods=['PUT'])
def update_producto(id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE productos SET nombre=%s, categoria=%s, stock=%s, precio_unitario=%s WHERE id=%s',
                   (data['nombre'], data['categoria'], data['stock'], data['precio_unitario'], id))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Producto actualizado'})

@app.route('/productos/<int:id>', methods=['DELETE'])
def delete_producto(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM productos WHERE id=%s', (id,))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Producto eliminado'})

if __name__ == '__main__':
    app.run(debug=True)
