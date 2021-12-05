import React from 'react'
import session from '../session/token'

// Can be used to get categories, subscriptions from API
export default function getResourcesFromApi (endpoint, tokenHeader, sessionToken, navigation) {
  return fetch(endpoint,
    { headers: { [tokenHeader]: sessionToken } })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 403) {
          window.alert('Session expired')
          session.facebookSession = false
          session.firebaseSession = false
          navigation.navigate('Login')
        } else {
          window.alert('There was an error while handling your request')
        }
      } else {
        return response.json()
      }
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.error(error)
    })
}
