const {db} = require('../firebase');


function newPantry (owner_id, owner_name, pantry_name, pantry_img, num_foods, num_dishes, num_ingredients){
    return{
        owner_id : owner_id,
        owner_name : owner_name,
        pantry_name: pantry_name,
        pantry_img: pantry_img,
        num_foods : num_foods,
        num_dishes: num_dishes,
        num_ingredients: num_ingredients,
    }    
}

/*
    WITHOUT ID / PARAMS
*/

//REQ: USERID, OWNERNAME, OWNERID, TIMESTAMP, ICON, NUM_INGREDIENTS, NUM_LEFTOVERS
//RES: Success!
exports.postPantry = async (req, res) => {
    try{
        if (!req.body.ownerId || !req.body.ownerName || !req.body.pantryName){
            return res.status(400).send("Missing parameters");
        }

        const pantryObj = newPantry(req.body.ownerId, req.body.ownerName, req.body.pantryName, '', 0, 0, 0);
        const result = await db.collection('pantries').add(pantryObj);
        res.status(200).json(pantryObj);
    }catch(error){
        console.log(error);
        res.status(400).send("Error posting new pantry.");
    }
}

/*
    WITH PARAMS
*/
//PARAM: PANTRYID
//REQ: USERID

exports.getPantry = async (req, res) => {
    try{
        const pantrySnapshot = await db.collection('pantries').doc(req.params.id).get();
        const pantry = pantrySnapshot.data()

        res.status(200).json(pantry);
    }catch(error){
        console.log(error)
        res.status(404).send("Error getting pantries.")
    }
}

exports.putPantry = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.id);
        const result = pantryRef.update({pantry_name: req.body.pantry_name});
    
        res.status(200).send("Success!");
    }catch(error){
        console.log(error)
        res.status(400).send("Error posting new pantry.");
    }
}

exports.delPantry = async(req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(res.params.id);
        const result = pantryRef.delete();
        
        res.status(200).send('Success!');
    }catch(error){
        console.log(error)
        res.status(400).send("Error deleting pantry")
    }
}   