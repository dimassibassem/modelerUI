import React from 'react';
import useShowToolbar from '@/hooks/useShowToolbar';

describe('useShowToolbar', () => {
  it('should setShowToolbar to true after 2 seconds when isHover is true and dragging is false', () => {
    const Component = () => {
      const [showToolbar, setShowToolbar] = React.useState(false);
      const isHover = true;
      const dragging = false;
      useShowToolbar(isHover, dragging, setShowToolbar);
      return <div data-testid="toolbar">{showToolbar.toString()}</div>;
    };
    cy.mount(<Component />);
    cy.get('[data-testid="toolbar"]').should('have.text', 'false');
    cy.wait(2000);
    cy.get('[data-testid="toolbar"]').should('have.text', 'true');
  });

  it('should not setShowToolbar to true when dragging is true', () => {
    const Component = () => {
      const [showToolbar, setShowToolbar] = React.useState(false);
      const isHover = true;
      const dragging = true;
      useShowToolbar(isHover, dragging, setShowToolbar);
      return <div data-testid="toolbar">{showToolbar.toString()}</div>;
    };
    cy.mount(<Component />);
    cy.get('[data-testid="toolbar"]').should('have.text', 'false');
    cy.wait(2000);
    cy.get('[data-testid="toolbar"]').should('have.text', 'false');
  });

  it('should not setShowToolbar to true when isHover is false', () => {
    const Component = () => {
      const [showToolbar, setShowToolbar] = React.useState(false);
      const isHover = false;
      const dragging = false;
      useShowToolbar(isHover, dragging, setShowToolbar);
      return <div data-testid="toolbar">{showToolbar.toString()}</div>;
    };
    cy.mount(<Component />);
    cy.get('[data-testid="toolbar"]').should('have.text', 'false');
    cy.wait(2000);
    cy.get('[data-testid="toolbar"]').should('have.text', 'false');
  });
});
