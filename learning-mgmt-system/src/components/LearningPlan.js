import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import PeopleIcon from '@material-ui/icons/People';
import SortIcon from '@material-ui/icons/Sort';

import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import SchoolIcon from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { getLearningActive, getAllTasks } from './actions';
import { learningEntry } from './apis/learning.js';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  addButton: {
    "right": "35px",
    "bottom": "35px",
    "position": "fixed"
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
});

function formatDate(date) {
  //format date from yyyy-mm-dd to dd/mm/yyyy
  return date.substring(8,10) + '/' + date.substring(5,7) + '/' + date.substring(0,4)
}

function formatCalendarDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth()).padStart(2, '0') 
  const year = String(date.getFullYear());
  return year + '-' + month + '-' + day;
}

class LearningPlan extends Component {
  state = {
    userTasks: [],
    tasks: [],
    openedForm: false,
    selectedTask: "",
    startDate: new Date(),
    endDate: new Date()
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
    this.setState({userTasks: this.props.plan.activePlan.entries})
  }

  addTask = async () => {
    const headers = {
      headers: {
        'Content-Type': "application/json",
      }
    };

    const body = {
      "task": this.state.selectedTask,
      "start_date": formatCalendarDate(this.state.startDate),
      "end_date": formatCalendarDate(this.state.endDate)
    }

    await learningEntry.post('/add/' + this.props.login.email, body, headers)
    await this.props.getLearningActive();
    this.handleOpenForm();
    this.setState({userTasks: this.props.plan.activePlan.entries || []})
  }

  async componentDidMount() {
    await this.props.getLearningActive();
    this.setState({userTasks: this.props.plan.activePlan.entries || []})
    await this.props.getAllTasks();
    this.setState({tasks: this.props.task.allTasks.entries || []})
  }

  handleOpenForm = () => {
    console.log('this was clicked');
    console.log(this.state);
    if (this.state.openedForm) {
      this.setState({openedForm: false, selectedTask: ""});
    } else {
      this.setState({openedForm: true});
    }
  }

  handleSelectTask = (e) => {
    console.log(e);
    this.setState({selectedTask: e.target.value})
  }

  handleStartDate = (e) => {
    this.setState({startDate: e});
  }

  handleEndDate = (e) => {
    this.setState({endDate: e})
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
          {this.state.userTasks.map((task) => (
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
              {/* <div class="font-icon-wrapper" onClick={this.fontIconClick}>
              <IconButton iconClassName="Mark as Complete" />
              </div> */}
              {/* this.markAsComplete(task.start_date,task.end_date,task.id */}
              <h4 className="vertical-timeline-element-subtitle">{task.pillar}</h4>
              {task.completed == false &&
              <Button 
              variant="contained" onClick={() => {this.markAsComplete(task.start_date,task.end_date,task.id)}}>
              Mark as Complete
              </Button> }
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        <h1> KEY </h1>
        <p>{ buttonMethodology } Methodology </p>
        <p>{ buttonConsulting } Consulting </p>
        <p>{ buttonSpecialisation } Specialisation</p>

        <Fab color="secondary" aria-label="add" className={classes.addButton}>
          <AddIcon onClick={this.handleOpenForm}/>
        </Fab>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.openedForm}
          onClose={this.handleOpenForm}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={this.state.openedForm}>
            <div className={classes.paper}>
                <h4>Add a new learning task</h4>
                <TextField
                  id="select-task"
                  select
                  label="Task"
                  value={this.state.selectedTask}
                  onChange={(e)=>this.handleSelectTask(e)}
                >
                  {this.state.tasks.map(option => (
                    <MenuItem key={option.name} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                  }
                </TextField>
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    value={this.state.startDate}
                    onChange={(e) => this.handleStartDate(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="End Date"
                    value={this.state.endDate}
                    onChange={(e) => this.handleEndDate(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <br />
                <Button 
                  variant="contained"
                  onClick={this.addTask}
                >
                  Add
                </Button>
            </div>
          </Fade>
        </Modal>   
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    plan: state.plan,
    login: state.login,
    task: state.task
  }
}

export default compose(
  connect(mapStateToProps, { getLearningActive, getAllTasks }),
  withStyles(styles)
)(LearningPlan);