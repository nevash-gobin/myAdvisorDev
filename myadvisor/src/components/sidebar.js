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
import { Link } from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image';

const drawerWidth = "17vw";

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


export default function PermanentDrawerRight(props) {
  const classes = useStyles();
  var percentage = props.progress;
  var degPercentage = props.degProgress;

  return (
    <div className={classes.root}>
      
      
      <Drawer
        className={classes.drawer}
        variant={ props.hide ? ("temporary") : ("permanent") }
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Box component="span" m={0.1}>
        <Typography style={{ fontWeight: 600, fontSize: 20, marginLeft:"20px", marginRight:"20px", marginTop:"80px", textAlign: "center", fontFamily:"Epilogue"}}>Advising Progress:</Typography>
        </Box>
        <br></br>
        <div className="progressBar">
          { percentage === 0 ? (
            <div className="progressContainer">
              <ProgressBar now={percentage} style={{fontSize:"16px", fontWeight:600, marginLeft:"20px", marginRight:"20px", height:"35px", borderRadius:"45px"}}/>
              <div class="progress-bar-title">0%</div>
            </div>
          ) : (
        <ProgressBar label={`${percentage} %`} now={percentage} style={{fontSize:"16px", fontWeight:600, marginLeft:"20px", marginRight:"20px", height:"35px", borderRadius:"45px"}}/>
          )}
        </div>
    <br></br>
    <div style={{textAlign: "center"}}>
      { props.show ? (
      <Link to="/career">
        <Button style={{color:"white", fontWeight:600, backgroundColor:"#0066FF"}}>Begin Advising</Button> 
      </Link>
      ) : (null) }
    </div>
    
        
       <Box component='span' m={7}> </Box>
        <Box component="span" m={0.1}>
        <Typography style={{ fontWeight: 600, fontSize: 20, marginLeft:"20px", marginRight:"20px", textAlign: "center", fontFamily:"Epilogue"}} >Degree Progress:</Typography>
        </Box>
        <br></br>
        <div className="progressBar">
        { degPercentage === 0 ? (
            <div className="progressContainer">
              <ProgressBar now={degPercentage} style={{fontSize:"16px", fontWeight:600, marginLeft:"20px", marginRight:"20px", height:"35px", borderRadius:"45px"}}/>
              <div class="progress-bar-title">0%</div>
            </div>
          ) : (
        <ProgressBar label={`${degPercentage} %`} now={degPercentage} style={{fontSize:"16px", fontWeight:600, marginLeft:"20px", marginRight:"20px", height:"35px", borderRadius:"45px"}}/>
          )}
    </div>
    <Typography style={{ fontWeight: 600, fontSize: 14, marginLeft:"20px", marginRight:"20px", marginTop: "10px", textAlign: "center", fontFamily:"Epilogue"}} >{props.credits} credits remaining</Typography>


      </Drawer>
    </div>
  );
}
