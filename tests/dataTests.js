'use strict';

const expect = require('chai').expect;
const assert = require('assert');
const IP_REGEX = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/

describe('IP Regex Validator Sanity Tests', () => {

  it('valid ip passes regex match', () => {
    const invalid_ip = "192.168.0.1".match(IP_REGEX);
    expect(invalid_ip).to.be.an('array').that.is.not.empty;
  });

  it('invalid ip fails regex match', () => {
    const invalid_ip = "992.168.0.1".match(IP_REGEX);
    expect(invalid_ip).to.be.null;
  });
})
