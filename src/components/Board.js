import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoardSection from './BoardSection';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Icon, Menu, Modal, Header, Form, TextArea, Button } from 'semantic-ui-react';


export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSectionTitle: '',
      isEditing: false
    };

  }

  wsEventHandler(event) {
    const { message, room } = JSON.parse(event.data)
    console.log(message, room)
  }

  componentWillMount() {
    if(!this.props.board.sections) {
      const boardId = this.props.location.pathname.split('/').pop();
      console.log('running')
      console.log(boardId);
      this.props.actions.joinRoom(boardId)
    }
  }

  closeModal(){
    this.setState({
      isEditing: false,
      newSectionTitle: ''
    })
  }

  startEdit() {
    this.setState({isEditing: true});
  }

  setTitle(e) {
    const title = e.target.value;
    this.setState({newSectionTitle: title});
  }

  addSection() {
    this.props.actions.addSection(this.state.newSectionTitle);
    this.closeModal();
  }

  render() {
    const { sections } = this.props.board;

    return !sections? null : (
      <div className="board">
        {Object.keys(sections).map((key, i) =>
          <BoardSection
            addStickie={this.props.actions.addStickie}
            key={i}
            colorIndex={i}
            boardId={this.props.board.uuid}
            title={sections[key]}
            stickies={this.props.stickies.filter(stickie => stickie.sectionTitle === sections[key]) || []}
          />
        )}

        <Menu icon compact fixed="bottom">

          <Menu.Item>
            <Modal
              basic
              dimmer
              open={this.state.isEditing}
              onClose={this.closeModal.bind(this)}
              trigger={<div onClick={this.startEdit.bind(this)}><Icon name='add' style={{marginRight: '5px'}} />Add Section</div>}
              >
              <Header style={{border: '0'}} icon="pencil" content="Give your section a title:" />
              <Modal.Content>
                <Form>
                  <TextArea
                    style={{background: 'none', color: '#2ecc40', fontSize: '2em', border: '0'}}
                    placeholder="Type here..."
                    onChange={this.setTitle.bind(this)}
                    value={this.state.newSectionTitle}
                    autoHeight />
                </Form>
              </Modal.Content>
              <Modal.Actions style={{border: '0'}}>
                <Button color="green" inverted onClick={this.addSection.bind(this)}>
                  <Icon name="checkmark" /> Done
                </Button>
              </Modal.Actions>
            </Modal>

          </Menu.Item>

          <Menu.Item onClick={this.handleItemClick}>
            <Icon name='upload' style={{marginRight: '5px'}} />
            Export
          </Menu.Item>


          <Menu.Item position='right'>
            <Link to='/'>
              <Icon name='pencil' style={{marginRight: '5px'}} />
              New Board
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
    stickies: state.stickies
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
)(Board);
