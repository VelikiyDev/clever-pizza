import React, {useState} from "react"
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {makeStyles} from "@material-ui/core"
import {fetchUser} from "../../actions/user.actions";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const LoginForm = ({fetchUser}) => {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const changeHandler = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const loginHandler = (e) => {
    e.preventDefault()
    fetchUser({...formData})
  }

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={changeHandler}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={changeHandler}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={loginHandler}
        >
          Sign In
        </Button>
      </form>
    </Container>
  )
}

const mapStateToProps = ({ data = {}, isFetchingData = false }) => ({
  data,
  isFetchingData
});
export default connect( mapStateToProps, {fetchUser})(LoginForm);