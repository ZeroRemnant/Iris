const validator = require("validator");

class Validator {
  static isRFC(rfc) {
    const regex =
      /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/;
    return regex.test(rfc);
  }

  static isEmail(email) {
    return validator.isEmail(email);
  }

  static isCURP(curp) {
    const regex =
      /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
    return regex.test(curp);
  }

  static isName(name) {
    const regex =
      /[a-z,A-Z,á,é,í,ó,ú,â,ê,ô,ã,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ã,Õ,Ç,ü,ñ,Ü,Ñ,' ']+/;
    const junkCharsRegex = /[\x20-\x40\x5b-\x60\x7b-\x7e]/g;
    return name !== "" && regex.test(name) && !junkCharsRegex.test(name);
  }
}
module.exports = Validator;
