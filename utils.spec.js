const utils = require('./utils');
const assert = require('assert');
const should = require('should');

describe('utils.js module is', ()=> {
    it('capitalize  the first character as capital', ()=>{
        const result = utils.capitalize ('hello');
        // assert.equal(result,"Hello");
        result.should.be.equal('Hello');
    });
})