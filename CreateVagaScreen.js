import {View, Image, TextInput, Text, StyleSheet, ScrollView, Alert, Button} from 'react-native'
import { useState } from 'react'
import firebase from './configFirebase'
import { useNavigation } from '@react-navigation/native';
import logo from './assets/estacio.png'

const db = firebase.database();

function sendDataVaga(cargoVaga, nomeEmpresa, tipoVaga, descricaoVaga){
  const path = '/vagas'
  const newVagaKey = db.ref().child(path).push().key;
  const vagaData = {
    cargo: cargoVaga,
    empresa: nomeEmpresa,
    tipo: tipoVaga,
    descricao: descricaoVaga,
    inscricoes: []
  };
   let updates = {};
  // Adiciona os dados do usuário ao objeto
  updates[`${path}/${newVagaKey}`] = vagaData;
  // Envia os dados para o Firebase
  return db.ref().update(updates);
}

const CreateVagaScreen = () => {
  const [tipoVaga, setTipoVaga] = useState();
  const [nomeEmpresa, setNomeEmpresa] = useState();
  const [descricaoVaga, setDescricaoVaga] = useState();
  const [cargoVaga, setCargoVaga] = useState(); 
  const navigation = useNavigation();
  
  const handleCriarVaga = () => {
    if (!tipoVaga || !nomeEmpresa || !descricaoVaga || !cargoVaga) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    sendDataVaga(cargoVaga, nomeEmpresa, tipoVaga, descricaoVaga)
    .then(() => {
    console.log("Vaga adicionada com sucesso ao Firebase");
  })
  .catch((error) => {
    console.error("Erro ao enviar dados para o Firebase:", error);
  });
    // Aqui você pode prosseguir com o cadastro do usuário
    Alert.alert('Vaga criada com sucesso');
    navigation.navigate('Vagas');
  };


 return (
    <View style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>Anunciar Vaga</Text>
        <View style={styles.inputView}>
          <Text style={styles.subtitle}>Cargo</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCargoVaga}
            value={cargoVaga}
            placeholder={"ex: Analista de TI, auxiliar adminstrativo, etc."}
            placeholderTextColor="gray"
            keyboardType="default"
          />
          <Text style={styles.subtitle}>Nome da Empresa</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNomeEmpresa}
            value={nomeEmpresa}
            placeholder={"ex: Estácio"}
            placeholderTextColor="gray"
          />
          <Text style={styles.subtitle}>Tipo de vaga</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTipoVaga}
            value={tipoVaga}
            placeholder={"ex: Tempo integral, estágio, voluntário, etc."}
            placeholderTextColor="gray"
          />
          <Text style={styles.subtitle}>Descrição da Vaga</Text>
          <View style = {styles.inputDesc}>
          <ScrollView>
          <TextInput
          editable
          multiline
          numberOfLines={1}
          maxLength={1000}
          onChangeText={setDescricaoVaga}
          value={descricaoVaga}
          style={{padding:10}}
          placeholder="Requisitos, responsabilidades, benefícios e outras informações indispensáveis para a vaga."
          placeholderTextColor="gray"
          />
          </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
        title="Voltar"
        color='red' 
        onPress={() => navigation.navigate('Vagas')}
        />
        <Button
        title="Criar vaga"
        color='blue' 
        onPress={handleCriarVaga}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingTop: 90,
    
  },
  title : {
    fontSize : 25,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    color : "black",
    paddingBottom: 70,
  },
  subtitle:{
    fontSize : 17,
    fontWeight: "bold",
    textAlign: 'left',

  },
  inputDesc: {
    height : 200,
    borderColor : "black",
    borderWidth : 1,
    borderRadius: 7,
  },
  inputView:{
    gap: 8,
    width : "100%",
    paddingHorizontal : 20,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 10,
    borderColor : "black",
    borderWidth : 1,
    borderRadius: 7
  }, 
  buttonView: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 75,
    width: '100%',
  }
  
});

export default CreateVagaScreen;
