describe('SauceDemo Testing', () => {

    it('TC01-open website', () => {
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

    })

    it('TC02-wrong username/password', () => {

        cy.visit('https://www.saucedemo.com')

        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')

        cy.get('[data-test="username"]').type('wrong_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('TC03-wrong username and password', () => {

        cy.visit('https://www.saucedemo.com')

        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')

        cy.get('[data-test="username"]').type('wrong_user')
        cy.get('[data-test="password"]').type('wrong_password')

        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('TC04-empty username', () => {

        cy.visit('https://www.saucedemo.com')

        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')

        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username is required')
        
    })

    it.only('TC05-empty password', () => {

        cy.visit('https://www.saucedemo.com')
        
        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Password is required')
    })
})
