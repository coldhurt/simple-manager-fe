import { makeStyles } from '@material-ui/core'

const commonPageStyle = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    background: '#fff'
  },
  content: {
    position: 'fixed',
    top: 56,
    bottom: 0,
    left: 0,
    right: 0,
    overflowY: 'scroll',
    padding: 10,
    background: '#fff'
    // backgroundImage: 'url("/images/chatbox1.jpg")',
    // backgroundSize: 'cover'
  }
})

export { commonPageStyle }