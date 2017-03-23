import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button, Modal, Header, Icon, Form, TextArea, Card } from 'semantic-ui-react';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class BoardSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      msg: ''
    };
  }

  layoutChange(data) {
    if (data.length < 1) return

    console.log(data);
    const {x, y, w, h} = data[0];
    console.log(`x:${x}, y:${y}, w:${w}, h:${h}`);
  }

  closeModal(){
    this.setState({
      isEditing: false,
      msg: ''
    })
  }

  startEdit() {
    this.setState({isEditing: true});
  }

  updateMsg(e) {
    const msg = e.target.value;
    this.setState({msg: msg});
  }

  postIt() {
    const { title, addStickie } = this.props;
    const userId = localStorage.getItem('userId');
    // console.log(userId, title, this.state.msg);
    addStickie(userId, title, this.state.msg);
    this.closeModal()
  }

  render() {
    const { stickies } = this.props;
    const layouts = {lg: stickies.map(stickied => stickied.layout)};

    return (
      <div>
        <h3>
          <Modal
            basic
            dimmer="blurring"
            open={this.state.isEditing}
            onClose={this.closeModal.bind(this)}
            trigger={<Button circular icon="plus" onClick={this.startEdit.bind(this)} style={{marginRight: '10px'}}/>}
            >
            <Header style={{border: '0'}} icon="pencil" content="Write down your thoughts:" />
            <Modal.Content>
              <Form>
                <TextArea
                  style={{background: 'none', color: '#2ecc40', fontSize: '2em', border: '0'}}
                  placeholder="Type here..."
                  onChange={this.updateMsg.bind(this)}
                  value={this.state.msg}
                  autoHeight />
              </Form>
            </Modal.Content>
            <Modal.Actions style={{border: '0'}}>
              <Button color="green" inverted onClick={this.postIt.bind(this)}>
                <Icon name="checkmark" /> Done
              </Button>
            </Modal.Actions>
          </Modal>
          Section: {this.props.title}
        </h3>
        <ResponsiveReactGridLayout
          onLayoutChange={this.layoutChange.bind(this)}
          className="layout"
          layouts={layouts}
          // cols={12}
          autoSize={true}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 24, md: 24, sm: 24, xs: 24, xxs: 24}}>
          {
            stickies.map( stickie =>
              <Card key={stickie.stickieId} style={{margin: 0}}>
                <Card.Content>
                  <Card.Description>
                    {stickie.message}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='heart' />
                    0
                  </a>
                </Card.Content>
              </Card>
            )
          }
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}