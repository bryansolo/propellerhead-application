var statusEnum = ["prospective", "current", "non-active"];

module.exports = {
    isValid: isValid
}

function isValid(toValidate) {
    
    if (toValidate.status && statusEnum.indexOf(toValidate.status.toLowerCase()) === -1) {
        return "Customer status can only be: " + statusEnum;
    }
    
    if (!toValidate.firstName || typeof(toValidate.firstName) !== "string") {
        return "Customer must have a first name";
    }
    
    if (toValidate.lastName && typeof(toValidate.lastName) !== "string") {
        return "Invalid last name provided for Customer";
    }
    
    if (toValidate.email) {
        if (!typeof(toValidate.email) === "string" || toValidate.email.indexOf("@") === -1) {
            return "Invalid email address provided";
        }
    }
    
    if (toValidate.notes) {
        if (!Array.isArray(toValidate.notes)) {
            return "Customer notes should be an array of Strings";
        }
    }
    
    return true;
}