const { expect } = require('chai');
const productSaleModel = require('../../../models/productSalesModel');
const sinon = require('sinon');
const connection = require('../../../models/connection')

describe('Verifies if sale is added to product_sales table', () => {

  describe('Verifies if sale with one product is correctly added', () => {
    beforeEach(() => {
      const result = {
        affectedRows: 1,
      };
      sinon.stub(connection, 'execute').resolves([result]);
      });

      afterEach(() => {
      connection.execute.restore();
      });

      it('Verifies sql response', async () => {
        const productId = 1;
        const quantity = 5;
        const saleId = 1
        const result = await productSaleModel.addSaleProduct(saleId, productId, quantity);
        expect(result).to.be.true;
      });
   })


})
