const {db} = require('./firebase');


function Pantry (owner_id, owner_name, timestamp, icon, num_ingredients, num_leftovers){
    return{
        owner_id : owner_id,
        owner_name : owner_name,
        timestamp : timestamp,
        icon : icon,
        num_ingredients : num_ingredients,
        num_leftovers : num_leftovers,
    }
    
}