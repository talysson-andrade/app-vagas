import { View, Text, StyleSheet, Image } from 'react-native';
export default function Header() {

  return(
  <View style={styles.container}>
    <Image style={styles.logo} source= {require('../assets/logo.jpg')}/>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor: 'white',
    

  },
  logo: {
    height:40,
    width: 200,
  }
});

