import { Component } from 'react';

declare const DetailData: () => any;

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

export { DetailData, Label };
