/* This File is used to Create Data in Database. */

export async function Create(data, model) {
    try {
        const result = await model(data).save(); // Create the document and save it to the database.
        if (!result) {
            return {
                status: false,
                message: "Failed to Create Data",
                data: null
            };
        } else if (result) {
            return {
                status: true,
                message: "Successfully Created Data",
                NewCount: [result].length,
                NewData: [result]
            };
        }
    } catch (err) {
        return console.log(err); // return the error
    }
} // Main Create Function
