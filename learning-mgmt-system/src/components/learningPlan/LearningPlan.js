import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

class LearningPlan extends Component {

  render() {
    const {classes} = this.props

    return(
      <div>
        This is the Learning Plan
      </div>
    )
  }
}

export default withStyles(styles)(LearningPlan);