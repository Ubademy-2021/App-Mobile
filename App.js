import LogInScreen from './screens/LogInScreen'
import SignUpScreen from './screens/SignUpScreen'
import InterestsScreen from './screens/InterestsScreen'
import LocationScreen from './screens/LocationScreen'
import ProfileSelectionScreen from './screens/ProfileSelectionScreen'
import ProfileInfoScreen from './Profile/ProfileInfoScreen'
import ProfileEditorScreen from './Profile/ProfileEditorScreen'

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUpOptionsScreen from './screens/SignUpOptionsScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LogInScreen} options={{ title: 'Welcome' }}/>
          <Stack.Screen name="SignupOptions" component={SignUpOptionsScreen}/>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Interests" component={InterestsScreen} options={{ title: 'Interests' }}/>
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
          <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
          <Stack.Screen name="ProfileEditor" component={ProfileEditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
