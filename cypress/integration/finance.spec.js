/// <reference types="cypress" />

/// cy.viewport
/// arquivos de config
/// configs por linha de comando: npx cypress open --config viewportWidth=411, viewportHeight=823

context('Finances', () => {

    // hooks
    // trechos que executam antes e depois do teste
    // before -> antes de todos os testes
    // beforeEach -> antes de cada testes
    // after -> depois de todos os testes
    // afterEach -> depois de cada testes

    beforeEach(() => {

      cy.visit('https://devfinance-agilizei.netlify.app')
      // cy.viewport(411, 582)
      cy.get('#data-table tbody tr').should('have.length', 0) // tabela vazia
    })

  it('Cadastrar entradas', () => {

    // - entender fluxos manualmente
    // - mapear os elementos que vou interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que vou precisar

    cy.get('#transaction .button').click() //id + classe
    cy.get('#description').type('Presente') //id
    cy.get('[name=amount]').type(30) //atributo...
    cy.get('[type=date]').type('2021-03-21') //.atributos
    cy.get('button').contains('Salvar').click() //tipo e valor

    cy.get('#data-table tbody tr').should('have.length', 1)
  
  });

  // Cadastrar saidas
  it('Cadastrar saidas', () => {

    cy.get('#transaction .button').click()
    cy.get('#description').type('Presente')
    cy.get('[name=amount]').type(-30)
    cy.get('[type=date]').type('2021-03-30')
    cy.get('button').contains('Salvar').click()
  })


  // Remover entradas e saidas
  it('Remover entradas e saidas', () => {

    const entrada = 'Total'
    const saida = 'Kindle'

    cy.get('#transaction .button').click()
    cy.get('#description').type(entrada)
    cy.get('[name=amount]').type(100)
    cy.get('[type=date]').type('2021-03-24')
    cy.get('button').contains('Salvar').click()

    cy.get('#transaction .button').click()
    cy.get('#description').type(saida)
    cy.get('[name=amount]').type(-50)
    cy.get('[type=date]').type('2021-03-24')
    cy.get('button').contains('Salvar').click()

    // exclusão 1
    cy.get('td.description') // cy.get para especificar onde procurar o conteudo
    .contains(entrada)
    .parent()
    .find('img[onclick*=remove]')
    .click()

    // exclusão 2: buscar todos os irmão, e buscar o que tem img = attr
    cy.get('td.description')
    .contains(saida)
    .siblings() // navega pelos elementos irmão
    .children('img[onclick*=remove]') // encontra o filho
    .click()

    cy.get('#data-table tbody tr').should('have.length', 0)
  });


  it.only('Validar saldo com varias transações', () => {

  const entrada = 'Total'
    const saida = 'Kindle'

    cy.get('#transaction .button').click()
    cy.get('#description').type(entrada)
    cy.get('[name=amount]').type(127)
    cy.get('[type=date]').type('2021-03-24')
    cy.get('button').contains('Salvar').click()

    cy.get('#transaction .button').click()
    cy.get('#description').type(saida)
    cy.get('[name=amount]').type(-61)
    cy.get('[type=date]').type('2021-03-24')
    cy.get('button').contains('Salvar').click()


    
    // capturar as linhas com as transações e colunas com valores
    // capturar textos dessas colunas
    // formatar esses valores das linhas
    
    // capturar o texto do total
    // comparar o somatorio de entradas e despesas com o total

    cy.get('#data-table tbody tr')
    .each(($el, index, $list) => {

        cy.get($el).find('td.income, td.expense')
          .invoke('text').then(text => {
            cy.log(text)
          })
    })


  });





  });