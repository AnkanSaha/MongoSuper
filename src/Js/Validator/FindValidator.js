/* This file is used to find the validator file and import it. */

export default async function findValidator(Filter) {
    if(Filter === undefined){
        console.log("Filter is undefined");
        return false;
    }
    else if(Filter === null){
        console.log("Filter is null");
        return false;
    }
    else if(Array.isArray(Filter) === false){
        console.log("Filter is not in correct format, please provide an array of objects");
        return false;
    }
    else if(typeof Filter === "string"){
        console.log("Filter is a string, please provide an array of objects");
        return false;
    }
    else if(typeof Filter === "number"){
        console.log("Filter is a number, please provide an array of objects");
        return false;
    }
    else if(typeof Filter === "boolean"){
        console.log("Filter is a boolean, please provide an array of objects");
        return false;
    }
    else if(Array.isArray(Filter) === true){
        return true;
    }
}