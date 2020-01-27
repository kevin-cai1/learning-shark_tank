import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

class LearningPlan extends Component {

  componentDidMount() {
    
  }

  render() {
    const {classes} = this.props

    return(
      <VerticalTimeline>
      </VerticalTimeline>
    )
  }
}

export default withStyles(styles)(LearningPlan);