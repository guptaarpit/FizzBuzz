const ShopService = require('../service');
let shopService, refModals;

class AppController {
  constructor () {
    shopService = new ShopService();
  }

  static async retrieveFizzBuzz (request, h) {
    const {length} = request.query || {};
    try {
      const result = await shopService.generateFizzBuzz(length);
      return h.response({ status: true, result, length });
    } catch (e) {
      console.log(e);
      return h.response({ status: false, result: [], e, length, message: 'Failed' });
    }
  }
}

module.exports = AppController;