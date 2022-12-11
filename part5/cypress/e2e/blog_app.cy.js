describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ante Brozovic',
      username: 'aposhtol',
      password: 'dugaresa'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', () => {
    cy.get('#username').type('Ante')
    cy.get('#password').type('Brozovic')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('aposhtol')
      cy.get('#password').type('dugaresa')
      cy.contains('login').click()
      cy.contains('Ante Brozovic logged-in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('aposhtol')
      cy.get('#password').type('karlovac')
      cy.contains('login').click()
      cy.get('.error').should('contain', 'username or password invalid').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('#username').type('aposhtol')
      cy.get('#password').type('dugaresa')
      cy.contains('login').click()
    })

    it('a blog can be created', () => {
      cy.contains('new blog').click()
      cy.get('input[placeholder=\'...write title\']').type('novi naslov')
      cy.get('input[placeholder=\'...write author\']').type('Mika Markovic')
      cy.get('input[placeholder=\'...write URL\']').type('https://mmarkovic.com/nn.html')
      cy.contains('create blog').click()
      cy.visit('http://localhost:3001')
      cy.contains('novi naslov')
    })

    it('user can like a blog', () => {
      cy.contains('new blog').click()
      cy.get('input[placeholder=\'...write title\']').type('novi naslov')
      cy.get('input[placeholder=\'...write author\']').type('Mika Markovic')
      cy.get('input[placeholder=\'...write URL\']').type('https://mmarkovic.com/nn.html')
      cy.contains('create blog').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')

    })

    it('user who created a blog can delete it', () => {
      cy.contains('new blog').click()
      cy.get('input[placeholder=\'...write title\']').type('novi naslov')
      cy.get('input[placeholder=\'...write author\']').type('Mika Markovic')
      cy.get('input[placeholder=\'...write URL\']').type('https://mmarkovic.com/nn.html')
      cy.contains('create blog').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.visit('http://localhost:3001')
      cy.contains('novi naslov').should('not.exist')
    })

    it('other users cannot delete the blog', () => {
      cy.contains('new blog').click()
      cy.get('input[placeholder=\'...write title\']').type('novi naslov')
      cy.get('input[placeholder=\'...write author\']').type('Mika Markovic')
      cy.get('input[placeholder=\'...write URL\']').type('https://mmarkovic.com/nn.html')
      cy.contains('create blog').click()

      cy.contains('logout').click()
      const user = {
        name: 'Luka Modric',
        username: 'lmodric',
        password: 'ballon d\'or'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3001')
      cy.get('#username').type('lmodric')
      cy.get('#password').type('ballon d\'or')
      cy.contains('login').click()

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.contains('unauthorized')
    })
  })

  describe('blogs are ordered according to likes', () => {
    beforeEach(() => {
      cy.get('#username').type('aposhtol')
      cy.get('#password').type('dugaresa')
      cy.contains('login').click()

      cy.contains('new blog').click()
      cy.get('input[placeholder=\'...write title\']').type('novi naslov')
      cy.get('input[placeholder=\'...write author\']').type('Mika Markovic')
      cy.get('input[placeholder=\'...write URL\']').type('https://mmarkovic.com/nn.html')
      cy.contains('create blog').click()

      cy.get('input[placeholder=\'...write title\']').type('opet nesto drugo')
      cy.get('input[placeholder=\'...write author\']').type('Nikica Milanovic')
      cy.get('input[placeholder=\'...write URL\']').type('https://net.hr/nmilanovic-ond')
      cy.contains('create blog').click()

      cy.get('input[placeholder=\'...write title\']').type('i jos jedan blog')
      cy.get('input[placeholder=\'...write author\']').type('Marko Dukovcic')
      cy.get('input[placeholder=\'...write URL\']').type('https://tportal.hr/neki-novi-blog')
      cy.contains('create blog').click()
    })

    it.only('blog with the most likes is first', () => {
      cy.contains('opet nesto drugo').contains('view').click()
      cy.contains('like').click().click().click()
      cy.contains('hide').click()

      cy.contains('i jos jedan blog').contains('view').click()
      cy.contains('like').click().click()
      cy.contains('hide').click()

      cy.contains('novi naslov').contains('view').click()
      cy.contains('like').click()
      cy.contains('hide').click()

      cy.visit('http://localhost:3001')
      cy.get('.blog').eq(0).should('contain', 'opet nesto drugo')
      cy.get('.blog').eq(1).should('contain', 'i jos jedan blog')
      cy.get('.blog').eq(2).should('contain', 'novi naslov')
    })
  })
})