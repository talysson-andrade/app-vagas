import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './ConfigFirebase';

const UserProfileScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [userKey, setUserKey] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userKey = user.uid; // Obtém a chave única do usuário
        setUserKey(userKey);
        console.log('Usuário:', user); // Mostra o objeto de usuário no console

        // Acessa os dados do usuário usando a chave única
        firebase.database().ref(`users/${userKey}`).once('value')
          .then(snapshot => {
            const data = snapshot.val();
            setUserData(data);
          })
          .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error);
          });
      } else {
        setUserKey(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meu Perfil</Text>
      {userData && (
        <View>
          <Text style={styles.label}></Text>
          <Text style={styles.info}>{userData.name}</Text>

          <Text style={styles.label}></Text>
          <Text style={styles.info}>{userData.email}</Text>

          <Text style={styles.label}></Text>
          <Text style={styles.info}>{userData.cpf}</Text>

          

          {/* Adicione mais campos conforme necessário */}
        </View>
      )}
      {/* Botões para navegação, logout, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    marginBottom: 5,
  },
});

export default UserProfileScreen;
