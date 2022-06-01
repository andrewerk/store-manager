const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const sinon = require('sinon');
const connection = require('../../../models/connection')

  describe('Create model to get sales', () => {

    describe('Verifies if all sales return correctly', () => {


      beforeEach(() => {
        const result = [
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
        sinon.stub(connection, 'execute').resolves([result]);
    });

      afterEach(() => {
        connection.execute.restore();
    });

      it('Verify if getAll returns an array', async () => {
        const [allSales] = await salesModel.getAll();
        expect(allSales).to.be.an('array');
      });

      it('Verify if getAll returns an array not empty', async () => {
        const [allSales] = await salesModel.getAll();
        expect(allSales).to.not.be.empty;
      });

      it('Verify if getAll returns an array with objects', async () => {
        const [allSales] = await salesModel.getAll();
        expect(allSales[0]).to.be.an('object');
      });

      it('Verify if getAll returns an array with objects with the correct keys', async () => {
        const [allSales] = await salesModel.getAll();
        expect(allSales[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });

      it('Verify if getAll returns an array with objects with the correct order', async () => {
        const [allSales] = await salesModel.getAll();
        const indexes = allSales.map((sale) => sale.saleId)
        expect(indexes).to.eql([1,1]);
      });
    });

    describe('Verifies getById return correctly', () => {


      beforeEach(() => {
        const result =   [
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

        sinon.stub(connection, 'execute').resolves([result]);
    });

      afterEach(() => {
        connection.execute.restore();
    });

      it('Verify if getById returns an array', async () => {
        const [sale] = await salesModel.getById(1);
        expect(sale).to.be.an('array');
      });

      it('Verify if getById returns an array not empty', async () => {
        const [sale] = await salesModel.getById(1);
        expect(sale).to.not.be.empty;
      });

      it('Verify if getById returns an array with one object', async () => {
        const [sale] = await salesModel.getById(1);
        expect(sale[0]).to.be.an('object');
      });

      it('Verify if getById returns an array with objects with the correct keys', async () => {
        const [sale] = await salesModel.getById(1);
        expect(sale[0]).to.include.all.keys('date', 'productId', 'quantity');
      });

    });

  });

