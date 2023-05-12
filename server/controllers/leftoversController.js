const {db} = require('../firebase');

function newLeftovers (leftover_name, leftover_desc, leftover_img, timestamp, leftover_qty){
    return {
        leftover_name : leftover_name,
        leftover_description : leftover_desc,
        leftover_img : leftover_img,
        timestamp : timestamp,
        leftover_qty : leftover_qty,
    }
}


exports.getIngredients = (req, res) => {
    
}

exports.getIngredient = (req, res) => {

}

exports.postIngredient = (req, res) => {

}

exports.putIngredient = (req, res) => {

}

exports.delIngredient = (req, res) => {

}
