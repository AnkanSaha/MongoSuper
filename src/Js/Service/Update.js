/* This File is used to update Data in Database. */

import findValidator from "../Validator/FindValidator"; // Importing Find Validator

export async function Update(Filter, data, model, MultiUpdate, FindFunc) {
    try {
        const Verification = await findValidator(Filter); // Verifying the Filter
        if (Verification === true) {
            // If Verification is true then it will proceed
            if (MultiUpdate === false) {
                // If MultiUpdate is False then it will update only one data
                const result = await model.updateOne(Filter[0], data);
                if (!result) {
                    // If result is null then it will return false
                    return {
                        status: false,
                        message: "Failed to Update Data",
                        UpdatedCount: 0,
                        UpdatedData: null
                    };
                } else if (result) {
                    // If result is not null then it will return true
                    if (result.modifiedCount === 0) {
                        return {
                            status: false,
                            message:
                                "Failed to Update Data, May be Data is not available",
                            UpdatedCount: result.modifiedCount,
                            UpdatedData: undefined
                        };
                    } else {
                        const UpdatedData = await model.find(Filter[0]); // Finding the Updated Data
                        return {
                            status: true, // Returning the Status
                            message: "Data Updated Successfully", // Returning the Message
                            UpdatedCount: result.modifiedCount, // Returning the Updated Count
                            UpdatedData: UpdatedData[0] // Returning the Updated Data
                        };
                    }
                }
            } else if (MultiUpdate === true) {
                const result = await model.updateMany({ $and: Filter }, data);
                if (!result) {
                    return {
                        status: false,
                        message: "Failed to Update Data",
                        UpdatedCount: 0,
                        UpdatedData: null
                    };
                } else if (result) {
                    if (result.modifiedCount === 0) {
                        return {
                            status: false,
                            message:
                                "Failed to Update Data, May be Data is not available",
                            UpdatedCount: result.modifiedCount,
                            UpdatedData: undefined
                        };
                    } else {
                        return {
                            status: true,
                            message: "Data Updated Successfully",
                            UpdatedCount: result.modifiedCount,
                            UpdatedData: await model.find({ $and: Filter })
                        };
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: "Failed to Update Data",
            UpdatedCount: 0,
            UpdatedData: null
        };
    }
} // Main Update Function
