
describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3002/api/testing/reset')
		cy.request('POST', 'http://localhost:3002/api/users', {
			username: 'didzis1', name: 'Didzis Zvaigzne', password: 'salainen'
		})
		cy.request('POST', 'http://localhost:3002/api/users', {
			username: 'MonPoke', name: 'Poke Mon', password: 'verysecret'
		})
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.get('#username')
		cy.get('#password')
	})

	describe('Login functionality', function () {

		it('Access denied for wrong credentials', function() {
			cy.get('#username').type('didzis1')
			cy.get('#password').type('wrongPassword')
			cy.get('#login-submit-btn').click()
			cy.get('#message')
				.should('have.css', 'background-color')
				.and('eq', 'rgb(255, 0, 0)')
		})
		it('Access granted for right credentials', function() {
			cy.get('#username').type('didzis1')
			cy.get('#password').type('salainen')
			cy.get('#login-submit-btn').click()
			cy.contains('Didzis Zvaigzne logged in')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'didzis1', password: 'salainen' })
			cy.contains('Didzis Zvaigzne logged in')
		})

		it('A blog can be created', function() {
			cy.contains('Show blog form').click()
			cy.get('#title').type('Blog test with Cypress')
			cy.get('#author').type('Didzis Zvaigzne')
			cy.get('#url').type('cypress.io')
			cy.get('#create-blog-button').click()
			cy.contains('Blog test with Cypress - Didzis Zvaigzne')
		})

		it('A blog can be liked', function() {
			// Check if the blog has increased the likes by 1
			cy.createBlog({ title:'This blog will get liked', author:'Anonymous', url:'random.org' })
			cy.get('.showMore').click()
			cy.contains('0 likes')
			cy.get('.likeButton').click()
			cy.contains('1 likes')
		})

		it('A blog can be deleted', function() {
			cy.createBlog({ title:'This blog will get deleted', author:'Anonymous', url:'random.org' })
			cy.get('.showMore').click()
			cy.get('#removeButton').click()
			cy.get('html').should('not.contain', 'This blog will get deleted - Anonymous')
		})
	})

	describe('Create multiple blogs and check if they are sorted by likes', function() {
		it('Create three blogs and check for the right likes order', function() {
			cy.login({ username:'didzis1', password: 'salainen' })
			cy.createBlog({ title:'First blog', author:'Anonymous', url:'random.org', likes: 25 })
			cy.createBlog({ title:'Second blog', author:'Anonymous', url:'random.org', likes: 10 })
			cy.createBlog({ title:'Third blog', author:'Anonymous', url:'random.org', likes: 34 })

			// Click each blogs show more buttons
			cy.get('.blog')
				.find('.showMore')
				.then(button => button.click())

			cy.get('.blog').eq(0).contains('Third blog')
			cy.get('.blog').eq(1).contains('First blog')
			cy.get('.blog').eq(2).contains('Second blog')
		})
	})

})