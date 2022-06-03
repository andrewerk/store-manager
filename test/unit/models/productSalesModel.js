const { expect } = require('chai');
const productSaleModel = require('../../../models/productSalesModel');
const productsModel = require ('../../../models/productsModel');
const sinon = require('sinon');
const connection = require('../../../models/connection')

describe('Verifies if sale is added to product_sales table', () => {

  describe('Test addSaleProduct in case of success', () => {
    beforeEach(() => {
      const resultConnection = {
        affectedRows: 1,
      };
      const resultGet = [{
        id: 3,
        name: 'produto',
        quantity: 6,
      }];
      sinon.stub(connection, 'execute').resolves([resultConnection]);
      sinon.stub(productsModel, 'getById').resolves([resultGet]);
      sinon.stub(productsModel, 'editProductQuantity').resolves();
      });

      afterEach(() => {
      connection.execute.restore();
      productsModel.getById.restore();
      productsModel.editProductQuantity.restore();
      });

      it('Verifies sql response', async () => {
        const productId = 1;
        const quantity = 5;
        const saleId = 1
        const result = await productSaleModel.addSaleProduct(saleId, productId, quantity);
        expect(result).to.be.true;
      });
   })
});
