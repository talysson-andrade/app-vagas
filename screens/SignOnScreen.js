import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignOnScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation();

  const handleSignOn = () => {
    // Validação dos campos
    if (!email || !password || !confirmPassword || !cpf || !fullName) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('O e-mail informado é inválido.');
      return;
    }
    if (!isValidCPF(cpf)) {
      alert('O CPF informado é inválido.');
      return;
    }

    // Se passou pela validação, você pode navegar para a próxima tela ou executar a lógica de cadastro aqui
    navigation.navigate('Cadastro');
  };

  const isValidEmail = (email) => {
    // Lógica de validação de e-mail
    // Exemplo simples: verificar se o e-mail possui um formato válido
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidCPF = (cpf) => {
    // Lógica de validação de CPF
    // Exemplo simples: verificar se o CPF possui 11 dígitos
    return /^\d{11}$/.test(cpf);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        onChangeText={(text) => setCpf(text)}
        value={cpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
      />
      <Button title="Cadastre-se" onPress={handleSignOn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SignOnScreen;
