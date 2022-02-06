const validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.handle = validText(data.handle) ? data.handle : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';

    if (!validator.isLength(data.handle, { min: 2, max: 30 })) {
        errors.handle = "Handle must be between 2 and 30 characters.";
    };

    if (validator.isEmpty(data.handle)) {
        errors.handle = "Handle cannot be blank.";
    };

    if (validator.isEmpty(data.email)) {
        errors.email = "Email cannot be blank.";
    };

    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    };

    if (validator.isEmpty(data.password)) {
        errors.password = "Password cannot be blank.";
    };

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters.";
    };

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match.";
    };

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}