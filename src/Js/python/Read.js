/* This File is used to Find Data From Database. */

import findValidator from "../Validator/FindValidator"; // Import the findValidator function from the FindValidator.js file.

// Main Find Function
export async function Find(Filter, model, limit) {
    try {
        const validate = await findValidator(Filter); // Validate the Filter
        if (validate === false) return []; // If the Filter is not valid then return false.
        if (Filter.length === 0) {
            const result = await model.find({}).limit(limit); // find the document
            return result; // return the result
        } else if (Filter.length !== 0) {
            const result = await model.find({ $and: Filter }).limit(limit); // find the document
            return result; // return the result
        }
    } catch (err) {
        console.log(err);
    } // catch any errors
} // Export the Find function.
