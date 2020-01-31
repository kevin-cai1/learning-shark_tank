import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SchoolIcon from '@material-ui/icons/School';
<<<<<<< HEAD:learning-mgmt-system/src/components/learningPlan/LearningPlan.js
import Button from '@material-ui/core/Button';
=======
import AddIcon from '@material-ui/icons/Add';
>>>>>>> master:learning-mgmt-system/src/components/LearningPlan.js

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

<<<<<<< HEAD:learning-mgmt-system/src/components/learningPlan/LearningPlan.js
import { getLearningActive } from '../actions';
import { learningEntry } from '../apis/learning.js';
=======
import { getLearningActive } from './actions';
>>>>>>> master:learning-mgmt-system/src/components/LearningPlan.js

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

  onClick() {
    console.log('this was clicked')
  }

  render() {
    const {classes} = this.props

    return(
      <React.Fragment>
        {this.state.length < 1 &&
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
<<<<<<< HEAD:learning-mgmt-system/src/components/learningPlan/LearningPlan.js
              //add button that calls markAsComplete(task.start_date,task.end_date,task.id)
=======
              key={task.id}
              position={"right"}
>>>>>>> master:learning-mgmt-system/src/components/LearningPlan.js
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
        <Fab color="secondary" aria-label="add" className={classes.addButton}>
          <AddIcon onClick={this.onClick}/>
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          
        </Modal>
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