import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaVagas from '../screens/ListaVagasScreen';
import LoginScreen from '../screens/LoginScreen';
import SignOnScreen from '../screens/SignOnScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ListaVagasScreen" component={ListaVagas}/>
        <Stack.Screen name="SignOnScreen" component={SignOnScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;