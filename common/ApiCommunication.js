import React from 'react'
import session from '../session/token'

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

export function getStudentSolutionForExam (getSolutionURL, tokenHeader, sessionToken, examInfo, studentId, navigation) {
  return fetch(getSolutionURL,
    { headers: { [tokenHeader]: sessionToken } })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 403) {
          window.alert('Session expired')
          session.facebookSession = false
          session.firebaseSession = false
          navigation.navigate('Login')
        } else {
          return null
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

export function postNewCourseToApi (postNewCourseURL, tokenHeader, sessionToken, body, ownerId, suscriptionId, categoryIds, navigation) {
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
      // No deberia tener este campo,pero tampoco me toma la request si le pongo 0
      description: body.description,
      ownerId: ownerId,
      suscriptionId: suscriptionId,
      categoryIds: categoryIds,
      videos: body.videosId
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

    return response.json()
  })
    .catch((error) => {
      console.error(error)
    })
}

export function putCourseToApi (putCourseURL, tokenHeader, sessionToken, body, suscriptionId, navigation) {
  return fetch(putCourseURL, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      courseName: body.courseName,
      duration: body.duration,
      description: body.description,
      suscriptionId: suscriptionId
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
      window.alert('Course updated successfully')
    }

    return response.json()
  })
    .catch((error) => {
      console.error(error)
    })
}

export function postCategoryToUser (postCategoriesURL, tokenHeader, sessionToken, userId, categoryId, navigation) {
  return fetch(postCategoriesURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      userId: userId,
      categoryId: categoryId
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
    }
    return response.status
  }).catch((error) => {
    console.error(error)
  })
}

export function postCategoryToCourse (postCategoriesURL, tokenHeader, sessionToken, courseId, categoryId, navigation) {
  return fetch(postCategoriesURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      courseId: courseId,
      categoryId: categoryId
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
    }
    return response.json()
  }).catch((error) => {
    console.error(error)
  })
}

export function postNewCollaborator (postNewCollaboratorURL, tokenHeader, sessionToken, courseId, userId, navigation) {
  return fetch(postNewCollaboratorURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      courseId: courseId,
      userId: userId
    })
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 403) {
        window.alert('Session expired')
        session.facebookSession = false
        session.firebaseSession = false
        navigation.navigate('Login')
      } else if (response.status === 400) {
        window.alert('User does not exist')
      } else {
        window.alert('There was an error while handling your request')
      }
    } else {
      window.alert('Collaborator added successfully')
    }

    return response.status
  })
    .catch((error) => {
      console.error(error)
    })
}

export function publishExam (publishExamURL, tokenHeader, sessionToken, navigation) {
  return fetch(publishExamURL, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    }
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
      window.alert('Exam published successfully')
    }

    return response.json()
  })
    .catch((error) => {
      console.error(error)
    })
}

export function postExam (postExamURL, tokenHeader, sessionToken, description, courseInfo, questions, navigation) {
  return fetch(postExamURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      description: description,
      courseId: courseInfo.id,
      questions: questions
    })
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 403) {
        window.alert('Session expired')
        session.facebookSession = false
        session.firebaseSession = false
        navigation.navigate('Login')
      } else {
        window.alert(response.json().detail)
      }
    } else {
      window.alert('Exam created succesfully')
      navigation.navigate('CreatorCourse', { course: courseInfo, creator: true })
    }

    return response.json()
  })
    .catch((error) => {
      console.error(error)
    })
}

export function putExam (putExamURL, tokenHeader, sessionToken, description, courseId, examNumber, questions, navigation) {
  return fetch(putExamURL, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      description: description,
      courseId: courseId,
      questions: questions,
      number: examNumber
    })
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 403) {
        window.alert('Session expired')
        session.facebookSession = false
        session.firebaseSession = false
        navigation.navigate('Login')
      } else {
        window.alert(response.json().detail)
      }
    } else {
      window.alert('Exam edited succesfully')
      for (let i = 0; i < questions.length; i++) {
        questions[i].number = i + 1
      }
      navigation.navigate('ExamDetails', { exam: { courseId: courseId, description: description, number: examNumber, published: false, questions: questions } })
    }

    return response.json()
  })
    .catch((error) => {
      console.error(error)
    })
}

export function postSolution (postSolutionURL, tokenHeader, sessionToken, examInfo, userId, answers, navigation) {
  return fetch(postSolutionURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      courseId: examInfo.courseId,
      examNumber: examInfo.number,
      userId: userId,
      answers: answers
    })
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 403) {
        window.alert('Session expired')
        session.facebookSession = false
        session.firebaseSession = false
        navigation.navigate('Login')
      } else {
        window.alert(response.json().detail)
      }
    } else {
      window.alert('Solution processed successfully')
      navigation.goBack()
    }

    return response.json()
  })
    .catch((error) => {
      console.error(error)
    })
}

export function postCorrection (postCorrectionURL, tokenHeader, sessionToken, solutionInfo, results, navigation) {
  return fetch(postCorrectionURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [tokenHeader]: sessionToken
    },
    body: JSON.stringify({
      courseId: solutionInfo.courseId,
      examNumber: solutionInfo.examNumber,
      userId: solutionInfo.userId,
      answers: results
    })
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 403) {
        window.alert('Session expired')
        session.facebookSession = false
        session.firebaseSession = false
        navigation.navigate('Login')
      } else {
        window.alert(response.json().detail)
      }
    } else {
      window.alert('Correction added successfully')
    }

    return response.json()
  })
    .catch((error) => {
      console.error(error)
    })
}
