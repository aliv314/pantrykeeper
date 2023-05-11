const {db} = require('../firebase');

function Users(friendCode) {
    return {
        friendCode: friendCode,
    }
}

//Posts user Friend code to 
exports.postUser = (req, res) => {
    
}