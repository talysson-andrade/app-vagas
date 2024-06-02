import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import firebase from './configFirebase';

const db = firebase.database();
const auth = firebase.auth();

const DetalheVagaScreen = ({ route, navigation }) => {
  const { key, numInscricoes } = route.params;
  const [vaga, setVaga] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Carregar os dados da vaga quando a tela ganha foco
      db.ref(`vagas/${key}`).once('value')
        .then(snapshot => {
          setVaga(snapshot.val());
        })
        .catch(error => {
          console.error('Erro ao buscar detalhes da vaga:', error);
        });
    });

    return unsubscribe;
  }, [navigation, key]);

  const handleInscrever = () => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }

    const userId = user.uid;
    const inscricoes = vaga.inscricoes || [];

    // Verificar se o usuário já está inscrito
    if (inscricoes.includes(userId)) {
      Alert.alert('Você já está inscrito nesta vaga.');
      return;
    }

    // Adicionar o usuário à lista de inscrições da vaga
    const updatedInscricoes = [...inscricoes, userId];

    // Atualizar o banco de dados Firebase
    db.ref(`vagas/${key}/inscricoes`).set(updatedInscricoes)
      .then(() => {
        Alert.alert('Inscrição realizada com sucesso!');
        navigation.goBack(); // Voltar para a tela anterior
      })
      .catch(error => {
        console.error('Erro ao se inscrever na vaga:', error);
        Alert.alert('Ocorreu um erro ao se inscrever na vaga.');
      });
  };

  if (!vaga) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>{vaga.cargo}</Text>
      <Text style={styles.nomeEmpresa}>{vaga.empresa}</Text>
      <Text style={styles.value}>{vaga.tipo}</Text>
      <Text style={styles.value}>{numInscricoes} inscritos</Text>
      <Text style={styles.label}>Sobre a vaga:</Text>
      <Text style={styles.value}>{vaga.descricao}</Text>
    </ScrollView>
      <TouchableOpacity
        style={styles.inscreverButton}
        onPress={handleInscrever}
      >
        <Text style={styles.inscreverButtonText}>Inscrever-se</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    paddingTop: 70,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  nomeEmpresa:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inscreverButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#000080',
    borderRadius: 5,
    alignItems: 'center',
  },
  inscreverButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetalheVagaScreen;
