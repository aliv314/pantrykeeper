const {db} = require('../firebase');

function Users(friendCode) {
    return {
        friendCode: friendCode
    }
}

//Posts user Friend code to 
exports.postUser = async (req, res) => {
    try{
        const result = await db.collection('users').doc(req.body.userId).set({
            friendCode: req.body.friendCode,
        })
        res.status(200).send(result);
    }catch(e){
        res.status(400).send("Error updating user.");
    }
}