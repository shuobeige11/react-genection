import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import * as TodoActions from '../../actions'

import styles from './main.scss'

class Test extends Component {
  render() {
    const { todos, actions } = this.props
    return (
      <div id="test">
        <Header addTodo={ actions.addTodo } />
        <div className="red">333311</div>
      </div>
    )
  }
}

Test.propTypes = {
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
)(Test)
