const { default: Pantries } = require('../../client/src/pages/Pantries/Pantries');
const {db} = require('../firebase');

function newLeftovers (leftover_name, leftover_description, leftover_img, timestamp, leftover_qty){
    return {
        leftover_name : leftover_name,
        leftover_description : leftover_description,
        leftover_img : leftover_img,
        timestamp : timestamp,
        leftover_qty : leftover_qty,
    }
}

// api/leftovers/:pantry_id
exports.getLeftovers = (req, res) => {
    try{
        const leftoversRef = db.collection('pantries').doc(req.params.pantry_id).collection('leftovers').get();
        const leftoversSnapshot = leftoversRef.get();
        let leftovers = [];
        leftoversSnapshot.forEach( (leftover) => {
            leftovers.push({
                leftover_id: leftover.id,
                ...leftover.data() 
            })
        })
        res.status(200).json(leftovers);
    }catch (err) {
        res.status(400).send("Error getting leftovers.")
    }
}

exports.postLeftover = (req, res) => {
    try{
        if(!req.body.leftover_name){
            return res.status(400).send("Missing body params");
        }

        const pantryRef = db.collection('pantries').doc(req.params.pantry_id);
        const leftoversRef = pantryRef.collection('leftovers');

        const leftoverObj = newLeftovers(req.body.leftover_name, req.body.leftover_description
            , '', Date.now(), 1);
        const result = leftoversRef.add(leftoverObj);
        res.status(200).send("Success!");
    }catch (err) {
        res.status(400).send("Failed to write new leftover obj");
    }
}


// api/leftovers/:pantry_id/:leftover_id
exports.getLeftover = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const leftoverRef = await pantryRef.doc(req.params.pantry_id).collection('leftovers').doc(req.params.leftover_id);
        const leftoversSnapshot = leftoverRef.get();

        res.status(200).json(leftoversSnapshot.data());
    }catch (err) {
        res.status(400).send("Error getting leftover.");
    }
}
exports.putLeftover = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const leftoverRef = await pantryRef.collection('leftovers').doc(req.params.leftover_id);
        const result = leftoverRef.update({leftover_name: req.body.leftover_name, leftover_description: req.body.leftover_description})
        res.status(200).send("Success!");
    }catch (err) {
        res.status(400).send("Failed to update leftover obj.");
    }
}

exports.delLeftover = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const leftoverRef = await pantryRef.collection('leftovers').doc(req.params.leftover_id);
        const result = leftoverRef.delete();
        res.status(200).send("Success!");
    }catch (err) {
        res.status(400).send("Failed to delete leftover obj.");
    }
}
