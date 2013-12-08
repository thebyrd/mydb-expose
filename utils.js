

var signature = require('cookie-signature')


/**
 * Parse signed cookies, returning an object
 * containing the decoded key/value pairs,
 * while removing the signed key from `obj`.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

exports.parseSignedCookies = function(obj, secret){
  var ret = {};
  Object.keys(obj).forEach(function(key){
    var val = obj[key];
    if (0 == val.indexOf('s:')) {
      val = signature.unsign(val.slice(2), secret);
      if (val) {
        ret[key] = val;
        delete obj[key];
      }
    }
  });
  return ret;
};

/**
 * Parse a signed cookie string, return the decoded value
 *
 * @param {String} str signed cookie string
 * @param {String} secret
 * @return {String} decoded value
 * @api private
 */

exports.parseSignedCookie = function(str, secret){
  return 0 == str.indexOf('s:')
    ? signature.unsign(str.slice(2), secret)
    : str;
};
