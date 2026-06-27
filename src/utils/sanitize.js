const sanitize = require('sanitize-html');

module.exports = (value) => {
    if (typeof value !== 'string') {
        return value;
    } else {
        return sanitize(value, {
            allowedTags: [],
            allowedAttributes: []
        })
    }
};