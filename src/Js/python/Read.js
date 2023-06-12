/* This File is used to Find Data From Database. */

import findValidator from "../Validator/FindValidator"; // Import the findValidator function from the FindValidator.js file.

// Main Find Function
export async function Find(Filter, model) {
    const validate = await findValidator(Filter); // Validate the Filter
    if(validate === false) return []; // If the Filter is not valid then return false.
    if(Filter.length === 0){
        const result = await model.find({}); // find the document
        return result; // return the result
    }
    else if(Filter.length !== 0){
        const result = await model.find({$and:Filter}); // find the document
        return result; // return the result
    }
} // Export the Find function.