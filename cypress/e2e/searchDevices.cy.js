/// <reference types="cypress"/>


describe('Search Devices', () => {

  // Cenário de teste 01
  it.only('List Of All Objects', () => {
    cy.request({
        method: 'GET',
        url: 'https://api.restful-api.dev/objects'
    })
    .then((response) => {
      console.log('Cenário 01: ', response)

      expect(response.status).to.equal(200)
      expect(response.body[0].id).to.equal('1')
      expect(response.body[0].name).to.equal('Google Pixel 6 Pro')
      
      expect(response.body[3].id).to.equal('4')
      expect(response.body[3].name).to.equal('Apple iPhone 11, 64GB')
      
      expect(response.body[6].id).to.equal('7')
      expect(response.body[6].name).to.equal('Apple MacBook Pro 16')
      
      expect(response.body[12].id).to.equal('13')
      expect(response.body[12].name).to.equal('Apple iPad Air')
    })
  })

  // Cenário de teste 02
  it('List Of All Objects By IDs', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.restful-api.dev/objects?id=3&id=5'
    })
    .then((response) => {
      console.log('Cenário 02: ', response)

      expect(response.status).to.equal(200)
      expect(response.body[0].id).to.equal('3')
      expect(response.body[0].name).to.equal('Apple iPhone 12 Pro Max')
      expect(response.body[0].data.color).to.equal('Cloudy White')
      expect(response.body[0].data['capacity GB']).to.equal(512)
      
      expect(response.body[1].id).to.equal('5')
      expect(response.body[1].name).to.equal('Samsung Galaxy Z Fold2')
      expect(response.body[1].data.color).to.equal('Brown')
      expect(response.body[1].data.price).to.equal(689.99)
    })
  })

  // Cenário de teste 03
  it('One Object', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.restful-api.dev/objects/7'
    })
    .then((response) => {
      console.log('Cenário 03: ', response)

      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal('7')
      expect(response.body.name).to.equal('Apple MacBook Pro 16')
      expect(response.body.data['CPU model']).to.equal('Intel Core i9')
      expect(response.body.data['Hard disk size']).to.equal('1 TB')
      expect(response.body.data.price).to.equal(1849.99)
      expect(response.body.data.year).to.equal(2019)      
    })
  })

  // Cenário de teste 04
  it('One Object Not Found', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.restful-api.dev/objects/76',
      failOnStatusCode: false
    })
    .then((response) => {
      console.log('Cenário 04: ', response)

      expect(response.status).to.equal(404)
      expect(response.body.error).to.equal('Oject with id=76 was not found.')
    })
    
  })

  // Cenário de teste 05
  it('Add Object', () => {
    cy.request({
      method: 'POST',
      url: '/objects',
      body: {
          "name": "Apple MacBook Pro 19",
          "data": {
              "year": 2024,
              "price": 1849.99,
              "CPU model": "Intel Core i9",
              "Hard disk size": "2 TB"
        }
     }
    })
    .then((response) => {
      console.log('Cenário 05: ', response)

      expect(response.status).to.equal(200)
      expect(response.body.id).to.not.equal('')
      expect(response.body.name).to.equal('Apple MacBook Pro 19')
      expect(response.body.data['CPU model']).to.equal('Intel Core i9')
      expect(response.body.data['Hard disk size']).to.equal('2 TB')
      expect(response.body.data.price).to.equal(1849.99)
      expect(response.body.data.year).to.equal(2024)  
    })
  })

  // Cenário de teste 06
  it('Update Object', () => {
    cy.request({
      method: 'PUT',
      url: 'https://api.restful-api.dev/objects/?id=7',
      body: {
        "name": "Apple MacBook Pro 18",
        "data": {
           "year": 2024,
           "price": 3049.99,
           "CPU model": "Intel Core i9",
           "Hard disk size": "1 TB",
           "color": "Black"
        }
     }
    })
    .then((response) => {
      console.log('Cenário 06: ', response)

      expect(response.status).to.equal(200)
    })    
  })

  // Cenário de teste 07
  it('Partially Update Object', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://api.restful-api.dev/objects/?id=7',
      body: {
        "name": "Apple MacBook Pro 19 (Updated Name)"
     }
    })
    .then((response) => {
      console.log('Cenário 07:', response)

      expect(response.status).to.equal(200)
    })
  })

  // Cenário de teste 08
  it('Delete Object', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.restful-api.dev/objects/?id=6'
    })
    .then((response) => {
      console.log('Cenário 08: ', response)

      expect(response.status).to.equal(200)
    })
  })
})