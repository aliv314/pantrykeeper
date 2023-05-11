const {db} = require('../firebase');


function newPantry (owner_id, owner_name, timestamp, icon, num_ingredients, num_leftovers){
    return{
        owner_id : owner_id,
        owner_name : owner_name,
        timestamp : timestamp,
        icon : icon,
        num_ingredients : num_ingredients,
        num_leftovers : num_leftovers,
    }    
}

//REQ: USERID
//RES: [{PANTRYOBJ}]
exports.getPantries = async(req, res) => {
    try{
        const userRef = await db.collection('users').doc(req.body.userId);
        const userSnapshot = await userRef.get();

        if(!userSnapshot.exists){
            return res.status(404).send("User not found.");
        }

        const pantriesSnapshot = await userRef.collection('pantries').get();

        let pantries = []
        pantriesSnapshot.forEach( (doc) => {
            pantries.push(doc.data());
        })
        res.status(200).json(pantries);
    }catch(error){
        res.status(404).send("Error getting pantries.")
    }
}


//PARAM: PANTRYID
//REQ: USERID

exports.getPantry = async (req, res) => {
    try{
        const userRef = await db.collection('users').doc(req.body.userId);
        const pantrySnapshot = await userRef.collection('pantries').doc(req.params.pantryId).get()
        if (!pantrySnapshot.exists){
            res.status(404).send("Pantry not found.");
        }
        const pantry = pantrySnapshot.data();
        res.status(200).json(pantry);
    }catch(error){
        res.status(400).send("Error getting pantry");
    }
}

exports.postPantry = (req, res) => {
    
}

exports.putPantry = (req, res) => {
    
}

exports.delPantry = (req, res) => {
    
}