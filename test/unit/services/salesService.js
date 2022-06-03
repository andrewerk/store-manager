const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const productSalesModel = require('../../../models/productSalesModel');

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

    describe('Verifies if returnSaleById throws error if id doesnt exists', () => {


      beforeEach(() => {
        const result =  [

        ];

        sinon.stub(salesModel, 'getById').resolves([result]);
    });

      afterEach(() => {
        salesModel.getById.restore();
    });

    it('Verify if returnSaleById dont return', async () => {
      try {
      const sale = await salesService.returnSaleById(5);
      expect(sale).to.be.an('array');
      expect(sale).to.be.empty;
      } catch(e) {
      expect(JSON.parse(e.message).message).to.eql('Sale not found')
      }
    });

    });

    describe('Verifies if addSale fill all requirements', () => {

      describe('If addSale is allowed', () => {
        const sale =   [
          {
            "productId": 1,
            "quantity": 2
          },
        ];
        const addSaleResult = {
          saleId: 3
        };

        beforeEach(() => {
          sinon.stub(productSalesModel, 'addSaleProduct').resolves(true);
          sinon.stub(salesModel, 'addSale').resolves(addSaleResult);
      });

        afterEach(() => {
          salesModel.addSale.restore();
          productSalesModel.addSaleProduct.restore();
      });

      it('Verify if addSale returns correctly', async () => {
        const result = await salesService.addSale(sale);
        expect(result).to.be.an('object');
        expect(result).to.not.be.empty;
        expect(result).to.have.all.keys('id', 'itemsSold');
        expect(result.itemsSold).to.be.an('array');
        expect(result.itemsSold[0]).to.have.all.keys('productId', 'quantity');
      });
    })
    describe('If addSale is not allowed', () => {
      const sale =   [
        {
          "productId": 1,
          "quantity": 100
        },
      ];
      const addSaleResult = {
        saleId: 3
      };
      let deleteSpy;
      beforeEach(() => {
        sinon.stub(productSalesModel, 'addSaleProduct').resolves(false);
        sinon.stub(salesModel, 'addSale').resolves(addSaleResult);
        deleteSpy = sinon.spy(salesModel, 'deleteSale');
    });

      afterEach(() => {
        salesModel.addSale.restore();
        productSalesModel.addSaleProduct.restore();
    });
    it('Verify if addSale returns correctly', async () => {
      try {
        const result = await salesService.addSale(sale);
        expect(deleteSpy.callCount).to.be.equal(1);
        expect(deleteSpy.getCalls()[0].firstArg).to.contain("DELETE");
      } catch (e) {
        expect(JSON.parse(e.message).message).to.eql('Such amount is not permitted to sell')
      };
    });
  })
  });
});
