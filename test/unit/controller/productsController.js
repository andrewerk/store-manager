const { expect } = require('chai');
const productsController = require('../../../controllers/productsController');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');

describe('Test products controller', () => {
    describe('Verifies if getById returns correctly', () => {
      const result = {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      };

      const request = {};
      const response = {};

      beforeEach(() => {
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'returnProductById').resolves(result);
    });

      afterEach(() => {
        productsService.returnProductById.restore();
    });
      it('Should responde with the success code 200', async () => {
        await productsController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
    });

      it('Should responde with the product', async () => {
        await productsController.getById(request, response);

        expect(response.json.calledWith(result)).to.be.equal(true);
    });

    });

    describe('Verifies if getAll returns correctly', () => {
      const result =   [
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

      const request = {};
      const response = {};

      beforeEach(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'listAllProducts').resolves(result);
    });

      afterEach(() => {
        productsService.listAllProducts.restore();
    });
      it('Should responde with the success code 200', async () => {
        await productsController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
    });

      it('Should responde with the product', async () => {
        await productsController.getAll(request, response);

        expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });
});


