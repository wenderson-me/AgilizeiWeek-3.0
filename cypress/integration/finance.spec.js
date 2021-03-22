
context('Dev Finances', () => {
  it('Cadastrar entradas', () => {
    // - entender fluxos manualmente
    // - mapear os elementos que vou interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que vou precisar

    cy.visit('https://devfinance-agilizei.netlify.app')

    cy.get('#transaction .button').click() //id + classe
    cy.get('#description').type('Presente') //id
    cy.get('[name=amount]').type(12) //atributo...
    cy.get('[type=date]').type('2021-03-21') //.atributos
    cy.get('button').contains('Salvar').click() //tipo e valor
  
  });

  // Cadastrar saidas
  // Remover entradas e saidas
})