import * as React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import { useHistory } from 'react-router-dom'

interface HeaderBarProps {
  title: string
  showBack: boolean
  backTo?: string
  onBack?: Function
  rightText?: string
  onRight?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      color: '#fff'
    }
  })
)

const HeaderBar: React.SFC<HeaderBarProps> = ({
  title,
  showBack,
  backTo = '',
  onBack,
  rightText = '',
  onRight
}) => {
  const classes = useStyles()
  const history = useHistory()
  const onClickBack = () => {
    if (backTo) {
      history.push(backTo)
    } else if (typeof onBack === 'function') {
      if (onBack()) history.goBack()
    } else {
      history.goBack()
    }
  }
  return (
    <AppBar position='fixed'>
      <Toolbar>
        {showBack && (
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='back'
            onClick={onClickBack}
          >
            <BackIcon />
          </IconButton>
        )}
        <Typography variant='h6' className={classes.title}>
          {title}
        </Typography>
        {rightText && (
          <Button
            style={{ color: '#fff', fontSize: '1.25rem' }}
            onClick={onRight}
          >
            {rightText}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default HeaderBar
