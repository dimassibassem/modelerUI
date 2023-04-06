import './commands';
import 'cypress-real-events/support';
import { mount } from 'cypress/react18';
import { XYPosition } from 'reactflow';
import 'reactflow/dist/style.css';
import '@/App.css';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      // drag: (selector: string, toPosition: XYPosition) => Cypress.Chainable<JQuery<HTMLElement>>;
      dragPane: ({ from, to }: { from: XYPosition; to: XYPosition }) => Cypress.Chainable<JQuery<HTMLElement>>;
      zoomPane: (wheelDelta: number) => Cypress.Chainable<JQuery<HTMLElement>>;
      isWithinViewport: () => Cypress.Chainable<JQuery<HTMLElement>>;
      isOutsideViewport: () => Cypress.Chainable<JQuery<HTMLElement>>;
      dragAndDrop: (selector: JQuery<HTMLElement>,startPoint:number) => Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
Cypress.Commands.add('mount', mount);
