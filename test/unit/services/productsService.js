const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');

  describe('Create service to get products', () => {

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
        sinon.stub(productsModel, 'getAll').resolves([result]);
    });

      afterEach(() => {
        productsModel.getAll.restore();
    });

      it('Verify if getAll returns an array', async () => {
        const allProducts = await productsService.listAllProducts();
        expect(allProducts).to.be.an('array');
      });

      it('Verify if listAllProducts returns an array not empty', async () => {
        const allProducts = await productsService.listAllProducts();
        expect(allProducts).to.not.be.empty;
      });

      it('Verify if listAllProducts returns an array with objects', async () => {
        const allProducts = await productsService.listAllProducts();
        expect(allProducts[0]).to.be.an('object');
      });

      it('Verify if listAllProducts returns an array with objects with the correct keys', async () => {
        const allProducts = await productsService.listAllProducts();
        expect(allProducts[0]).to.include.all.keys('id', 'name', 'quantity');
      });

      it('Verify if listAllProducts returns an array with objects with the correct order', async () => {
        const allProducts = await productsService.listAllProducts();
        const indexes = allProducts.map((product) => product.id)
        expect(indexes).to.eql([1,2]);
      });
    });

    describe('Verifies getById return correctly', () => {


      beforeEach(() => {
        const result =[
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          },
        ];


        sinon.stub(productsModel, 'getById').resolves([result]);
    });

      afterEach(() => {
        productsModel.getById.restore();
    });

      it('Verify if returnProductById returns an array', async () => {
        const product = await productsService.returnProductById(1);
        expect(product).to.be.an('object');
      });

      it('Verify if returnProductById returns an array not empty', async () => {
        const product = await productsService.returnProductById(1);
        expect(product).to.not.be.empty;
      });

      it('Verify if returnProductById returns an array with one object', async () => {
        const product = await productsService.returnProductById(1);
        expect(product).to.be.an('object');
      });

      it('Verify if returnProductById returns an array with objects with the correct keys', async () => {
        const product = await productsService.returnProductById(1);
        expect(product).to.include.all.keys('id', 'name', 'quantity');
      });

      it('Verify if returnProductById returns an array with objects with the correct item', async () => {
        const id = 1;
        const product = await productsService.returnProductById(id);
        expect(product.id).to.equal(id)
      });

    });

  });
