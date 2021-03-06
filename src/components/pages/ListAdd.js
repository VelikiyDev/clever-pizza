import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import InputAdornment from "@material-ui/core/InputAdornment";
import {productAdd} from "../../actions/products.actions";
import {useDebounce} from "../../hooks/imageDebounce";
import {useImageSize} from "../../hooks/imageSize";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const ListAdd = connect(null, {productAdd})(({productAdd}) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    discount: 0,
    discountTo: new Date(),
  })

  const imgSrc = useDebounce(formData.image, 1000)
  const [image, setImage] = useState('')
  const [imageWidth, imageHeight] = useImageSize(image)

  useEffect(() => {
    if (imgSrc) {
      setImage(imgSrc)
    }
  }, [imgSrc])

  const changeHandler = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const changeDateHandler = value => {
    setFormData({...formData, discountTo: value})
  }
  const submitHandler = (e) => {
    e.preventDefault()
    productAdd(formData)
  }
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Add new product
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            helperText="Name length must be between 20 and 60 characters"
            error={(formData.name.length < 20 || formData.name.length > 60)}
            id="name"
            label="Product name"
            name="name"
            autoFocus
            onChange={changeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={imageWidth < 200 || imageHeight < 200 || imageWidth > 4000 || imageHeight > 4000}
            fullWidth
            name="image"
            label="Image URL"
            id="image"
            onChange={changeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            helperText="Description exceeds maximal description length (200 characters)"
            error={formData.description.length > 200}
            name="description"
            label="Description"
            multiline={true}
            id="description"
            onChange={changeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={formData.price > 99999999.99 || formData.price <= 0}
            name="price"
            label="Price"
            id="price"
            helperText="Value must be more than 0 and less then 99999999.99"
            onChange={changeHandler}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={formData.discount < 10 || formData.discount > 90}
            required={formData.discount.length > 0}
            fullWidth
            name="discount"
            label="Discount amount"
            helperText="Discount must be between 10% and 90%"
            id="discount"
            onChange={changeHandler}
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
          {
            formData.discount.length > 0 &&
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                disablePast
                fullWidth
                required={formData.discount.length > 0}
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                label="Discount end date"
                value={formData.discountTo}
                onChange={changeDateHandler}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Add
          </Button>
        </form>
      </Container>
    </>
  )
})