import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://TU_IP_PUBLICA:5000/productos'; // Cambia por tu IP o dominio real

export default function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', categoria: '', stock: '', precio_unitario: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editingId === null) {
        await axios.post(API_URL, form);
      } else {
        await axios.put(\`\${API_URL}/\${editingId}\`, form);
      }
      setForm({ nombre: '', categoria: '', stock: '', precio_unitario: '' });
      setEditingId(null);
      fetchProductos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    Alert.alert('Eliminar', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        onPress: async () => {
          await axios.delete(\`\${API_URL}/\${id}\`);
          fetchProductos();
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nombre} - {item.categoria} - Stock: {item.stock} - ${item.precio_unitario}</Text>
      <View style={styles.buttons}>
        <Button title="Editar" onPress={() => handleEdit(item)} />
        <Button title="Eliminar" onPress={() => handleDelete(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Productos</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={form.nombre} onChangeText={text => setForm({ ...form, nombre: text })} />
      <TextInput style={styles.input} placeholder="Categoría" value={form.categoria} onChangeText={text => setForm({ ...form, categoria: text })} />
      <TextInput style={styles.input} placeholder="Stock" keyboardType="numeric" value={String(form.stock)} onChangeText={text => setForm({ ...form, stock: text })} />
      <TextInput style={styles.input} placeholder="Precio" keyboardType="numeric" value={String(form.precio_unitario)} onChangeText={text => setForm({ ...form, precio_unitario: text })} />
      <Button title={editingId === null ? 'Agregar' : 'Actualizar'} onPress={handleSubmit} />
      <FlatList data={productos} keyExtractor={item => item.id.toString()} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  item: { backgroundColor: '#f0f0f0', padding: 10, marginVertical: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }
});
