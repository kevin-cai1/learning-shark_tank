import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import CodeIcon from '@material-ui/icons/Code';
import PeopleIcon from '@material-ui/icons/People';
import SortIcon from '@material-ui/icons/Sort';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import 'react-vertical-timeline-component/style.min.css';

import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { buildStyles } from 'react-circular-progressbar';

import { getReportAll } from './actions';
import { getReportAllByPillar } from './actions';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  addButton: {
    "right": "20px",
    "bottom": "20px",
    "position": "absolute"
  }
});

class Reporting extends Component {
  state = {
    pillar: [],
    all: []
  }

async componentDidMount() {
  await this.props.getReportAllByPillar();
  this.setState({pillar: this.props.plan.activePlan.entries})
  await this.props.getReportAll();
  this.setState({all: this.props.plan.activePlan.entries})
}

onClick() {
  console.log('this was clicked')
}

render() {
  const {classes} = this.props
  
  var buttonSpecialisation = <CodeIcon />
  var buttonConsulting = <PeopleIcon />
  var buttonMethodology = <SortIcon />
  const value = 11
  
  return(
    <React.Fragment>

      {this.state.length < 1 &&
      <div>You have no entries in your learning plan.</div>}
      {this.state.pillar.map((task) => (
        <div style= {{float: "left", margin:"50px"}} >
          <CircularProgressbarWithChildren
            value= {[task.count_users]}
            maxValue = {value}
            styles={buildStyles({
              pathColor: '#86BC25',
              padding: '50px',
              pathTransitionDuration: 3,
            }) }
          >
          <div style={{ fontSize: 20, marginTop: -5 }}>
            <center>
              {(task.pillar=='Specialisation') ? (buttonSpecialisation) : ((task.pillar=='Consulting') ? (buttonConsulting) : buttonMethodology) } <br />
              <strong>{task.pillar}</strong>
              <br /> 
              {task.count_users} {(task.count_users=='1') ? ('user') : ('users') }            
          
            </center>
          </div>
        </CircularProgressbarWithChildren></div>
      ))}
      <br />
      
      <table align="center" style={{borderRadius: '15px', float:"right", marginLeft: "100px", marginRight:"100px"}}>
        <thead>
          <td><h2>Pillar</h2></td>
          <td><h2><center>Task Name</center></h2></td>
          <td><h2>Staff</h2></td>
        </thead>
        {this.state.all.map((task) => (
          <tr style={{background: '#86BC25', borderWidth: '50px'}}>
            <td style={{padding: '10px', borderRadius: '10px'}}>{(task.pillar=='Specialisation') ? (buttonSpecialisation) : ((task.pillar=='Consulting') ? (buttonConsulting) : buttonMethodology) }</td>
            <td style={{padding: '10px', borderRadius: '10px'}}>{task.course_name}</td>
            <td style={{padding: '10px', borderRadius: '10px'}}>{task.count_users}</td>
          </tr>
        ))}
      </table>
      <div style= {{float: "left", margin:"50px"}}>
        <h1> KEY </h1>
          <p>{ buttonMethodology } Methodology </p>
          <p>{ buttonConsulting } Consulting </p>
          <p>{ buttonSpecialisation } Specialisation</p>
      </div>
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
connect(mapStateToProps, { getReportAllByPillar, getReportAll }),
withStyles(styles)
)(Reporting);