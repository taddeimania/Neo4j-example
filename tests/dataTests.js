'use strict';

const expect = require('chai').expect;
const assert = require('assert');
const IP_REGEX = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
const DOMAIN_REGEX = /^([a-zA-Z0-9]{8,}\.com)$/

const loadData = require('../data/loadData');

describe('Regex Validator Sanity Tests', () => {

  it('valid ip passes regex match', () => {
    const valid_ip = "192.168.0.1".match(IP_REGEX);
    expect(valid_ip).to.be.an('array').that.is.not.empty;
  });

  it('invalid ip fails regex match', () => {
    const invalid_ip = "992.168.0.1".match(IP_REGEX);
    expect(invalid_ip).to.be.null;
  });

  it('valid domain passes regex match', () => {
    const valid_domain = "asdf123v.com".match(DOMAIN_REGEX);
    expect(valid_domain).to.be.an('array').that.is.not.empty;
  });

  it('invalid domain fails regex match', () => {
    const invalid_domain = "asdfn9.com".match(DOMAIN_REGEX);
    expect(invalid_domain).to.be.null;
  });
})

describe('generateValidIPSegment tests', () => {
  it('should return a number between 1 and 255', () => {
    const sut = loadData.generateValidIPSegment;
    const val = sut();
    expect(val).to.be.within(1, 255);
  });
});

describe('generateRandomIPAddress tests', () => {
  it('should return an ip that passes regex validation', () => {
    const sut = loadData.generateRandomIPAddress;
    const ip = sut();
    const valid_ip = ip.match(IP_REGEX);
    expect(valid_ip).to.be.an('array').that.is.not.empty;
  });
});

describe('generateRandomDomain tests', () => {
  it('should return a domain name that passes regex validation', () => {
    const sut = loadData.generateRandomDomain;
    const domain = sut();
    const valid_domain = domain.match(DOMAIN_REGEX);
    expect(valid_domain).to.be.an('array').that.is.not.empty;
  });
});

describe('generateXofN tests', () => {
  it('should return an array of size X of the return of N', () => {
    const sut = loadData.generateXofN;
    const data = sut(loadData.generateRandomIPAddress, 3);
    expect(data.length).to.equal(3);
  });
});
