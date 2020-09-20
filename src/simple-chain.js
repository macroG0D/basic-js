const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    this.chain.push(`( ${value} )`);
    return this;
  },
  removeLink(position) {
    // check if input is correct, else reset chain and throw error
    if (isNaN(position) || position < 1 || position > this.chain.length - 1) {
      // reset current chain to prevent incorrect results on the next object.chain call
      this.chain = [];
      throw 'Error';
    }
    this.chain.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    let final = this.chain.slice();
    // reset current chain to prevent incorrect results on the next object.chain call
    this.chain = [];
    return final.join('~~');
  }
};

module.exports = chainMaker;