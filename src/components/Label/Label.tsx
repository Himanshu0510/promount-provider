import React, { Component } from "react";

interface ModelLabel {
  name: any;
}
class Label extends Component<ModelLabel> {
  constructor(props: any) {
    super(props);
  }
  state = {
    profileName: this.props.name,
  };
  render(): any {
    return (
      <>
        <h2>Welcome {this.state.profileName}!</h2>
      </>
    );
  }
}

export default Label;
