const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  // if true = direct, if false then reversed. direct by default
  constructor(direct = true) {
    this.direct = direct; // false === reversed
    this.encrypted = [];
    this.decrypted = [];
    this.secretKey = [];
  }

  // reset values to default when using the same object many times
  reset(direct) {
    this.direct = direct;
    this.encrypted = [];
    this.decrypted = [];
    this.secretKey = [];
  }


  encrypt(string, secretKey) {
    this.reset(this.direct); // reset previous values
    // use upperCase() becouse the result should be in upper case, 
    // so simply convert both arguments letters to same case and split them into arrays
    string = string.toUpperCase().split('');
    this.secretKey = secretKey.toUpperCase().split('');

    let counter = 0; // counter for repeating the this.secretKey becouse the secred key should be repeated over and over while it is shorter then string

    for (let i = 0; i < string.length; i++) { // iterate through the string chars

      if (string[i].charCodeAt() > 64 && string[i].charCodeAt() < 91) { // if char is uppercase letter
        let offset = this.secretKey[counter].charCodeAt() - 65; // get offset converted to a number frim 0 to 26
        let defaultChar = string[i].charCodeAt(); // store current char's charCode
        let encryptedChar = ''; // variable to store the encrypted letter

        if (defaultChar + offset < 91) { // if current char's charCode + offset is less then Z
          encryptedChar = defaultChar + offset; // calculate the char code after offset 
        } else { // if char + offset is greater then Z, then counter the remainder from A 
          encryptedChar = ((defaultChar + offset) % 90) + 64; // get the remainder and calculate offset from 64('A')
        }
        encryptedChar = String.fromCharCode(encryptedChar); // convert encrypted char code to letter
        this.encrypted.push(encryptedChar); // push encrypted letters into array 

        // check if need to restart the secretKey's counter — if the secret key word is ended end needs to start over in the next iteration
        if (counter + 1 > this.secretKey.length - 1) {
          counter = 0;
        } else {
          counter++;
        }

      } else { // if char is not uppercase letter, don't encypt, just push as it is.
        this.encrypted.push(string[i]); // is a space or any symbol, so just push it into the final array
      }
    }

    // if direct machine — return as string, else if reversed machine — reverse and return as string
    return this.direct ? this.encrypted.join('') : this.encrypted.reverse().join('');
  }


  decrypt(encryptedString, secretKey) {
    this.reset(this.direct); // reset previous values
    this.secretKey = secretKey.toUpperCase();
    this.encryptedArr = encryptedString.toUpperCase().split('');

    let counter = 0; // counter for repeating the this.secretKey becouse the secred key should be repeated over and over while it is shorter then encryptedString

    for (let i = 0; i < this.encryptedArr.length; i++) { // iterate through the string chars
      if (this.encryptedArr[i].charCodeAt() > 64 && this.encryptedArr[i].charCodeAt() < 91) { // if char is uppercase letter
        let offset = this.secretKey[counter].charCodeAt() - 65; // set offset to a number between 0 to 25 — repressenting alphabet letters indexes 
        let defaultChar = this.encryptedArr[i].charCodeAt() - 65; // set default char to a number between 0 to 25 — repressenting alphabet letters indexes 
        let decryptedChar = ''; // variable to store the decrypted letter

        decryptedChar = defaultChar - offset + 65; // apply the offset and 65 to return the value to the correct charCode
        if (decryptedChar < 65) { // if the result is negative — less then (A), add alphabet length (26) to the result to simulate the "reverse" calculation
          decryptedChar += 26;
        }

        decryptedChar = String.fromCharCode(decryptedChar); // convert letter's charCode to string
        this.decrypted.push(decryptedChar); // push decrypted letter to the main result array

        // check if need to restart the secretKey's counter — if the secret key word is ended end needs to start over in the next iteration
        if (counter + 1 > this.secretKey.length - 1) { // if so, restart the counter. esle increment
          counter = 0;
        } else {
          counter++;
        }

      } else { // if char is not uppercase letter, don't encypt, just push as it is.
        this.decrypted.push(this.encryptedArr[i]); // is a space or any symbol, so just push it into the final array
      }

    }
    // if direct machine — return as string, else if reversed machine — reverse and return as string
    return this.direct ? this.decrypted.join('') : this.decrypted.reverse().join('');
  }
}

module.exports = VigenereCipheringMachine;
