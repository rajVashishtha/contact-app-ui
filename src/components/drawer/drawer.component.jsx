import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SimpleAppBar from '../appbar/appbar.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAddressBook} from '@fortawesome/free-solid-svg-icons'
import {faGoogle, faFacebook, faLinkedin, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import './drawer.style.scss'
import {setActiveTab} from '../../redux/active-tab/active-tab.action'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const drawerWidth = 240;
const useStyles = theme =>({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 10,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});


class MiniDrawer extends React.Component{
  
      state = {
        open : false,
        list:[
          {
            icon: (<FontAwesomeIcon icon={faAddressBook} style={{
                    marginLeft:"2.5px",
                    fontSize:'30px',
                    color:"#A57D49"
                  }}/>),
            text: "Contact"
          },
          {
            icon: (<FontAwesomeIcon icon={faGoogle} style={{
                    marginLeft:"2.5px",
                    fontSize:'30px',
                    color:"#DB4437"
                  }}/>),
            text: "Google"
          },
          {
            icon: (<FontAwesomeIcon icon={faFacebook} style={{
                    marginLeft:"2.5px",
                    fontSize:'30px',
                    color:"#4267B2"
                  }}/>),
            text: "Facebook"
          },
          {
            icon: (<FontAwesomeIcon icon={faTwitter} style={{
                    marginLeft:"2.5px",
                    fontSize:'30px',
                    color:"#00acee"
                  }}/>),
            text: "Twitter"
          },
          {
            icon: (<FontAwesomeIcon icon={faLinkedin} style={{
                    marginLeft:"2.5px",
                    fontSize:'30px',
                    color:"#0e76a8"
                  }}/>),
            text: "LinkedIn"
          },
          {
            icon: (<FontAwesomeIcon icon={faInstagram} style={{
                    marginLeft:"2.5px",
                    fontSize:'30px',
                    color:"white",
                    borderRadius:"5px"
                  }} className="instagram"/>),
            text: "Instagram"
          }
        ],
        active:"Contact",
        openSnackBar : false
      }
      handleSnackBarClose = ()=>{
        this.setState({
          openSnackBar:false
        })
      }
      handleDrawerOpen = ()=>{
        this.setState({
          open:true
        })
      }
      handleDrawerClose = ()=>{
        this.setState({
          open:false
        })
      }
      handleChangeTab = (tab)=>{
          const {setActiveTab, currentUser,history} = this.props
          if (currentUser === null){
            this.setState({
              openSnackBar:true
            })
            return;
          }
          setActiveTab(tab)
          history.push("/contacts/"+tab)
      }
  render(){
    const { classes, theme, activeTab} = this.props
    return (
          <div className={classes.root}>
            <CssBaseline  />
            <SimpleAppBar classesGiven={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.open,
              })} openDrawer={this.handleDrawerOpen}  classesForMenuButton={clsx(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}/>
            
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open,
                }),
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                {this.state.list.map((item, index) => (
                  <ListItem button key={item.text} style={{
                    paddingTop:"20px",
                    paddingBottom:"20px",
                    backgroundColor: activeTab === item.text ? ("#E5E4E3"):("white")
                  }} onClick={()=>{this.handleChangeTab(item.text)}}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} style={{fontSize:"25px"}} />
                  </ListItem>
                ))}
              </List>
              
            </Drawer>
            <Snackbar open={this.state.openSnackBar} autoHideDuration={4000} onClose={this.handleSnackBarClose}>
              <Alert onClose={this.handleSnackBarClose} severity="info" color="success" variant="standard">
                Please Login to use features !
              </Alert>
          </Snackbar>
          </div>
    );
  }
}

const mapDispatchToProps = dispatch =>({
  setActiveTab : tab => dispatch(setActiveTab(tab))
})

const mapStateToProps = state =>({
  activeTab: state.activeTab.currentActiveTab,
  currentUser:state.user.currentUser
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles, { withTheme:true})(MiniDrawer)))