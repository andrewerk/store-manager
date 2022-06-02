const { expect } = require('chai');
const salesController = require('../../../controllers/salesController');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');

describe('Test sales controller', () => {
    describe('Verifies if getSaleById returns correctly', () => {
      const result = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];

      const request = {};
      const response = {};

      beforeEach(() => {
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesService, 'returnSaleById').resolves(result);
    });

      afterEach(() => {
        salesService.returnSaleById.restore();
    });
      it('Should responde with the success code 200', async () => {
        await salesController.getSaleById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
    });

      it('Should responde with the product', async () => {
        await salesController.getSaleById(request, response);

        expect(response.json.calledWith(result)).to.be.equal(true);
    });

    });

    describe('Verifies if getAllSales returns correctly', () => {
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

        sinon.stub(salesService, 'listAllSales').resolves(result);
    });

      afterEach(() => {
        salesService.listAllSales.restore();
    });
      it('Should responde with the success code 200', async () => {
        await salesController.getAllSales(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
    });

      it('Should responde with the product', async () => {
        await salesController.getAllSales(request, response);

        expect(response.json.calledWith(result)).to.be.equal(true);
    });

  });
});


