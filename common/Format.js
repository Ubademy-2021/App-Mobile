import React from 'react'

export function formatForSubscriptions (list) {
  const localList = []
  for (let i = 0; i < list.length; i++) {
    localList.push({ value: list[i].id, displayValue: list[i].description })
  }
  return localList
}

export function formatForCategories (list) {
  const localList = []
  for (let i = 0; i < list.length; i++) {
    localList.push({ value: list[i].id, displayValue: list[i].name })
  }
  return localList
}

export function formatForCollaborations (array) {
  const aux = []
  for (let i = 1; i < array.length; i++) {
    aux.push(array[i])
  }
  return aux
}
