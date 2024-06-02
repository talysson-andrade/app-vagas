import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icone from 'react-native-vector-icons/Entypo';
import firebase from './configFirebase';
import capa from './assets/capa-estacio.png'

const db = firebase.database();
const auth = firebase.auth();

const VagasScreen = ({ navigation }) => {
  const [vagas, setVagas] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  if(auth.currentUser === null){
    navigation.navigate('Login')
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        db.ref(`users/${user.uid}`).once('value')
          .then(snapshot => {
            const data = snapshot.val();
            setUserData(data);
          })
          .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error);
          });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadVagas = () => {
      if (userData) {
        db.ref('vagas/')
          .once("value")
          .then(snapshot => {
            const data = snapshot.val();
            if (data) {
              const vagasArray = Object.keys(data).map(key => ({
                key,
                ...data[key],
                numInscricoes: data[key].inscricoes ? data[key].inscricoes.length : 0
              }));
              setVagas(vagasArray);
            } else {
              setVagas([]);
            }
          })
          .catch(error => {
            console.error("Ocorreu um erro ao buscar as vagas no Banco de Dados: ", error);
            setVagas([]);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    loadVagas();

    const unsubscribeFocus = navigation.addListener('focus', loadVagas);

    return () => {
      unsubscribeFocus();
    };
  }, [userData, navigation]);


  const handleVagaPress = (vaga) => {
    navigation.navigate('DescricaoVaga', vaga);
  };

  const renderVaga = ({ item }) => (
    
    <TouchableOpacity style={styles.vaga} onPress={() => handleVagaPress(item)}>
    <View style={styles.vagaIcon}><Icone name='briefcase' size={25}/></View>
    <View style={styles.vagaText}>     
    <Text style={styles.vagaTitle}>{item.cargo}</Text>
    <Text>{item.empresa}</Text>
    <Text>{item.tipo}</Text>
    <Text>{item.numInscricoes} inscrições</Text>
    </View>

    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image source={capa} style= {styles.imagem} resizeMethod='contain'/>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Icon name="user" size={35} />
      </TouchableOpacity>
    </View>
      <Text style={styles.title}>Conheça as oportunidades</Text>
      <View style={styles.vagasContainer}>
      <ScrollView>
        <FlatList
          data={vagas}
          renderItem={renderVaga}
          keyExtractor={item => item.key}
        />
      </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
      {userData && userData.isAdmin && (
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => navigation.navigate('CadastroVaga')}
        >
          <Text style={styles.adminButtonText}>Criar Vaga</Text>
        </TouchableOpacity>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 15,
    flex:1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  vaga: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  vagaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    paddingHorizontal: 20,
  },
  adminButton: {
    backgroundColor: '#000080',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
  },
  adminButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 10,
  }, 
  vagasContainer: {
    flex: 1,
  },
  imagem:{
    height: 55,
    width: 200,
  },
  header:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 35,
    justifyContent:'space-between'
  },
  vagaText:{
    paddingHorizontal: 10,
  },
  vagaIcon:{
    paddingHorizontal: 10,
  },
});

export default VagasScreen;
