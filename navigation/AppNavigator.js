import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Vagas from '../screens/Vagas';
import LoginScreen from '../screens/LoginScreen';
import SignOnScreen from '../screens/SignOnScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Vagas" component={Vagas} />
        <Stack.Screen name="SignOnScreen" component={SignOnScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;