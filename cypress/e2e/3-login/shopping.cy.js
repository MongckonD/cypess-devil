describe('SauceDemo Testing', () => {

    it('TC01-add to cart', () => {
        //testcase1
        cy.visit('https://www.saucedemo.com')

        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')

        cy.wait(2000)

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        
        cy.wait(2000)

        cy.url().should('include', '/inventory.html')
        // cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')


    })

    it('TC02-remove from cart', () => {

        cy.visit('https://www.saucedemo.com')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        
        cy.wait(2000)

        cy.url().should('include', '/inventory.html')
        // cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')    
        
        cy.get('[data-test="shopping-cart-link"]').click()

        cy.wait(2000)

        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.contains('Sauce Labs Backpack').should('not.exist')

    })

    it.only('TC03-checkout', () => {

        cy.visit('https://www.saucedemo.com')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        
        cy.wait(2000)

        cy.url().should('include', '/inventory.html')
        // cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')    
        
        cy.get('[data-test="shopping-cart-link"]').click()

        cy.wait(2000)

        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.contains('Sauce Labs Backpack').should('not.exist')

        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one.html')

        cy.get('[data-test="firstName"]').type('aong')
        cy.get('[data-test="lastName"]').type('lee')
        cy.get('[data-test="postalCode"]').type('12345')     
        
        cy.wait(2000)

        cy.get('[data-test="continue"]').click()
        cy.url().should('include', '/checkout-step-two.html')

        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="checkout-complete-container"]').should('contain.text', 'THANK YOU FOR YOUR ORDER')

    })
}) 