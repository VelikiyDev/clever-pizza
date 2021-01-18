import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import React, {useState} from "react"
import {makeStyles} from "@material-ui/core"
import Divider from "@material-ui/core/Divider"
import Chip from "@material-ui/core/Chip"
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Link} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {productRemove} from "../../actions/products.actions";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
  price: {

  },
  priceDiscount: {
    color: "red"
  },
  width100: {
    width: "100%"
  },
  productCard: {
    height: "100%"
  },
  gutterBottom: {
    marginBottom: "16px"
  },
  discount: {
    marginLeft: '10px',
    fontSize: '0.875rem',
    textDecoration: "line-through",
  }
})


const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

export const ProductCard = connect(mapStateToProps, {productRemove})(({data, loggedIn}) => {
  const classes = useStyles()
  const [anchor, setAnchor] = useState(null)
  const dispatch = useDispatch()
  const open = Boolean(anchor)


  const {_id,name,description,image,price,discount,discountTo} = data

  const handleActionsClick = (event) => {
    setAnchor(event.currentTarget)
  }

  const handleActionsClose = () => {
    setAnchor(null)
  }

  const handleRemoveProduct = () => {
    dispatch(productRemove({_id}))
    handleActionsClose()
  }

  const discountEndsInDays = Math.ceil((new Date(discountTo) - Date.now()) / (1000 * 60 * 60 * 24))
  const discountPrice = (Math.round((price - (price*discount)/100) * 100)/100).toFixed(2)


  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.productCard}>
        <div>
          <CardMedia
            className={classes.media}
            image={image}
            title={name}
          />
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {name}
                </Typography>
              </Grid>
              {
                loggedIn &&
                <Grid item>
                  <IconButton
                    aria-label="more"
                    aria-controls="actions-menu"
                    aria-haspopup="true"
                    size="small"
                    onClick={handleActionsClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="actions-menu"
                    anchorEl={anchor}
                    keepMounted
                    open={open}
                    onClose={handleActionsClose}
                  >
                    <MenuItem component={Link} to={`/edit/${_id}`} onClick={handleActionsClose}>Edit</MenuItem>
                    <MenuItem onClick={handleRemoveProduct}>Delete</MenuItem>
                  </Menu>
                </Grid>
              }
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <Typography gutterBottom variant="subtitle1" className={`${discountEndsInDays >= 0 ? classes.priceDiscount : '' }`}>
                  ${discountEndsInDays >= 0 ? discountPrice: (Math.round(price * 100) / 100).toFixed(2)}
                </Typography>
              </Grid>
              {discountEndsInDays >= 0 ?
                <Grid item>
                  <Typography className={classes.discount} gutterBottom variant="subtitle2">
                    ${(Math.round(price * 100) / 100).toFixed(2)}
                  </Typography>
                </Grid>
              :
                ''
              }
            </Grid>
            {discountEndsInDays >= 0 && <Divider variant="middle"/>}
            {
              discountEndsInDays >= 0 && <Chip
                icon={<AccessTimeIcon />}
                label={`Discound ends${discountEndsInDays > 0 ? ' in:' : '' } ${discountEndsInDays > 0 ? discountEndsInDays + ' days' : 'today!'}`}
                color="secondary"
                className={`${classes.width100} ${classes.gutterBottom}`}
              />
            }

            <Typography color="textSecondary" variant="body2">
              {description}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  )
})