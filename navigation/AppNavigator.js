import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaVagas from '../screens/ListaVagasScreen';
import LoginScreen from '../screens/LoginScreen';
import SignOnScreen from '../screens/SignOnScreen'
import DetalheVagaScreen from '../screens/DetalheVagaScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ListaVagasScreen" component={ListaVagas}/>
        <Stack.Screen name="SignOnScreen" component={SignOnScreen} />
        <Stack.Screen name="DetalheVagaScreen" component={DetalheVagaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;