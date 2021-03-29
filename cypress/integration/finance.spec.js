/// <reference types="cypress" />
import { format, prepareLocalStorage } from "../support/utils";

/// cy.viewport
/// arquivos de config
/// configs por linha de comando: npx cypress open --config viewportWidth=411, viewportHeight=823

context("Finances", () => {
  // hooks
  // trechos que executam antes e depois do teste
  // before -> antes de todos os testes
  // beforeEach -> antes de cada testes
  // after -> depois de todos os testes
  // afterEach -> depois de cada testes

  beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app", {
      onBeforeLoad: (win) => {
        prepareLocalStorage(win); //localStorege util.js
      },
    });
    // cy.viewport(411, 582)
    //cy.get("#data-table tbody tr").should("have.length", 0); // tabela vazia
  });

  it("Cadastrar entradas", () => {
    // - entender fluxos manualmente
    // - mapear os elementos que vou interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que vou precisar

    cy.get("#transaction .button").click(); //id + classe
    cy.get("#description").type("Presente"); //id
    cy.get("[name=amount]").type(30); //atributo...
    cy.get("[type=date]").type("2021-03-21"); //.atributos
    cy.get("button").contains("Salvar").click(); //tipo e valor

    cy.get("#data-table tbody tr").should("have.length", 3);
  });

  // Cadastrar saidas
  it("Cadastrar saidas", () => {
    cy.get("#transaction .button").click();
    cy.get("#description").type("Arroz");
    cy.get("[name=amount]").type(-30);
    cy.get("[type=date]").type("2021-03-30");
    cy.get("button").contains("Salvar").click();

    cy.get("#data-table tbody tr").should("have.length", 3);
  });

  // Remover entradas e saidas
  it("Remover entradas e saidas", () => {
    // exclusão 1
    cy.get("td.description") // cy.get para especificar onde procurar o conteudo
      .contains("Mesada")
      .parent()
      .find("img[onclick*=remove]")
      .click();

    // exclusão 2: buscar todos os irmão, e buscar o que tem img = attr
    cy.get("td.description")
      .contains("Suco de Fruta")
      .siblings() // navega pelos elementos irmão
      .children("img[onclick*=remove]") // encontra o filho
      .click();

    cy.get("#data-table tbody tr").should("have.length", 0);
  });

  it("Validar saldo com varias transações", () => {
    // capturar as linhas com as transações e colunas com valores
    // capturar textos dessas colunas
    // formatar esses valores das linhas

    // somar o valores de entradas e saidas

    // capturar o texto do total
    // comparar o somatorio de entradas e despesas com o total

    let incomes = 0;
    let expenses = 0;

    cy.get("#data-table tbody tr").each(($el, index, $list) => {
      cy.get($el)
        .find("td.income, td.expense")
        .invoke("text")
        .then((text) => {
          if (text.includes("-")) {
            expenses = expenses + format(text);
          } else {
            incomes = incomes + format(text);
          }

          cy.log("entradas", incomes);
          cy.log("saidas", expenses);
        });
    });

    cy.get("#totalDisplay")
      .invoke("text")
      .then((text) => {
        cy.log("valor total", format(text));

        let formattedTotalDisplay = format(text);
        let expectedTotal = incomes + expenses;

        expect(formattedTotalDisplay).to.eq(expectedTotal);
      });
  });
});
