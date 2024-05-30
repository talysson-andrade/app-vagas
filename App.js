// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from './CreateAccountScreen';
import LoginScreen from './LoginScreen';
import VagasScreen from './VagasScreen';
import DetalhesVagasScreen from './DescricaoVagaScreen';
import UserProfileScreen from './UserProfileScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        
        <Stack.Screen name="Cadastro" component={CreateAccountScreen} />
        <Stack.Screen name="Vagas" component={VagasScreen} />
        <Stack.Screen name="Detalhe vaga" component={DetalhesVagasScreen} />
        <Stack.Screen name="Perfil" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;