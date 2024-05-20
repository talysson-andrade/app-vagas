import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {image} from 'react-native';
import logo from './assets/estacio.png';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    // Lógica de autenticação
    // Aqui você pode fazer a validação do email e senha
    // Se for válido, navegue para a próxima tela
    if (email && password) {
     navigation.navigate('Vagas'); // Substitua 'Main' pelo nome da tela que você quer navegar
    } else {
      alert('Por favor, insira seu email e senha.');
    }
  };

  const navigateToCadastro = () => {
    // Navegue de volta para a tela de cadastro
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
    
    <Image source={logo}
      style={styles.image}
     />

      <Text style={styles.text}> Login </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.grid}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Voltar para cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#000080',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 0,
    marginTop: 10,
    textAlign: 'center',

  },
   buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
   image: {
    width: 200, 
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    top: 1,
  },text: {
  }
});

export default LoginScreen;
