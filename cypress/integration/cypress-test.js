describe("The home page", () => {
  it("Loads successfully", () => {
    cy.visit("/");
  });
  it("Has Title 'Weather App'", () => {
    cy.contains("Weather App");
  });
});

describe("Input box", () => {
  it("Should be visible", () => {
    expect(cy.get("input")).to.exist;
  });
  it("should accept text input", () => {
    cy.wait(2000);
    cy.get("input").type("sentosa");
    cy.get("input").should("have.value", "sentosa");
  });
  it("should display a marker on the map and display selected location details when suggestion a suggestion is selected", () => {
    cy.wait(1000);
    cy.get("input").type("{downarrow}{enter}");
    expect(cy.get("div.here")).to.exist;
    expect(cy.get("div.searched-location-details")).to.exist
  });
});

describe("Map", () => {
  it("Should display a marker when clicked", () => {
    cy.wait(1000);
    cy.visit("/")
    cy.wait(1000);
    cy.get("div.map").click("center");
    expect(cy.get("div.here")).to.exist;
  });
});
