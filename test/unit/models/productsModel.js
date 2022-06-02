const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const sinon = require('sinon');
const connection = require('../../../models/connection')

  describe('Create model to get products', () => {

    describe('Verifies all products return correctly', () => {

      beforeEach(() => {
        const result = [
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          },
          {
            "id": 2,
            "name": "produto B",
            "quantity": 20
          }
        ]
        sinon.stub(connection, 'execute').resolves([result]);
    });

      afterEach(() => {
        connection.execute.restore();
    });

      it('Verify if getAll returns an array', async () => {
        const [allProducts] = await productsModel.getAll();
        expect(allProducts).to.be.an('array');
      });

      it('Verify if getAll returns an array not empty', async () => {
        const [allProducts] = await productsModel.getAll();
        expect(allProducts).to.not.be.empty;
      });

      it('Verify if getAll returns an array with objects', async () => {
        const [allProducts] = await productsModel.getAll();
        expect(allProducts[0]).to.be.an('object');
      });

      it('Verify if getAll returns an array with objects with the correct keys', async () => {
        const [allProducts] = await productsModel.getAll();
        expect(allProducts[0]).to.include.all.keys('id', 'name', 'quantity');
      });

      it('Verify if getAll returns an array with objects with the correct order', async () => {
        const [allProducts] = await productsModel.getAll();
        const indexes = allProducts.map((product) => product.id)
        expect(indexes).to.eql([1,2]);
      });
    });

    describe('Verifies getById return correctly', () => {

      beforeEach(() => {
        const result = [
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          },
        ]
        sinon.stub(connection, 'execute').resolves([result]);
    });

      afterEach(() => {
        connection.execute.restore();
    });

      it('Verify if getById returns an array', async () => {
        const [product] = await productsModel.getById(1);
        expect(product).to.be.an('array');
      });

      it('Verify if getById returns an array not empty', async () => {
        const [product] = await productsModel.getById(1);
        expect(product).to.not.be.empty;
      });

      it('Verify if getById returns an array with one object', async () => {
        const [product] = await productsModel.getById(1);
        expect(product[0]).to.be.an('object');
      });

      it('Verify if getById returns an array with objects with the correct keys', async () => {
        const [product] = await productsModel.getById(1);
        expect(product[0]).to.include.all.keys('id', 'name', 'quantity');
      });

      it('Verify if getById returns an array with objects with the correct item', async () => {
        const id = 1;
        const [product] = await productsModel.getById(id);
        expect(product[0].id).to.equal(id)
      });

    });

    describe('Verifies addProduct return correctly', () => {

      beforeEach(() => {
        const result = [
          { "id": 1,
            "name": "produto",
            "quantity": 10
           }
        ]
        sinon.stub(connection, 'execute').resolves([result]);
    });

      afterEach(() => {
        connection.execute.restore();
    });


    it('Verify if addProduct returns', async () => {
      const name = 'produto';
      const quantity = 10;
      const product = await productsModel.addProduct(name, quantity);
      expect(product).to.all.keys('id', 'name', 'quantity');
    });

  })

  });
