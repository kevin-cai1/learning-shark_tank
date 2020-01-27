import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link, Switch, Route } from 'react-router-dom';
import LearningPlan from './LearningPlan';
import CalendarView from './CalendarView'

const styles = (theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  heading: {
    'padding-right': '32px'
  },
  content: {
    paddingTop: theme.spacing(12)
  }
})

class NavBar extends Component {
  state = {
    path: '/' + window.location.hash.substr(1).split('/')[1] || ''
  };

  handleClick = (value) => {
    this.setState({path: value});
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.heading}>
                DPE Learning
              </Typography>
              <Tabs
                value={this.state.path}
                indicatorColor="secondary"
              >
                <Tab 
                  label="Learning Plan" 
                  value="/"
                  component={Link} to="/" 
                  onClick = {() => this.handleClick('/')}/>
                <Tab 
                  label="Calendar"
                  value="/calendar"
                  component={Link} to="/calendar"
                  onClick = {() => this.handleClick('/calendar')} />
              </Tabs>
            </Toolbar>
          </AppBar>
        </div>
        <Switch>
          <Route exact path="/">
            <div className={classes.content}>
              <LearningPlan />
            </div>
          </Route>
          <Route exact path="/calendar">
            <div className={classes.content}>
              <CalendarView />
            </div>
          </Route>
        </Switch>
      </React.Fragment>
    )
  }
};

export default withStyles(styles)(NavBar);