import { equal, should } from 'chai';
import sinon from 'sinon';
import { showMessage , getDay, getAdultUsers, getRandomUsers, Product} from './main';
should();
const sandbox = sinon.createSandbox();

const users = [{age: 10}, {age: 15}, {age: 20}, {age: 25}];

describe('Function showMessage()', () => {
  it ('should call alert in showMessage() with text', () => {
    const alert = sinon.stub(window, 'alert');
    const testString = 'test';

    showMessage(testString);
    alert.getCall(0).args[0].should.equal(testString);
    window.alert.restore();
  });
});

describe('Function getDay()', () => {
  it ('should return day', () => {
    const ms = 1234567891011;

    sandbox.useFakeTimers(ms);
    getDay().should.equal('Saturday');
  });
});

describe('Function getAdultUsers()', () => {
  it ('should return two adult (> 18 years) users', () => {
    getAdultUsers(users).should.deep.equal([{age: 20}, {age: 25}]);
  });

  it ('should return [] if no users', () => {
    getAdultUsers().should.deep.equal([]);
  });
});

describe('Function getRandomUsers()', () => {
  it ('should return false if no users', () => {
    getRandomUsers().should.equal(false);
  });

  it ('should return 2 first users', () => {
    sinon.stub(Math, 'random').returns(0.6);
    getRandomUsers(users).should.deep.equal([{age: 10}, {age: 15}]);
    Math.random.restore();
  });

  it ('should return 2 last users', () => {
    sinon.stub(Math, 'random').returns(0.4);
    getRandomUsers(users).should.deep.equal([{age: 20}, {age: 25}]);
    Math.random.restore();
  });
});

describe('class Product', () => {
  const price = 33;
  const defaultPrice = 10;
  const title = 'text';

  let product;

  beforeEach(() => {
    product = new Product();
  })

  it ('should create instance with title and price', () => {
    const product = new Product(title, price);

    product.title.should.equal(title);
    product.price.should.equal(price);
  });

  it ('should create instance with default title', () => {
    product.should.have.own.property('title');
    product.title.should.equal('Apple');
  });

  it ('should create instance with default price', () => {
    product.should.have.own.property('price');
    product.price.should.equal(defaultPrice);
  });

  it ('setPrice() should return Error if no price', () => {
    product.setPrice.should.throw(Error, 'Price should be defined');
  });

  it ('should return 20 if setPrice(20)', () => {
    product.setPrice(price);
    product.price.should.equal(price);
  });

  it ('should return default price(10) if setPrice(8)', () => {
    product.setPrice(8);
    product.price.should.equal(defaultPrice);
  });

});