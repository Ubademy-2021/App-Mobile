import React from 'react'
import { CheckIcon, Select, VStack } from 'native-base'

export default function SelectDropdownList (props) {
  return (
    <VStack space={4}>
      <Select
        selectedValue={props.var}
        minWidth="200"
        accessibilityLabel="Choose an option"
        placeholder="Choose an option"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />
        }}
        mt={1}
        onValueChange={(itemValue) => props.setter(itemValue)}
        defaultValue = {props.defaultValue}
      >
        { props.items.map(item => {
          return (<Select.Item key={item.value} label={item.displayValue} value={item.value} />)
        }) }
      </Select>
    </VStack>
  )
}
