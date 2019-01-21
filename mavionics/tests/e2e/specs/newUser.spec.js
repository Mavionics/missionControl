describe("Full user creation", () => {
  it.only("Register new user", () => {
    const email = "test2@test.com";
    const name = "Test User";
    const vehicleName = "My Sim";
    const vehicleDesc = "Used in automated testing";

    // Register a new user through login dialog
    cy.visit("/");
    cy.get(".mdl-textfield__input").click();

    cy.get("input.firebaseui-id-email")
      .type(email)
      .should("have.value", email)
      .type("{enter}");

    cy.get("input.firebaseui-id-name")
      .type(name)
      .type("{enter}");

    cy.get("input.firebaseui-id-new-password")
      .type("testtest")
      .type("{enter}");

    // Check it has no vehicles
    cy.url().should("include", "controlroom");
    cy.get("[data-testid=vehicleName]").should("not.exist");

    // Add a new simulated vehicle
    cy.get("[data-testid=addVehicle").click();
    cy.get("input[name=vehicleName]").type(vehicleName);
    cy.get("textarea[name=Description]").type(vehicleDesc);
    cy.get("[data-testid=addVehicleModal-submit]").click();

    // Check tat it was added
    cy.get("[data-testid=vehicleName]").should("exist");
    cy.get("[data-testid=vehicleName]").contains(vehicleName);

    // Start simulation
    cy.get("[data-testid=runSimulation").click();

    cy.wait(3000);

    // Stop simulation
    cy.get("[data-testid=runSimulation").click();

    // Delete user
    cy.visit("/profile");
    cy.get("[data-testid=deleteAccount]").click();
    cy.get(".dialog > .modal-card > .modal-card-foot > .is-danger").click();
    cy.contains("You have been logged out!");
  }),
    it("Sign-in should be visible", () => {
      cy.visit("/");
      cy.get("#firebaseui-auth-container").should("be.visible");
    });
});
