import {HeaderComponent} from "../../components/header/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponent(this.parent)
        header.render()
    }
}