import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../components/header'
import {Vaga} from '../entities/Vaga'


const ListaVagas = () => {
  const [data, setData] = useState([
    { id: '2', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '3', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '4', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '5', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '6', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '7', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '8', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '9', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '10', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '11', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '12', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '13', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '14', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
    { id: '15', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' },
  ]);

  
  const [vagas, setVagas] = useState([]);

  

  const loadVagas = () => {
 
    
  };
  loadVagas();
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style ={styles.nameText}>{item.name}</Text>
      <Text style = {styles.empresaText}>{item.empresa}</Text>
      <Text>{item.modalidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <Header/>
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
  },
  item: {
    padding: 7,
  },
  nameText:{
    fontFamily: 'monospace',
    fontSize: 15,
  },
  empresaText: {
    fontSize: 13,
  }
});

export default ListaVagas;
