import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import NavBar from './NavBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const deloitteTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#86BC25"
    }
  }  
})

/*
const ProtectedRoute = ({ isAllowed, ...props}) => {
  if (isAllowed) {
    return <Route {...props} />
  } else {
    return <Redirect to="/login"/>
  }
}
*/

function App() {
  const classes = useStyles();

  /*
<Switch>
            <Route path="/" component={LearningPlan}/>
            <Route exact path="/calendar" component={Calendar}/>
          </Switch>
  */

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={deloitteTheme}>
        <CssBaseline>
          <NavBar />
        </CssBaseline>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
