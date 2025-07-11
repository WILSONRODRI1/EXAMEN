# Gestión de Inventario - Proyecto CRUD

Este proyecto contiene:
- Backend en Flask conectado a MySQL
- Frontend en React
- CRUD funcional de productos

## Instrucciones de uso

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
```

### Crear base de datos MySQL
```sql
CREATE DATABASE inventario;
USE inventario;
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    stock INT DEFAULT 0,
    precio_unitario DECIMAL(10,2),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Iniciar servidor Flask
```bash
python app.py
```

### 2. Frontend
```bash
cd frontend
npx create-react-app .
(reemplazar src/App.js con el contenido entregado)
npm install axios
npm start
```
