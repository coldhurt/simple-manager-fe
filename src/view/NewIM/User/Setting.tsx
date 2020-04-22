import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import WifiIcon from '@material-ui/icons/Wifi'
import { useSelector, useDispatch } from 'react-redux'
import { getTheme } from '../../../store/modules'
import { changeThemeAction } from '../../../store/modules/setting'
import { HeaderBar } from '../../../components'
import { ThemeType } from '../../../store/modules/setting/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
)

function Setting() {
  const classes = useStyles()
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()
  const onChangeTheme = () => {
    dispatch(
      changeThemeAction(
        theme === ThemeType.LIGHT ? ThemeType.NIGHT : ThemeType.LIGHT
      )
    )
  }

  return (
    <>
      <HeaderBar title={'Settings'} showBack />
      <List
        subheader={<ListSubheader>Settings</ListSubheader>}
        className={classes.root}
      >
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText id='switch-list-label-wifi' primary='Dark Theme' />
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              onChange={onChangeTheme}
              checked={theme === 'night'}
              inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  )
}

export default {
  view: Setting,
}
