const sha3 = require("crypto-js/sha3");

export const required = (value, message) => {
    return value ? undefined : message;
};

export const email = (value, message) => {
    if (value) {
        return (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)) ?  undefined : message;
    }
};

export const matchField = (value, matchedValue, message) => {
    if (value && matchedValue) {
        return value !== matchedValue ? message : undefined;
    }
};


export const minLength = (value, prop, message) => {
    return prop && value ? value.length < prop ? undefined : message : undefined;
};

export const maxLength = (value, prop) => {
    return prop && value ? value.length > prop ? undefined : message : undefined;
};


export const lengthBetween = (value, range, message) => {
    if (value && range.min && range.max) {
        return !(value.length > range.min && value.length < range.max) ? message : undefined;
    }
};



/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
const isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    const addressHash = sha3(address.toLowerCase());
    for (let i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
export const isAddress =  (address) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};


export const isEmail = (value) => {
    if (value) {
        return (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value));
    }
};