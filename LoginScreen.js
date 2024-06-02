import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './configFirebase';
import logo from './assets/logo-estacio.png'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLoginPress = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        Alert.alert('Sucesso', 'Login realizado com sucesso');
        navigation.navigate('Vagas');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'O email ou senha inseridos estão incorretos. Por favor, tente novamente.');
      });
  };


  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.imagem} resizeMode='contain'/>
      <Text style={styles.title}>Vagas Estácio</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        keyboardType='default'
      />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToCadastro}>
        <Text style={styles.link}>Ainda não tem uma conta? Cadastre-se aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#F5F5F5',
  },
  title: {
    marginTop: 40,
    fontSize: 32,
    marginBottom: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    width: "70%"
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    
  },
  link: {
    marginTop: 30,
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  imagem : {
    height : 160,
    width : 160,
  },
  inputContainer:{
    width: "100%",
    marginVertical: 40,
    gap: 11,

  },
});

export default LoginScreen;