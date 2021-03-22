
context('Dev Finances', () => {
  it('Cadastrar entradas', () => {
    // - entender fluxos manualmente
    // - mapear os elementos que vou interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que vou precisar

    cy.visit('https://devfinance-agilizei.netlify.app')

    cy.get('#data-table tbody tr').should('have.length', 0) // tabela vazia

    cy.get('#transaction .button').click() //id + classe
    cy.get('#description').type('Presente') //id
    cy.get('[name=amount]').type(30) //atributo...
    cy.get('[type=date]').type('2021-03-21') //.atributos
    cy.get('button').contains('Salvar').click() //tipo e valor
  
  });

  // Cadastrar saidas
  it('Cadastrar saidas', () => {

    cy.get('#data-table tbody tr').should('have.length', 1)

    cy.get('#transaction .button').click()
    cy.get('#description').type('Presente')
    cy.get('[name=amount]').type(-30)
    cy.get('[type=date]').type('2021-03-30')
    cy.get('button').contains('Salvar').click()
  })
  // Remover entradas e saidas
})