import { makeStyles } from '@material-ui/core'
import { pxToVh } from '../../utils'

const commonPageStyle = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  content: {
    position: 'fixed',
    top: pxToVh(56),
    bottom: 0,
    left: 0,
    right: 0,
    overflowY: 'scroll',
    padding: 10,
  },
})

export { commonPageStyle }
