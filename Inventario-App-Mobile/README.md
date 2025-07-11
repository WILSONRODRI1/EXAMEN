# App Móvil - Inventario de Productos

Esta es una app móvil creada con **React Native + Expo** para gestionar productos de un inventario, consumiendo una API hecha con Flask.

## ¿Qué puedes hacer?
- Agregar productos
- Editarlos
- Eliminarlos
- Ver lista de productos

## Requisitos
- Node.js
- Expo CLI (`npm install -g expo-cli`)
- API Flask corriendo en red local o internet

## Instalación
```bash
cd inventario-app
npm install
expo start
```

Escanea el código QR con la app **Expo Go** desde tu celular.

## Notas importantes
- Reemplaza `TU_IP_PUBLICA` en `App.js` con la IP de tu backend Flask, por ejemplo `192.168.0.10:5000`.
- Tu celular y computadora deben estar en la misma red WiFi.
