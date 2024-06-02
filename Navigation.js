import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CreateAccountScreen from './CreateAccountScreen';
import LoginScreen from './LoginScreen';
import VagasScreen from './VagasScreen';
import UserProfileScreen from './UserProfileScreen';
import DescricaoVagaScreen from './DescricaoVagaScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CreateVagaScreen from './CreateVagaScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Vagas" headerMode="none">
      <Stack.Screen name="Cadastro" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Vagas" component={VagasScreen} />
      <Stack.Screen name="CadastroVaga" component={CreateVagaScreen} />
      <Stack.Screen name="Perfil" component={UserProfileScreen} />
      <Stack.Screen name="DescricaoVaga" component={DescricaoVagaScreen} />

    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Vagas') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Vagas" component={VagasScreen} />
      <Tab.Screen name="Perfil" component={UserScreen} />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default Navigator;
