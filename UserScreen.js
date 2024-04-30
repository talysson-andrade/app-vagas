import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation

const UserProfileScreen = () => {
  const navigation = useNavigation(); // Use o hook useNavigation

  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Mantém a proporção da imagem
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickResume = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      setResume(res.uri);
    } catch (err) {
      console.log('Erro ao selecionar currículo:', err);
    }
  };

  const handleLogout = () => {
    // Implemente a funcionalidade de logout aqui
    // Por exemplo, você pode limpar os dados de autenticação ou reiniciar o estado do aplicativo
    navigation.navigate('Login'); // Navegue para a tela de login após o logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meu Perfil</Text>
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      <TouchableOpacity style={styles.selectImageButton} onPress={pickImage}>
        <Text style={styles.selectImageText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>Seu Nome Aqui</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Idade:</Text>
        <Text style={styles.info}>Sua Idade Aqui</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>País:</Text>
        <Text style={styles.info}>Seu País Aqui</Text>
      </View>
      {resume && (
        <View style={styles.resumeContainer}>
          <Text style={styles.resumeText}>Currículo: {resume}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.selectResumeButton} onPress={pickResume}>
        <Text style={styles.selectResumeText}>Selecionar Currículo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={() => alert('Editar perfil')}>
        <Text style={styles.editText}>Editar Perfil</Text>
      </TouchableOpacity>
      {/* Botão de logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair do App</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  selectImageButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  selectImageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  resumeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  resumeText: {
    fontSize: 16,
  },
  selectResumeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectResumeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
