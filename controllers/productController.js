import Product from "../models/Product.js";

const getProducts = async (req,res) => {
    try{
        const products = await Product.find();
        return res.json(products);
    }catch(error){
        return res.status(400).send(error.message);
    }
}


export default { getProducts }