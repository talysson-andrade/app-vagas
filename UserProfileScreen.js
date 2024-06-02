import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import firebase from './configFirebase';
import * as DocumentPicker from 'expo-document-picker';
import Icone from 'react-native-vector-icons/Entypo';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [inscricoes, setInscricoes] = useState([]);
  const [resumeUploaded, setResumeUploaded] = useState(false); // Novo estado para indicar se o currículo foi enviado com sucesso

  const loadUserData = useCallback((userKey) => {
    firebase.database().ref(`users/${userKey}`).once('value')
      .then(snapshot => {
        const data = snapshot.val();
        setUserData(data);
        loadVagasInscritas(userKey);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do usuário:', error);
      });
  }, [resumeUploaded]);

  const loadVagasInscritas = useCallback((userKey) => {
    firebase.database().ref('vagas/').once('value')
      .then(snapshot => {
        const vagasData = snapshot.val();
        const inscricoesData = [];

        for (const key in vagasData) {
          if (vagasData[key].inscricoes && vagasData[key].inscricoes.includes(userKey)) {
            inscricoesData.push({ key, ...vagasData[key] });
          }
        }
        setInscricoes(inscricoesData);
      })
      .catch(error => {
        console.error('Erro ao buscar vagas inscritas:', error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userKey = user.uid;
          setUserKey(userKey);
          loadUserData(userKey);
        } else {
          setUserKey(null);
          setUserData(null);
          setInscricoes([]);
        }
      });

      return () => unsubscribe();
    }, [loadUserData])
  );

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login');
    });
  };
  
  const createCacheFile = async ({ name, uri }: CacheOptions) => {
    if (!(await getInfoAsync(cacheDirectory + "uploads/")).exists) {
        await makeDirectoryAsync(cacheDirectory + "uploads/");
    }
    const cacheFilePath = cacheDirectory + "uploads/" + name;
    await copyAsync({ from: uri, to: cacheFilePath });
    return cacheFilePath;
}


  const handleUploadResume = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });
    console.log(res);
    if (res.canceled) {
      console.log("arquivo selecionado é muito grande");
      Alert.alert('Cancelado', 'Envio de currículo cancelado.');
      return;
    }

    let fileUri, fileSize, fileName;

    res.assets.forEach(asset => {
      fileUri = asset.uri;
      fileName = asset.name;
      fileSize = asset.size; 
    });

    if (fileSize > MAX_FILE_SIZE) {
      Alert.alert('Cancelado', 'O Arquivo deve ter no máximo 5MB de tamanho');
      return;
    }

    console.log("iniciando upload de currículo");
    const response = await fetch(fileUri);
    const arrayBuffer = await response.arrayBuffer();

    const storageRef = firebase.storage().ref();
    const resumeRef = storageRef.child(`curriculos/${userKey}.pdf`);

    await resumeRef.put(arrayBuffer);

    const downloadURL = await resumeRef.getDownloadURL();
    await firebase.database().ref(`users/${userKey}`).update({ urlCurriculo: downloadURL, nomeCurriculo: fileName });
    Alert.alert('Sucesso','Currículo enviado com sucesso!');
    setResumeUploaded(true);
  };

  const renderVaga = ({ item }) => (
    <View style={styles.vaga}>
      <Text style={styles.vagaTitle}>{item.cargo} - {item.empresa}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Vagas')}>
        <Icone name='chevron-thin-left' size={30}/>
      </TouchableOpacity>
      <View style={styles.iconeUser}>
        <Icone name='user' size={70}/>
      </View>

      {userData && (
        <View>
          <View style={styles.userInfo}> 
            <Text style={styles.textNome}>{userData.name}</Text>
            <Text style={styles.textNome}>{userData.email}</Text>
          </View>

          <Text style={styles.label}>Currículo:</Text>
          {userData.urlCurriculo ? (
            <Text style={styles.info}>{userData.nomeCurriculo}</Text>
          ) : (
            <Text style={styles.info}>Nenhum currículo adicionado</Text>
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadResume}>
            <Text style={styles.uploadButtonText}>Upload de Currículo</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Vagas Inscritas:</Text>
          <ScrollView style={styles.listaVagas}>
            {inscricoes.length > 0 ? (
              <FlatList
                data={inscricoes}
                renderItem={renderVaga}
                keyExtractor={item => item.key}
              />
            ) : (
              <Text style={styles.info}>Nenhuma inscrição encontrada</Text>
            )}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    marginBottom: 10,
  },
  vaga: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  vagaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadButton: {
    padding: 10,
    backgroundColor: '#000080',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButton: {
    width: '10%',
  },
  iconeUser: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  textNome: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
  },
  userInfo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
  },
  logoutButtonText: {
    fontSize: 17,
    color: 'white',
  },
  listaVagas: {
    height: 300,
  },
});

export default UserProfileScreen;
