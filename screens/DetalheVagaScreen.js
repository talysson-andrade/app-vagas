import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../components/header'
import { useNavigation } from '@react-navigation/native';

const DetalheVagaScreen = ({route}) => {
  const {id, name, empresa, modalidade, descricao} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.text}>Empresa: {empresa}</Text>
      <Text style={styles.text}>Modalidade: {modalidade}</Text>
      <Text style={styles.text}>Descrição: {descricao}</Text>
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DetalheVagaScreen;