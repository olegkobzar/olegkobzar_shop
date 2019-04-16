import chai from 'chai';
import faker from 'faker';
import { Person } from './Person';

const { assert, expect } = chai;
chai.should();

describe('Person class', () => {
  let person, name;

  beforeEach( () => {
    person = new Person();
    name = faker.name.firstName();
  })

  it('should create instance with field name', () => {
    person.name.should.equal('Jhon');
  })

  it('should create instance with field creation which is Date', () => {
    person.creation.should.instanceof(Date);
  })

  it('should return name on getName()', () => {
    person.getName().should.equal(person.name);
  })

  it('should set name on setName(name)', () => {
    person.setName(name);
    person.name.should.equal(name);
  })

  it('should return "nigth child" on getCreation() if 3 hours"', () => {
    person.creation.setHours(3);
    person.getCreation().should.equal('night child');
  })
})
