import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const VagasScreen = ({ navigation }) => {
  // Função para lidar com o clique em uma vaga
  const handleVagaPress = () => {
    console.log('Clicou na vaga');
    navigation.navigate('Detalhe vaga');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vagas Disponíveis</Text>
      <TouchableOpacity onPress={handleVagaPress}>
        <View style={styles.vaga}>
          <Text style={styles.vagaTitle}>Desenvolvedor Frontend</Text>
          <Text>Descrição: Desenvolver interfaces de usuário usando React Native</Text>
          <Text>Localização: Remoto</Text>
          <Text>Empresa: TechCo</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleVagaPress}>
        <View style={styles.vaga}>
          <Text style={styles.vagaTitle}>Desenvolvedor Backend</Text>
          <Text>Descrição: Desenvolver APIs usando Node.js e Express</Text>
          <Text>Localização: São Paulo, SP</Text>
          <Text>Empresa: DevTech</Text>
        </View>
      </TouchableOpacity>
      {/* Adicione mais vagas conforme necessário */}
      
      {/* Ícone no canto superior direito */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Icon name="person" size={25} />
      </TouchableOpacity>
    </ScrollView>
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
  vaga: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  vagaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default VagasScreen;
