/// <reference types="cypress" />

import config from '../../../config';
import { Days, days } from '../../../markdowns/td';

const baseUrl = 'https://luby-timesheet.azurewebsites.net';

describe('Add Appointment', () => {
  // it('Open create page', () => {
  //   cy.visit(`${baseUrl}/`);
  //
  //   cy.get('#Login').type(config.timesheet.login);
  //   cy.get('#Password').type(config.timesheet.password);
  //
  //   cy.get('.btn').click();
  //
  //   cy.location('pathname').should('include', '/Home/Index');
  // });

  it('Insert one Appointment create page', () => {
    // Login
    cy.visit(`${baseUrl}/`);

    cy.get('#Login').type(config.timesheet.login);
    cy.get('#Password').type(config.timesheet.password);

    cy.get('.btn').click();

    cy.location('pathname').should('include', '/Home/Index');

    // Create
    cy.visit(`${baseUrl}/Worksheet/Read`);

    cy.wrap(days).each((day: Days) => {
      cy.wrap(day.time).each((time: Days['time'][number]) => {
        cy.wait(500);

        cy.get('#WorksheetMultiple_0__InformedDate').type(day.date);

        cy.get(
          '#contents > .col-md-9 > :nth-child(2) > .col-md-11 > .note-editor > .note-editing-area > .note-editable > p'
        ).type(day.description);
        cy.get(
          '#contents > .col-md-9 > :nth-child(1) > :nth-child(1) > .form-control'
        ).select(day.client);
        cy.get(
          '#contents > .col-md-9 > :nth-child(1) > :nth-child(2) > .form-control'
        ).select(day.project);
        cy.get(
          '#contents > .col-md-9 > :nth-child(1) > .col-md-3 > .form-control'
        ).select(day.category);
        cy.get('#WorksheetMultiple_0__StartTime').type(time.initial);
        cy.get('#WorksheetMultiple_0__EndTime').type(time.final);

        cy.get('#btnSave').click();

        cy.wait(2000);
      });
    });

    // const doIt = (day: Days, time: number): void => {
    //   cy.get('#WorksheetMultiple_0__InformedDate').type(day.date);
    //   cy.get(
    //     '#contents > .col-md-9 > :nth-child(1) > :nth-child(1) > .form-control'
    //   ).select(day.client);
    //   cy.get(
    //     '#contents > .col-md-9 > :nth-child(1) > :nth-child(2) > .form-control'
    //   ).select(day.project);
    //   cy.get(
    //     '#contents > .col-md-9 > :nth-child(1) > .col-md-3 > .form-control'
    //   ).select(day.category);
    //   cy.get('#WorksheetMultiple_0__StartTime').type(day.time[time].initial);
    //   cy.get('#WorksheetMultiple_0__EndTime').type(day.time[time].final);
    //   cy.get(
    //     '#contents > .col-md-9 > :nth-child(2) > .col-md-11 > .note-editor > .note-editing-area > .note-editable > p'
    //   ).type(day.description);
    //   cy.get('#btnSave').click();
    //
    //   // if (day.time[time + 1]) doIt(day, time + 1);
    // };

    // cy.wrap(days).each((day: Days) => {
    //   cy.wrap(day.time).each((_, index) => {
    //     doIt(day, index);
    //   });
    // });

    // days.forEach((day) => {
    //   cy.wrap(day.time).each((_, timeIndex) => {
    //     cy.then(() => doIt(day, timeIndex));
    //   });
    // });

    // days.forEach((day) => {
    //   day.time.forEach((_, index) => {
    //     doIt(day, index);
    //   });
    // });

    // const doLoop = (init: number): void => {
    //   doIt(days[init], 0);
    //
    //   if (days[init + 1]) doLoop(init + 1);
    // };
    //
    // doLoop(0);
  });
});
