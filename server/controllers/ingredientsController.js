const {db} = require('../firebase');
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

exports.postIngredient = async (req, res) => {
    try{
        if(!req.body.ingredient_name){
            return res.status(400).send("Missing body params");
        }

        const pantryRef = await db.collection('pantries').doc(req.params.pantry_id);
        const ingredientsRef = await pantryRef.collection('ingredients');

        const ingredientObj = newIngredient(req.body.ingredient_name, req.body.ingredient_img, Date.now(), 1);
        const result = await ingredientsRef.add(ingredientObj);
        res.status(200).send("Success!");
    }catch (err) {
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
