import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import PeopleIcon from '@material-ui/icons/People';
import SortIcon from '@material-ui/icons/Sort';

import Fab from '@material-ui/core/Fab';
import SchoolIcon from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { getLearningActive } from './actions';
import { learningEntry } from './apis/learning.js';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  addButton: {
    "right": "20px",
    "bottom": "20px",
    "position": "absolute"
  }
});

function formatDate(date) {
  //format date from yyyy-mm-dd to dd/mm/yyyy
  return date.substring(8,10) + '/' + date.substring(5,7) + '/' + date.substring(0,4)
}

class LearningPlan extends Component {
  state = {
    tasks: []
  }

  async markAsComplete(start_date, end_date, id) {
    console.log('Hello');
    const headers = {
      headers: {
        'Content-Type': "application/json",
      }
    };
    //body
    const body = {
        "start_date": start_date,
        "end_date": end_date,
        "completed": true,
        "id": id
    }
    await learningEntry.put('/' + id,body,headers)
    await this.props.getLearningActive();
    this.setState({tasks: this.props.plan.activePlan.entries})
  }

  async componentDidMount() {
    await this.props.getLearningActive();
    this.setState({tasks: this.props.plan.activePlan.entries})
  }

  onClick() {
    console.log('this was clicked')
  }


  render() {
    const {classes} = this.props
    
    var buttonSpecialisation = <CodeIcon />
    var buttonConsulting = <PeopleIcon />
    var buttonMethodology = <SortIcon />
    
    return(
      <React.Fragment>
        {this.state.length < 1 &&
        <div>You have no entries in your learning plan.</div>}
        <VerticalTimeline>
          {this.state.tasks.map((task) => (
            <VerticalTimelineElement
              date={formatDate(task.start_date) + " to " + formatDate(task.end_date)}
              className="vertical-timeline-element--work"
              contentStyle={(task.completed == true) ? ({background: '#86BC25', color: '#fff'}) : ({background: '#E96868',color: '#fff'})}
              contentArrowStyle={{ borderRight: '7px solid  #86BC25' }}
              iconStyle={{ background: '#86BC25', color: '#fff' }}
              icon={ (task.pillar=='Specialisation') ? (buttonSpecialisation) : ((task.pillar=='Consulting') ? (buttonConsulting) : buttonMethodology) }
              key={task.id}
              position={"right"}
            >
              <h3 className="vertical-timeline-element-course">{task.course}</h3>
              {/* <div class="font-icon-wrapper" onClick={this.fontIconClick}>
              <IconButton iconClassName="Mark as Complete" />
              </div> */}
              {task.completed == false &&
              <Button 
              variant="contained" onClick={() => {this.markAsComplete(task.start_date,task.end_date,task.id)}}>
              Mark as Complete
              </Button> }
              {/* this.markAsComplete(task.start_date,task.end_date,task.id */}
              <h4 className="vertical-timeline-element-subtitle">{task.pillar}</h4>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        <h1> KEY </h1>
        <p>{ buttonMethodology } Methodology </p>
        <p>{ buttonConsulting } Consulting </p>
        <p>{ buttonSpecialisation } Specialisation</p>

        <Fab color="secondary" aria-label="add" className={classes.addButton}>
          <AddIcon onClick={this.onClick}/>
        </Fab>
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    plan: state.plan,
    login: state.login
  }
}

export default compose(
  connect(mapStateToProps, { getLearningActive }),
  withStyles(styles)
)(LearningPlan);