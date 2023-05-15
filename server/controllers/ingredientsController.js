const {db} = require('../firebase');
const axios = require('axios');
process.config;
function newIngredient (name, img, timestamp, qty){
    return {
        ingredient_name : name,
        ingredient_img : img, 
        timestamp : timestamp, 
        ingredient_qty : qty,
    }
}

// api/ingredients/:pantry_id
exports.getIngredients = async (req, res) => {
    try{
        const ingredientsRef = await db.collection('pantries').doc(req.params.pantry_id).collection('ingredients');
        const ingredientsSnapshot = await ingredientsRef.get();
        if (!ingredientsSnapshot.exists){
            return res.status(200).json([])
        }
        let ingredients = [];
        ingredientsSnapshot.forEach( (ingredient) => {
            ingredients.push({
                ingredient_id: ingredient.id,
                ...ingredient.data() 
            })
        })
        res.status(200).json(ingredients);
    }catch (err) {
        console.log(err)
        res.status(400).send("Error getting ingredients.")
    }
}

exports.postIngredients = async (req, res) => {
    try{
        //
        if(!req.body.ingredients){
            return res.status(400).send("Missing body params");
        }
        //Get ref to database
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const ingredientsRef = await pantryRef.collection('ingredients');
        //Get array of ingredients
        const ingredientsArray = req.body.ingredients;
        //Create a response array
        const ingredientsRes = ingredientsArray.map( (ingredient) => {
            const ingredientObj = newIngredient(ingredient, '', Date.now(), 1);
            const result = ingredientsRef.doc(ingredient).set(ingredientObj);
            return ingredientObj;
        })
        console.log(ingredientsRes);
        res.status(200).json(ingredientsRes);
    }catch (err) {
        console.log(err)
        res.status(400).send("Failed to write new ingredient obj");
    }
}


// api/ingredients/:pantry_id/:ingredient_id
exports.getIngredient = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const ingredientRef = await pantryRef.doc(req.params.pantry_id).collection('ingredients').doc(req.params.ingredient_id);
        const ingredientsSnapshot = await ingredientRef.get();

        res.status(200).json(ingredientsSnapshot.data());
    }catch (err) {
        res.status(400).send("Error getting ingredient.");
    }
}
exports.putIngredient = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const ingredientRef = await pantryRef.collection('ingredients').doc(req.params.ingredient_id);
        const result = await ingredientRef.update({ingredient_name: req.body.ingredient_name, ingredient_description: req.body.ingredient_description})
        res.status(200).send("Success!");
    }catch (err) {
        res.status(400).send("Failed to update ingredient obj.");
    }
}

exports.delIngredient = async (req, res) => {
    try{
        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const ingredientRef = await pantryRef.collection('ingredients').doc(req.params.ingredient_id);
        const result = await ingredientRef.delete();
        res.status(200).send("Success!");
    }catch (err) {
        res.status(400).send("Failed to delete ingredient obj.");
    }
}
