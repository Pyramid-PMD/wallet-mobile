export const required = (value, message) => {
    console.log('message', message);
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
