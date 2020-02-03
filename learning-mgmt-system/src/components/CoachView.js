import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import PeopleIcon from '@material-ui/icons/People';
import SortIcon from '@material-ui/icons/Sort';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { getCoacheeTask } from './actions';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  addButton: {
    "right": "20px",
    "bottom": "20px",
    "position": "absolute"
  },
  timeline: {
    "float": "left",
    "width": "50%",
    "padding-left": "20px",
    "padding-right": "20px"
  }
});

function formatDate(date) {
  //format date from yyyy-mm-dd to dd/mm/yyyy
  return date.substring(8,10) + '/' + date.substring(5,7) + '/' + date.substring(0,4)
}

class CoachView extends Component {
  state = {
    coachees: []
  }

  async componentDidMount() {
    await this.props.getCoacheeTask();
    this.setState({coachees: this.props.coach.coachees.users})
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
        <div>You have no coachees :(</div>}
        {this.state.coachees.map((coachee) => (
          <VerticalTimeline
            className={classes.timeline}
          >
            <h1>{coachee.id}</h1>
            {coachee.entries.map((task) => (
              <VerticalTimelineElement
                date={formatDate(task.start_date) + " to " + formatDate(task.end_date)}
                className="vertical-timeline-element--work"
                contentStyle={(task.completed == true) ? ({background: '#86BC25', color: '#fff'}) : ({background: '#E96868',color: '#fff'})}
                contentArrowStyle={(task.completed == true) ? { borderRight: '7px solid  #86BC25' } : ({ borderRight: '7px solid #E96868'})}
                iconStyle={{ background: '#86BC25', color: '#fff' }}
                icon={ (task.pillar=='Specialisation') ? (buttonSpecialisation) : ((task.pillar=='Consulting') ? (buttonConsulting) : buttonMethodology) }
                key={task.id}
                position={"right"}
              >
                <h3 className="vertical-timeline-element-course">{task.course}</h3>
                <h4 className="vertical-timeline-element-subtitle">{task.pillar}</h4>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        ))}
        <br />
        <h1> KEY </h1>
        <p>{ buttonMethodology } Methodology </p>
        <p>{ buttonConsulting } Consulting </p>
        <p>{ buttonSpecialisation } Specialisation</p>
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    coach: state.coach
  }
}

export default compose(
  connect(mapStateToProps, { getCoacheeTask }),
  withStyles(styles)
)(CoachView);