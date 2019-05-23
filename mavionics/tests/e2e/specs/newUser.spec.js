describe("Full user creation", () => {
  it.only("Register new user", () => {
    const email = "test2@test.com";
    const name = "Test User";
    const vehicleName = "My Sim";
    const vehicleDesc = "Used in automated testing";

    // Register a new user through login dialog
    cy.visit("/")
      .get(".mdl-textfield__input").click()
      .get("input.firebaseui-id-email").type(email).should("have.value", email).type("{enter}")

      .get("input.firebaseui-id-name").type(name).type("{enter}")

      .get("input.firebaseui-id-new-password").type("testtest").type("{enter}")

      // Check it has no vehicles
      .url().should("include", "controlroom")
      .get("[data-testid=vehicleName]").should("not.exist")

      // Add a new simulated vehicle
      .get("[data-testid=addVehicle").click()
      .get("input[name=vehicleName]").type(vehicleName)
      .get("textarea[name=Description]").type(vehicleDesc)
      .get("[data-testid=addVehicleModal-submit]").click()

      // Check that it was added
      .get("[data-testid=vehicleName]").should("exist")
      .get("[data-testid=vehicleName]").contains(vehicleName)

      // Start simulation
      .get("[data-testid=runSimulation").click()

      .wait(3000)

      // Stop simulation
      .get("[data-testid=runSimulation").click()

      // Delete user
      .visit("/profile")
      .get("[data-testid=deleteAccount]").click()
      .get(".dialog > .modal-card > .modal-card-foot > .is-danger").click()
      .get("body").contains("You have been logged out!")
  })
});
