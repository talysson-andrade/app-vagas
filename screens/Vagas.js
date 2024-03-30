import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


const Vagas = () => {
  const [data, setData] = useState([
    { id: '1', name: 'Vaga 1' },
    { id: '2', name: 'Vaga 2' },
    { id: '3', name: 'Vaga 3' },
    { id: '4', name: 'Vaga 4' },
    { id: '5', name: 'Vaga 5' },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Vagas</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    backgroundColor: 'lightblue',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Vagas;
