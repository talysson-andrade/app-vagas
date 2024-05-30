import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import firebase from './ConfigFirebase';
import logo from './assets/Estacio.png';


const db = firebase.database();
const sha256 = require('js-sha256');

function sendDataUser(uid, nome, email, cpf, senha) {
  const userPath = `/users/${uid}`;
  const userData = {
    name: nome,
    email: email,
    cpf: cpf,
    senha: senha,
    isAdmin: false
  };
  return db.ref(userPath).set(userData);
}

function generateSHA(text) {
  const hash = sha256(text);
  return hash;
}

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigation = useNavigation();

  const validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const formatarCPF = (text) => {
    let cleaned = ('' + text).replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 3 || i === 6) {
        formatted += '.';
      } else if (i === 9) {
        formatted += '-';
      }
      formatted += cleaned[i];
    }
    return formatted;
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    return true;
  };

  const validarDataNascimento = (data) => {
    return moment(data, 'DD/MM/YYYY', true).isValid();
  };

  const validarSenha = () => {
    return senha.length >= 8 && senha === confirmarSenha;
  };

  const formatarDataNascimento = (text) => {
    if (text.length === 2 || text.length === 5) {
      return text + '/';
    }
    return text;
  };

  const cadastrarUsuario = () => {
    if (!nome || !email || !cpf || !dataNascimento || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Email invalido.');
      return;
    }

    if (!validarCPF(cpf)) {
      Alert.alert('Erro', 'Por favor, insira um CPF válido.');
      return;
    }

    if (!validarDataNascimento(dataNascimento)) {
      Alert.alert('Erro', 'Por favor, insira uma data de nascimento válida (DD/MM/AAAA).');
      return;
    }

    if (senha.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (!validarSenha()) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        return sendDataUser(user.uid, nome, email, cpf, generateSHA(senha));
      })
      .then(() => {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('Vagas');
      })
      .catch((error) => {
        Alert.alert('Erro', 'Erro ao cadastrar usuário.');
        console.error("Erro ao cadastrar usuário:", error);
      });
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.text}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNome}
        value={nome}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <Text style={styles.text}>CPF</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCpf(formatarCPF(text))}
        value={cpf}
        keyboardType="numeric"
        maxLength={14}
      />
      <Text style={styles.text}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setDataNascimento(formatarDataNascimento(text))}
        value={dataNascimento}
        keyboardType="numeric"
        maxLength={10}
      />
      <Text style={styles.text}>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
      />
      <Text style={styles.text}>Confirme sua Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setConfirmarSenha}
        value={confirmarSenha}
        secureTextEntry
      />
      <View style={styles.grid}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Entre</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={cadastrarUsuario}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    top: -58,
  },
  button: {
    backgroundColor: '#000080',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 0,
    marginTop: 10,
    textAlign: 'center',
    top: -50,
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
    flex: 1,
    marginLeft: 89,
    top: 1,
  },
  text: {
    top: -60,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -50,
  },
});

export default CadastroUsuario;
