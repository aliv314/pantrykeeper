const {db} = require('../firebase');
const axios = require('axios');
process.config;

function newFood (name, img, timestamp, qty, type, user){
    return {
        food_name : name,
        food_img : img, 
        timestamp : timestamp, 
        food_qty : qty,
        food_type: type,
        user: user
    }
}

// api/foods/:pantry_id
exports.getFoods = async (req, res) => {
    try{
        const foodsRef = await db.collection('pantries').doc(req.params.pantry_id).collection('foods');
        const foodsSnapshot = await foodsRef.get();
        if (foodsSnapshot.exists){
            return res.status(200).json([])
        }
        let foods = [];
        foodsSnapshot.forEach( (food) => {
            foods.push({
                food_id: food.id,
                ...food.data() 
            })
        })
        res.status(200).json(foods);
    }catch (err) {
        console.log(err)
        res.status(400).send("Error getting foods.")
    }
}

exports.postFoods = async (req, res) => {
    try{
        if(!req.body.foods){
            return res.status(400).send("Missing body params");
        }
        //Get ref to database
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const foodsRef = await pantryRef.collection('foods');

        //Get array of foods
        const foodsArray = req.body.foods;
        //Create a response array
        const foodsRes = foodsArray.map( (food) => {
            const foodObj = newFood(food.name, '', Date.now(), 1, food.type, food.user);
            const result = foodsRef.doc(food.name).set(foodObj);
            return foodObj;
        })
        res.status(200).json(foodsRes);
    }catch (err) {
        console.log(err)
        res.status(400).send("Failed to write new food obj");
    }
}


// api/foods/:pantry_id/:food_id
exports.getFood = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const foodRef = await pantryRef.doc(req.params.pantry_id).collection('foods').doc(req.params.food_id);
        const foodsSnapshot = await foodRef.get();

        res.status(200).json(foodsSnapshot.data());
    }catch (err) {
        res.status(400).send("Error getting food.");
    }
}
exports.putFood = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const foodRef = await pantryRef.collection('foods').doc(req.params.food_id);
        const result = await foodRef.update({food_name: req.body.food_name, food_description: req.body.food_description})
        res.status(200).send("Success!");
    }catch (err) {
        res.status(400).send("Failed to update food obj.");
    }
}

exports.delFood = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const foodRef = await pantryRef.collection('foods').doc(req.params.foods_id);
        const result = await foodRef.delete();
        res.status(200).send("Success!");
    }catch (err) {
        console.log(err)
        res.status(400).send("Failed to delete food obj.");
    }
}
