// DescricaoVagaScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalhesVagasScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Vaga</Text>
      <View style={styles.details}>
        <Text style={styles.label}>Cargo:</Text>
        <Text style={styles.value}>Desenvolvedor Frontend</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>Desenvolver interfaces de usuário usando React Native</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Localização:</Text>
        <Text style={styles.value}>Remoto</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Empresa:</Text>
        <Text style={styles.value}>TechCo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
});

export default DetalhesVagasScreen;
