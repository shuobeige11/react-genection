import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
//import Datepicker from '../../components/Select/Datepicker'
import * as TodoActions from '../../actions'
import styles from './main.scss'

class Test1 extends Component {
  render() {
    const { todos, actions } = this.props
    return (
      <div id="test2">
        <Header addTodo={actions.addTodo} />
        <div className="red">222</div>
      </div>
    )
  }
}

Test1.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test1)
