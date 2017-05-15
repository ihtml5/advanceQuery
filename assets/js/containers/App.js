import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as advanceActions from '../actions'
import { bindActionCreators } from 'redux'
// React component
class App extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render(){
    const { current, actions} = this.props;
    return (
      <div>
        dddd
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    current: state.current,
    data: state.data
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tableActions,dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
