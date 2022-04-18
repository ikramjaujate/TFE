describe('Login tests', () => {
    it("login", () => {
        cy.visit('/')
        cy.get('input').get('#email').type('admin@masterservices.com')
        cy.get('input').get('#password').type('ikramjaujate')
        cy.contains('button','Login').click({force: true })
    })

})

describe('Client page', () => {
    it("client", () => {
        cy.get(`[aria-label="Clients"]`).click({ multiple: true, force: true })
        cy.get('input[placeholder*="First Name"]').type('Martin')
        cy.get('input[placeholder*="Last Name"]').type('Pistache')
        cy.get('input[placeholder*="Email"]').type('tes@tomartinto.com')
        cy.get('input[placeholder*="Phone Number"]').type('+32 488 45 35 60')
        cy.get('input[placeholder*="Street"]').type('Rue Test')
        cy.get('input[placeholder*="Locality"]').type('Brussels')
        cy.get('input[placeholder*="Postal Code"]').type('1108')
        cy.get('span.p-dropdown-label.p-inputtext.p-placeholder').click()
            .get(`[aria-label="Belgium"]`).click()
        cy.get('button.p-button.p-component.p-button-success.mr-2').click()
        cy.wait(1000)
        cy.get('.p-column-filter-menu-button.p-link').click({force: true})
        cy.get('input[placeholder*="Search by name"]').type('test')
        cy.get('span.p-button-label.p-c').contains('Apply').click({force: true})
    })

})