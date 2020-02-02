import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { getLearningActive } from './actions';

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
    tasks: [],
    openedForm: false
  }

  async componentDidMount() {
    await this.props.getLearningActive();
    this.setState({tasks: this.props.plan.activePlan.entries})
  }

  onClick() {
    console.log('this was clicked')
    if (this.state.openForm) {
      this.setState({openedForm: false});
    } else {
      this.setState({openedForm: true});
    }
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
              key={task.id}
              position={"right"}
            >
              <h3 className="vertical-timeline-element-course">{task.course}</h3>
              <h4 className="vertical-timeline-element-subtitle">{task.pillar}</h4>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        <Fab color="secondary" aria-label="add" className={classes.addButton}>
          <AddIcon onClick={this.onClick}/>
        </Fab>
        <ClickAwayListener>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.openedForm}
            onClose={this.onClick}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            
          </Modal>
        </ClickAwayListener>
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