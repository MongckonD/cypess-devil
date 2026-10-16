describe('SauceDemo Testing', () => {

    it('TC01 Reset app state during checkout process', () => {

        cy.visit('https://www.saucedemo.com')

        // Login
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include', '/inventory.html')

        // Add product 1
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '1')

        // Add product 2
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '2')

        // Go to cart
        cy.get('[data-test="shopping-cart-link"]').click()

        cy.url().should('include', '/cart.html')

        // Checkout
        cy.get('[data-test="checkout"]').click()

        // Input information
        cy.get('[data-test="firstName"]').type('aong')
        cy.get('[data-test="lastName"]').type('lee')
        cy.get('[data-test="postalCode"]').type('12345')

        cy.get('[data-test="continue"]').click()

        // Check that user is on checkout overview
        cy.url().should('include', '/checkout-step-two.html')

        // Reset App State
        cy.get('#react-burger-menu-btn').click()
        cy.get('#reset_sidebar_link').click()

        // Cart should be cleared
        cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist')

        // Try to finish checkout after reset
        cy.get('[data-test="finish"]').click()

        // Check result
        cy.get('[data-test="complete-header"]')
            .should('have.text', 'Thank you for your order!')

    })

    it('TC02 Logout during checkout and login again', () => {

        cy.visit('https://www.saucedemo.com')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '2')

        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()

        cy.get('[data-test="firstName"]').type('aong')
        cy.get('[data-test="lastName"]').type('lee')
        cy.get('[data-test="postalCode"]').type('12345')

        cy.get('[data-test="continue"]').click()

        // Logout during checkout
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()

        // Login again
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Check cart state
        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '2')
    })

    it.only('TC03 Remove item during checkout and check overview', () => {

        cy.visit('https://www.saucedemo.com')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '2')

        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()

        cy.get('[data-test="firstName"]').type('aong')
        cy.get('[data-test="lastName"]').type('lee')
        cy.get('[data-test="postalCode"]').type('12345')

        cy.get('[data-test="continue"]').click()

        // Both items should exist
        cy.contains('Sauce Labs Backpack')
            .should('be.visible')

        cy.contains('Sauce Labs Bike Light')
            .should('be.visible')

        // Go back to cart
        cy.go('back')
        cy.go('back')

        // Remove Bike Light
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '1')

        // Go forward to checkout again
        cy.go('forward')
        cy.go('forward')

        // Backpack should remain
        cy.contains('Sauce Labs Backpack')
            .should('be.visible')

        // Bike Light should disappear
        cy.contains('Sauce Labs Bike Light')
            .should('not.exist')
    })
})