import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { Button, Form, Input, TextArea } from "semantic-ui-react";
import { v1 } from 'uuid';
import { browserHistory } from 'react-router';

class BoardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionCount: 1,
      sections: {}
    };
    this.SEC_COUNT_MAX = 5;
    this.SEC_COUNT_MIN = 1;
  }

  isValidSectionCount(count) {
    return !isNaN(count) && count >= this.SEC_COUNT_MIN  && count <= this.SEC_COUNT_MAX;
  }

  handleSubmit(e) {
    e.preventDefault();
    const uuid = v1()
    this.props.actions.createBoard({...this.state, uuid});
    browserHistory.push(`/board/${uuid}`);
  }

  handleSectionCount(e) {
    let newCount = parseInt(e.target.value);
    newCount = this.isValidSectionCount(newCount)? newCount : 1;
    this.setState({sectionCount: newCount});
  }

  handleSection(e) {
    const { name, value } = e.target;
    this.setState({ sections: {...this.state.sections, [name]: value } });
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <Form id="haha" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Field onChange={this.handleInputChange.bind(this)} name="name" control={Input} label="Name" placeholder="My Board" />
        <Form.Field onChange={this.handleInputChange.bind(this)} name="description" control={TextArea} label="Description" placeholder="This board is created for our retro" />
        <Form.Field
          onChange={this.handleSectionCount.bind(this)}
          control={Input}
          label="Section"
          value={this.state.sectionCount}
          type="number"
          min={this.SEC_COUNT_MIN}
          max={this.SEC_COUNT_MAX}
        />
        {
          Array(this.state.sectionCount).fill().map((_, i) =>
            <Form.Field
              name={`sections${i}`}
              onChange={this.handleSection.bind(this)}
              key={i}
              control={Input}
              label={`Section #${i+1} Title`}
              placeholder="e.g. What went well"
            />
          )
        }
        <Form.Field control={Button}>Go Live</Form.Field>
      </Form>
    );
  }
}

BoardForm.propTypes = {
  actions: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    board: state.board
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardForm);
