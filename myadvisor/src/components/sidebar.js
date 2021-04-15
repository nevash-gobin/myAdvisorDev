import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

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
  var percentage = props.progress; // Advising progress percentage
  var degPercentage = (props.degProgress * 1).toFixed(1); // Degree progress percentage
  var newDeg = props.newDeg; // Updated degree credits
  var difference = props.credits - newDeg; // Updated degree credits remaining
  if (difference < 0) { // Set difference to 0 so that a negative number is not displayed
    difference = 0;
  }
  var newDegPercentage = ((newDeg / 93) * 100).toFixed(1); // Updated degree progress percentage

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
      { 
      props.warning ? (
        <div>
          <Button style={{color:"#A9A7A7", fontWeight:600, backgroundColor:"#E6E6E6", borderColor:"#E6E6E6"}}>Begin Advising</Button>
          <p style={{color:"red", marginTop:"10px"}} className="prog-status ac-warning">You are on Academic Warning</p>
        </div> 
      ) :
      props.show && percentage !== 0 && degPercentage!==0 && !props.loading ? (
        <Link to="/career">
          <Button className="blue-btn">Begin Advising</Button> 
        </Link>
      ) : props.show && degPercentage===0 && !props.loading ? (
        <Link to="/courses">
          <Button className="blue-btn">Begin Advising</Button> 
        </Link>
      ) : props.show && degPercentage!==0 && percentage !==0 && props.loading ? (
        <div>
          <CircularProgress className="circ-prog" size={30}/>
          <Button style={{color:"#A9A7A7", fontWeight:600, backgroundColor:"#E6E6E6", borderColor:"#E6E6E6"}}>Begin Advising</Button>
          <p className="prog-status">Processing your courses...</p> 
        </div>
      ) :  props.show && percentage == 0 ? (
        <div>
          <Button style={{color:"#A9A7A7", fontWeight:600, backgroundColor:"#E6E6E6", borderColor:"#E6E6E6"}}>Begin Advising</Button>
        </div> ) : (null) 
        }
        {
        props.botButtons ? (
          <div>
            <Link to="/courses">
              <Button className="blue-btn" style={{marginBottom: "15px"}}>Back to Courses</Button> 
            </Link>
            <Link to="/finish">
              <Button className="blue-btn">Finish Advising</Button> 
            </Link>
          </div>
        ) : (null)
        }
    </div>
    
        
       <Box component='span' m={7}> </Box>
        <Box component="span" m={0.1}>
        <Typography style={{ fontWeight: 600, fontSize: 20, marginLeft:"20px", marginRight:"20px", textAlign: "center", fontFamily:"Epilogue"}} >Degree Progress:</Typography>
        </Box>
        <br></br>
        <div className="progressBar">
        { degPercentage === 0 && newDeg === 0 ? (
            <div className="progressContainer">
              <ProgressBar now={degPercentage} style={{fontSize:"16px", fontWeight:600, marginLeft:"20px", marginRight:"20px", height:"35px", borderRadius:"45px"}}/>
              <div class="progress-bar-title">0%</div>
            </div>
          ) : degPercentage !== 0 && newDeg === 0 ? (
            <ProgressBar label={`${degPercentage} %`} now={degPercentage} style={{fontSize:"16px", fontWeight:600, height:"35px",  marginLeft:"20px", marginRight:"20px", borderRadius:"45px"}}/>
          ) : degPercentage !== 0 && newDeg !== 0 ? (
            <ProgressBar style={{fontSize:"16px", fontWeight:600, height:"35px", borderRadius:"45px", marginLeft:"20px", marginRight:"20px"}}>
                <ProgressBar label={`${degPercentage} %`} now={degPercentage} key={1} style={{fontSize:"16px", fontWeight:600, height:"35px", borderTopLeftRadius:"45px",  borderBottomLeftRadius:"45px"}}/>
                <ProgressBar now={newDegPercentage} key={2} style={{fontSize:"16px", fontWeight:600, height:"35px", backgroundColor:"#adadad"}}/>
            </ProgressBar>
          ) : (
            <ProgressBar style={{fontSize:"16px", fontWeight:600, height:"35px", borderRadius:"45px", marginLeft:"20px", marginRight:"20px"}}>
              <ProgressBar label={`${newDegPercentage} %`} now={newDegPercentage} key={1} style={{fontSize:"16px", fontWeight:600, marginRight:"20px", height:"35px", borderTopLeftRadius:"45px",  borderBottomLeftRadius:"45px", backgroundColor:"#adadad"}}/>
            </ProgressBar>
          )
        }
    </div>
    <Typography style={{ fontWeight: 600, fontSize: 14, marginLeft:"20px", marginRight:"20px", marginTop: "10px", textAlign: "center", fontFamily:"Epilogue"}} >{props.credits} credits remaining</Typography>
    { newDeg !== 0 ? (
      <Typography style={{ fontWeight: 600, fontSize: 14, marginLeft:"20px", marginRight:"20px", marginTop: "10px", textAlign: "center", fontFamily:"Epilogue", color:"#787878"}} >{difference} credits remaining after passing new courses</Typography>
      ) : (null) }

      </Drawer>
    </div>
  );
}
