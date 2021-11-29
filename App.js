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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SignUpOptionsScreen from './screens/SignUpOptionsScreen'
import StudentCourseSearchScreen from './screens/StudentCourseSearchScreen'
import StudentCourseDetailsScreen from './screens/StudentCourseDetailsScreen'
import StudentMyCoursesScreen from './screens/StudentMyCoursesScreen'
import SubscriptionScreen from './screens/SusbscriptionScreen'
import SubscriptionDetailsScreen from './screens/SubscriptionDetailsScreen'
import { AntDesign } from '@expo/vector-icons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import StudentMyFavouritesScreen from './screens/StudentMyFavouritesScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function StudentHome () {
  return (
    <Tab.Navigator initialRouteName='Profile'>
      <Tab.Screen
        name="MyCourses"
        component={StudentMyCoursesScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => { return <MaterialIcons name="class" size={24} color="black" /> }
        }} />
      <Tab.Screen
        name="MyFavourites"
        component={StudentMyFavouritesScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => { return <AntDesign name="star" size={24} color="black" /> }
        }} />
      <Tab.Screen
        name="Search"
        component={StudentCourseSearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => { return <AntDesign name="search1" size={24} color="black" /> }
        }}/>
      <Tab.Screen name="Suscribe" component={SubscriptionScreen} options={{
        headerShown: false,
        tabBarIcon: () => { return <Foundation name="sheriff-badge" size={24} color="black" /> }
      }} />
      <Tab.Screen
        name="Profile"
        component={ProfileInfoScreen} options={{
          headerShown: false,
          tabBarIcon: () => { return <AntDesign name="user" size={24} color="black" /> }
        }}/>
    </Tab.Navigator>
  )
}

function CreatorHome () {
  return (
    <Tab.Navigator initialRouteName='Profile'>
      <Tab.Screen name="MyCourses" component={StudentMyCoursesScreen} options={{ headerShown: false, tabBarIcon: () => { return <MaterialIcons name="class" size={24} color="black" /> } }} />
      <Tab.Screen name="Profile" component={ProfileInfoScreen} options={{ headerShown: false, tabBarIcon: () => { return <AntDesign name="user" size={24} color="black" /> } }}/>
    </Tab.Navigator>
  )
}

function CollaboratorHome () {
  return (
    <Tab.Navigator initialRouteName='Profile'>
      <Tab.Screen name="MyCourses" component={StudentMyCoursesScreen} options={{ headerShown: false, tabBarIcon: () => { return <MaterialIcons name="class" size={24} color="black" /> } }} />
      <Tab.Screen name="Profile" component={ProfileInfoScreen} options={{ headerShown: false, tabBarIcon: () => { return <AntDesign name="user" size={24} color="black" /> } }}/>
    </Tab.Navigator>
  )
}

const App = () => {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
          name="StudentHome"
          component={StudentHome}
          options={{ title: 'Student Profile' }}
          />
          <Stack.Screen
          name="CreatorHome"
          component={CreatorHome}
          options={{ title: 'Creator Profile' }}
          />
          <Stack.Screen
          name="CollaboratorHome"
          component={CollaboratorHome}
          options={{ title: 'Collaborator Profile' }}
          />
          <Stack.Screen name="Login" component={LogInScreen} options={{ title: 'Welcome' }}/>
          <Stack.Screen name="SignupOptions" component={SignUpOptionsScreen}/>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Interests" component={InterestsScreen} options={{ title: 'Interests' }}/>
          <Stack.Screen name="Location" component={LocationScreen} />
        {/* <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} /> */}
          <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
        {/* <Stack.Screen name="StudentCourseSearch" component={StudentCourseSearchScreen} options={{ title: 'Course Search' }}/> */}
          <Stack.Screen name="StudentCourse" component={StudentCourseDetailsScreen} options={{ title: 'Course Details' }}/>
          <Stack.Screen name="ProfileEditor" component={ProfileEditorScreen} />
          <Stack.Screen name="SubscriptionDetail" component={SubscriptionDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
