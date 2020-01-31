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

import { getLearningActive } from './actions';
import { getReportAll } from './actions';



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

class Reporting extends Component {
  state = {
    tasks: []
  }

  async componentDidMount() {
    await this.props.getReportAll();
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
          <h1>Reporting</h1>
          {this.state.tasks.map((task) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: '#86BC25', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  #86BC25' }}
              iconStyle={{ background: '#86BC25', color: '#fff' }}
              icon={ (task.pillar=='Specialisation') ? (buttonSpecialisation) : ((task.pillar=='Consulting') ? (buttonConsulting) : buttonMethodology) }
              key={task.id}
              position={"right"}
            >
              <h2 className="vertical-timeline-element-course">{task.course_name}</h2>

              <h3 className="vertical-timeline-element-course">User Count: {task.count_users}</h3>

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
    plan: state.plan
  }
}

export default compose(
  connect(mapStateToProps, { getReportAll }),
  withStyles(styles)
)(Reporting);