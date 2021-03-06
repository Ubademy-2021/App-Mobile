import React from 'react'
import ConfirmationAlert from './ConfirmationAlert'
import { Collapse } from 'native-base'
import Notification from './Notification'

export default function EnrrollAndUnenrrollButtonWithConfirmation (props) {
  if (props.activeCourse && !props.alreadyEnrolled) {
    return (
      <ConfirmationAlert
        buttonStatus='primary'
        buttonLabel='Enroll'
        header='Enroll to this course'
        body='Are you sure you want to enroll in this course?'
        confirmButtonLabel='Enroll'
        onConfirm={props.handleEnrollment}
        hasNecessarySub={props.hasNecessarySub}
      />
    )
  } else if (props.activeCourse && props.alreadyEnrolled) {
    return (
      <ConfirmationAlert
          buttonStatus='danger'
          buttonLabel='Unenroll'
          header='Unenroll to this course'
          body='Are you sure you want to unenroll from this course?'
          confirmButtonLabel='Unenroll'
          onConfirm={props.handleUnenrollment}
          hasNecessarySub={true}
      />
    )
  } else {
    return (
      <Collapse isOpen={!props.activeCourse}>
          <Notification
            status='error'
            message={'This course is not active at the moment'}
          />
      </Collapse>
    )
  }
}
