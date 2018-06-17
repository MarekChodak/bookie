import React from 'react';

class TableEditButton extends React.Component {

  constructor(props) {
    super(props);
    this.editPressed = this.editPressed.bind(this);
  }

  editPressed() {
    this.props.onEdit(this.props.index);
  }

  render(){
    return <div><button onClick={this.editPressed}>Edit</button></div>
  }
}

export default TableEditButton;
