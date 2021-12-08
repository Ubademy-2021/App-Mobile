import React from 'react'
import session from '../session/token'

// Can be used to get categories, subscriptions from API
export function getResourcesFromApi (endpoint, tokenHeader, sessionToken, navigation) {
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
      }

      return response.json()
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.error(error)
    })
}

export function postNewCourseToApi (postNewCourseURL, tokenHeader, sessionToken, body, navigation) {
  return fetch(postNewCourseURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      courseName: body.courseName,
      duration: body.duration,
      // Supuestamnete ya el curso no tiene precio de inscripcion
      inscriptionPrice: 10,
      ownerId: body.ownerId
    })
  }).then((response) => {
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
      window.alert('Course created successfully')
      navigation.navigate('MyCourses')
    }

    return response.status
  })
    .catch((error) => {
      console.error(error)
    })
}
