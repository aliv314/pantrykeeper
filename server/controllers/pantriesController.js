const {db} = require('../firebase');


function newPantry (owner_id, owner_name, pantry_name, icon, num_ingredients, num_leftovers){
    return{
        owner_id : owner_id,
        owner_name : owner_name,
        pantry_name: pantry_name,
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
        });
        res.status(200).json(pantries);
    }catch(error){
        res.status(404).send("Error getting pantries.")
    }
}
//REQ: USERID, OWNERNAME, OWNERID, TIMESTAMP, ICON, NUM_INGREDIENTS, NUM_LEFTOVERS
//RES: 
exports.postPantry = async (req, res) => {
    try{
        const userRef = await db.collection('users').doc(req.body.userId)
        if (!req.body.userId || !req.body.userName || !req.body.pantryName){
            return res.status(400).send("Missing parameters");
        }

        const pantryObj = newPantry(req.body.userId, req.body.userName, req.body.pantryName, 
            '', 0, 0);
        const result = await userRef.collection('pantries').add(pantryObj);
        res.status(200).send("Success!");
    }catch(error){
        res.status(400).send("Error posting new pantry.");
    }
}

//PARAM: PANTRYID
//REQ: USERID

exports.getPantry = async (req, res) => {
    try{
        const userRef = await db.collection('users').doc(req.body.userId)
        if (!req.body.userId || !req.body.userName || !req.body.pantryName){
            return res.status(400).send("Missing parameters");
        }

        const pantryObj = newPantry(req.body.userId, req.body.userName, req.body.pantryName, 
            '', 0, 0);
        const result = await userRef.collection('pantries').add(pantryObj);
        res.status(200).send("Success!");
    }catch(error){
        res.status(400).send("Error posting new pantry.");
    }
}

exports.putPantry = async (req, res) => {

}

exports.delPantry = (req, res) => {
    
}