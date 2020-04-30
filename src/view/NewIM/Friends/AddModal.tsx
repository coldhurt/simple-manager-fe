import React from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Modal, ListItem, List, makeStyles } from '@material-ui/core'
import { pxToVw, pxToVh } from '../../../utils'

interface AddModalProps {
  show: boolean
  onClose(): void
}

const useStyle = makeStyles({
  root: {
    position: 'absolute',
    right: pxToVw(66),
    bottom: pxToVh(66),
  },
})

const AddModal: React.FunctionComponent<AddModalProps> = ({
  show,
  onClose,
}) => {
  const classes = useStyle()
  const history = useHistory()
  const onAddFriend = React.useCallback(() => {
    onClose()
    history.push('/NewIM/friends/add')
  }, [history, onClose])
  return (
    <Modal open={show} onClose={onClose}>
      <Paper className={classes.root}>
        <List>
          <ListItem onClick={onAddFriend}>添加好友</ListItem>
          <ListItem>创建群组</ListItem>
        </List>
      </Paper>
    </Modal>
  )
}

export default React.memo(AddModal)
