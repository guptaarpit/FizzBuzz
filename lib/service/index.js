//If any database operation required than only const ShopAdaptor = require('../adaptor')

class AppService {
  constructor (modals) {
  }

  generateFizzBuzz(length){
    const arr = Array.from({ length }, (_, i) => ( ++i%3 ? '' : 'fizz' ) + ( i%5 ? '' : 'buzz' ) || i);
    return arr.map((element, index) => {
      // console.log(element);
      const obj = {};
      obj[`${index}`] = element;
      return obj;
    })
  }
}

module.exports = AppService
