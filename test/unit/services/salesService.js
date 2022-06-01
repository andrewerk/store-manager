const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');

  describe('Create service to get sales', () => {

    describe('Verifies if all sales return correctly', () => {


      beforeEach(() => {
        const result =   [
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:29.000Z",
            "productId": 1,
            "quantity": 2
          },
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:54.000Z",
            "productId": 2,
            "quantity": 2
          }
        ];
        sinon.stub(salesModel, 'getAll').resolves([result]);
    });

      afterEach(() => {
        salesModel.getAll.restore();
    });

      it('Verify if listAllSales returns an array', async () => {
        const allSales = await salesService.listAllSales();
        expect(allSales).to.be.an('array');
      });

      it('Verify if listAllSales returns an array not empty', async () => {
        const allSales = await salesService.listAllSales();
        expect(allSales).to.not.be.empty;
      });

      it('Verify if listAllSales returns an array with objects', async () => {
        const allSales = await salesService.listAllSales();
        expect(allSales[0]).to.be.an('object');
      });

      it('Verify if listAllSales returns an array with objects with the correct keys', async () => {
        const allSales = await salesService.listAllSales();
        expect(allSales[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });

      it('Verify if listAllSales returns an array with objects with the correct order', async () => {
        const allSales = await salesService.listAllSales();
        const indexes = allSales.map((product) => product.saleId)
        expect(indexes).to.eql([1,1]);
      });
    });

    describe('Verifies returnSaleById return correctly', () => {


      beforeEach(() => {
        const result =  [
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

        sinon.stub(salesModel, 'getById').resolves([result]);
    });

      afterEach(() => {
        salesModel.getById.restore();
    });

      it('Verify if returnSaleById returns an array', async () => {
        const sale = await salesService.returnSaleById(1);
        expect(sale).to.be.an('array');
      });

      it('Verify if returnSaleById returns an array not empty', async () => {
        const sale = await salesService.returnSaleById(1);
        expect(sale).to.not.be.empty;
      });

      it('Verify if returnSaleById returns an array with one object', async () => {
        const sale = await salesService.returnSaleById(1);
        expect(sale[0]).to.be.an('object');
      });

      it('Verify if returnSaleById returns an array with objects with the correct keys', async () => {
        const sale = await salesService.returnSaleById(1);
        expect(sale[0]).to.include.all.keys('date', 'productId', 'quantity');
      });

    });

  });
