import React from 'react'
import { AlertDialog, Box, Button } from 'native-base'

export default function ConfirmationAlert (props) {
  const [isOpen, setIsOpen] = React.useState(false)

  const onClose = () => setIsOpen(false)
  const onConfirm = () => {
    props.onConfirm()
    onClose()
  }

  const cancelRef = React.useRef(null)
  return (
    <Box>
      <Button colorScheme={props.buttonStatus} onPress={() => setIsOpen(!isOpen)} isDisabled={!props.hasNecessarySub}>
        {props.buttonLabel}
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{props.header}</AlertDialog.Header>
          <AlertDialog.Body>
            {props.body}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme={props.buttonStatus} onPress={onConfirm}>
                {props.confirmButtonLabel}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  )
}
