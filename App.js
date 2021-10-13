import LogInScreen from './screens/LogInScreen'
import SignUpScreen from './screens/SignUpScreen'
import InterestsScreen from './screens/InterestsScreen'
import LocationScreen from './screens/LocationScreen'

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileSelectionScreen from './screens/ProfileSelectionScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LogInScreen} options={{ title: 'Welcome' }}/>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Interests" component={InterestsScreen} options={{ title: 'Interests' }}/>
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
