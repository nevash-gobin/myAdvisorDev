import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'absolute'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
const percentage = 70;
export default function PermanentDrawerRight() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
 
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
        <Box component="span" m={0.1}>
        <Typography style={{ fontWeight: 600, fontSize: 20}}>Your Advising Progress:</Typography>

        </Box>
<br></br>
        <div className="progressBar">
       <ProgressBar label={`${percentage} %`} now={percentage} style={{fontSize:"12px", fontWeight:600}}/>
    </div>
    <br></br>
    <div style={{paddingLeft:"50px"}}><Button href="#" style={{color:"white", fontWeight:600, backgroundColor:"#0066FF"}}>Begin Advising</Button> </div>
    

       <Box component='span' m={7}> </Box>

        <Box component="span" m={0.1}>
        <Typography style={{ fontWeight: 600, fontSize: 20}} >Your Degree Progress:</Typography>
        </Box>
        <br></br>
        <div className="progressBar">
       <ProgressBar label={`${percentage} %`} now={percentage} style={{fontSize:"12px", fontWeight:600}} />
    </div>


      </Drawer>
    </div>
  );
}
