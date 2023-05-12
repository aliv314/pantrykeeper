const {db} = require('../firebase');


function newPantry (owner_id, owner_name, pantry_name, pantry_img, num_ingredients, num_leftovers){
    return{
        owner_id : owner_id,
        owner_name : owner_name,
        pantry_name: pantry_name,
        pantry_img: pantry_img,
        num_ingredients : num_ingredients,
        num_leftovers : num_leftovers,
    }    
}

/*
    WITHOUT ID / PARAMS
*/

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

/*
    WITH PARAMS
*/

//PARAM: PANTRYID
//REQ: USERID

exports.getPantry = async (req, res) => {
    try{
        const userRef = await db.collection('users').doc(req.body.userId);
        const userSnapshot = await userRef.get();

        if(!userSnapshot.exists){
            return res.status(404).send("User not found.");
        }

        const pantrySnapshot = await userRef.collection('pantries').doc(req.params.pantryId).get();
        const pantry = pantrySnapshot.data()

        res.status(200).json(pantry);
    }catch(error){
        res.status(404).send("Error getting pantries.")
    }
}

exports.putPantry = async (req, res) => {
    try{
        const userRef = await db.collection('users').doc(req.body.userId)
        const pantryRef = await userRef.collection('pantries').doc(res.params.pantryId);

        const result = pantryRef.update({pantry_name: pantryName, pantry_img: pantryImg});
    
        res.status(200).send("Success!");
    }catch(error){
        res.status(400).send("Error posting new pantry.");
    }
}

exports.delPantry = async(req, res) => {
    try{
        const userRef = await db.collection('users').doc(req.body.userId)
        const pantryRef = await userRef.collection('pantries').doc(res.params.pantryId);
        const result = pantryRef.delete();

        res.status(200).send('Success!');
    }catch(error){
        res.status(400).send("Error deleting pantry")
    }
}   