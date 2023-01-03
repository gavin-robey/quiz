/**
 * Given an encoded string representation of an array or JSON,
 * JSON.parse() is used to convert the string to a valid array or JSON
 * @param {string} array 
 * @returns {object or array}
 */
function parseArray(array){
    array = array.replace(/&#x27;/g,"\'");
    array = array.replace(/&amp;/g,"\&");
    array = array.replace(/&quot;/g,"\"");
    array = JSON.parse(array);
    return array;
}



