import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import SchoolIcon from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { getLearningActive } from '../actions';
import { learningEntry } from '../apis/learning.js';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
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
    .then(
      async (response) => {
        console.log(response)
        await this.props.getLearningActive();
        this.setState({tasks: this.props.plan.activePlan.entries})
      }
    )
  }

  async componentDidMount() {
    await this.props.getLearningActive();
    this.setState({tasks: this.props.plan.activePlan.entries})
  }

  render() {
    const {classes} = this.props

    return(
      <React.Fragment>
        {this.state.tasks.length < 1 &&
        <div>You have no entries in your learning plan.</div>}
        <VerticalTimeline>
          {this.state.tasks.map((task) => (
            <VerticalTimelineElement
              date={formatDate(task.start_date) + " to " + formatDate(task.end_date)}
              className="vertical-timeline-element--work"
              contentStyle={{ background: '#86BC25', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  #86BC25' }}
              iconStyle={{ background: '#86BC25', color: '#fff' }}
              icon={<SchoolIcon />}
              //add button that calls markAsComplete(task.start_date,task.end_date,task.id)
            >
              <Button 
              variant="contained" color="primary">
              Mark as Complete
              </Button>
              <h3 className="vertical-timeline-element-course">{task.course}</h3>
              <h4 className="vertical-timeline-element-subtitle">{task.pillar}</h4>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    plan: state.plan
  }
}

export default compose(
  connect(mapStateToProps, { getLearningActive }),
  withStyles(styles)
)(LearningPlan);