/* This File is used to Find Data From Database. */

import findValidator from "../Validator/FindValidator"; // Import the findValidator function from the FindValidator.js file.

/**
 * The Find function takes in a filter, model, and limit, validates the filter, and returns the result
 * of finding documents in the model based on the filter and limit.
 * @param Filter - The filter is an array of objects that specifies the conditions that the documents
 * must meet in order to be returned by the find function.
 * @param model - The model parameter is a reference to a Mongoose model that represents a MongoDB
 * collection. It is used to perform database operations such as finding documents that match a certain
 * criteria.
 * @param limit - The limit parameter is used to specify the maximum number of documents to be returned
 * by the find function. It limits the number of documents that will be returned in the result set.
 * @returns The Find function is returning either an empty array if the Filter is not valid, or an
 * array of documents that match the Filter and are limited by the specified limit.
 */
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
