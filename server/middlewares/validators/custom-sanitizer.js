'use strict';

let CustomSanitizer = {};
let moment = require('moment');

CustomSanitizer.cleanState = function(value){
    return value.toString().toUpperCase().replace('STATE', '');
};

CustomSanitizer.toDOB = function(value){
    if(!value)
        return null;

    let spl = value.split('-');

    if(spl.length !== 3)
        return null;

    if(spl[2].length === 4)
        value = spl.reverse().join('-');

    return value;
};
CustomSanitizer.toDate = function(input){
    if(!moment(input,"DD-MM-YYYY", true).isValid()){
        return null;
    }
    let newInput = input.split("-");
    let date = new Date(newInput[2], newInput[1]-1, newInput[0]);
    return date;
}

module.exports = CustomSanitizer;
