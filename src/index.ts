import * as _ from 'lodash';

function greetingElement(): Element {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'from', "'threejs-playground'", '!'], ' ');
    return element;
}

document.body.appendChild(greetingElement());
