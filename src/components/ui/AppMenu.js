import {connect, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import React, {forwardRef, useMemo, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles, useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewListIcon from '@material-ui/icons/ViewList';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from '@material-ui/icons/Add';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {logoutUser} from "../../actions/user.actions";

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: '32px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginBottom: '32px',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}));

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
    () => forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


export const AppMenu = connect(mapStateToProps, {logoutUser})(({loggedIn}) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUser())
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


  return (
    <>
      <AppBar
        className={drawerOpen && loggedIn ? classes.appBarShift : classes.appBar}
        position="static"
      >
        <Toolbar>
          {loggedIn && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={drawerOpen ? `${classes.menuButton} ${classes.hide}` : ``}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" className={classes.title}>
            Clever Pizza App
          </Typography>

          {!loggedIn && (
            <div>
              <Button color="inherit" component={Link} to='/login'>Login</Button>
            </div>
          )}
          {loggedIn && (
            <div>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {loggedIn && (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItemLink to="/" primary="Catalog" icon={<ViewListIcon />} />
            <ListItemLink to="/add" primary="Create product" icon={<AddIcon />} />
          </List>
        </Drawer>
      )}
    </>
  )
})