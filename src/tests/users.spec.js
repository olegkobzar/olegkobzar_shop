import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import { getUsers } from './users';

const { assert, expect } = chai;
chai.should();

describe('getUsers()', () => {
  let stub;
  // let fakeConsole;
  const testString = faker.lorem.word();

  const createStub = () => {
    stub = sinon.stub(window, 'fetch');
    stub.returns(Promise.resolve({
      json() { return Promise.resolve(testString); }
    }));

    return stub;
  }

  // beforeEach(() => {
  //   stub = sinon.stub(window, 'fetch');
  //   stub.returns(Promise.resolve({
  //     json() { return Promise.resolve(testString); }
  //   }));

  //   fakeConsole = sinon.stub(console, 'log');
  // })

  afterEach(() => {
    window.fetch.restore();
  })

  it('should call fetch()', () => {
    getUsers();

    expect(stub.called).to.be.true;
  });

  it('should call console.log with result it success', () => {
    const fakeConsole = sinon.stub(console, 'log');
    createStub();
    getUsers();

    expect(fakeConsole.called).to.be.true;
  });
});