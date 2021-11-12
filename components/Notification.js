import React from 'react'
import { Alert, CloseIcon, HStack, IconButton, Text, VStack } from 'native-base'

export default function Notification (props) {
  return (
    <Alert w="100%" status={props.status}>
      <VStack space={2} flexShrink={1} w="100%">
      <HStack flexShrink={1} space={2} justifyContent="space-between">
      <HStack space={2} flexShrink={1}>
        <Alert.Icon mt="1" />
          <Text fontSize="md" color="coolGray.800">
            {props.message}
          </Text>
      </HStack>
      </HStack>
      </VStack>
    </Alert>
  )
}
