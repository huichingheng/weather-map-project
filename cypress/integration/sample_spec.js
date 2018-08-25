describe("First successful test", () => {
  it("Does not do much", () => {
    expect(1).to.equal(1);
  });
});

describe("first real test", () => {
  it("Visits Weather App", () => {
      cy.visit('https://kod2nd-weather-app.netlify.com/')
    //   cy.contains('Weather App')
  });
});
