describe('Home page e2e test', () => {
  it('should display map correctly', () => {
    cy.visit('/');
    cy.get('[data-testid="map-container"]').should('exist');
  });

  it('should display the control panel and statistiques correctly', () => {
    cy.visit('/');
    cy.get('[data-testid="control-panel"]').should('exist');
    cy.get('[data-testid="statistiques"]').should('exist');
  });

  // TODO: all other functionalities and use cases
});
