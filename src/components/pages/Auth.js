import React from "react"
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import InfoIcon from "@material-ui/icons/Info"
import {makeStyles} from "@material-ui/core"
import LoginForm from "../ui/LoginForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}))

const Auth = () => {
  const classes = useStyles()
  const demoData = (<><p>Login: demo@example.com</p><p>Password: demodemo</p></>)

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <LoginForm />
      <Tooltip title={demoData} interactive arrow>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}


export default Auth