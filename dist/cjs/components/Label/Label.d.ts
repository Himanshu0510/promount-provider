import { Component } from "react";
interface ModelLabel {
    name: any;
}
declare class Label extends Component<ModelLabel> {
    constructor(props: any);
    state: {
        profileName: any;
    };
    render(): any;
}
export default Label;
