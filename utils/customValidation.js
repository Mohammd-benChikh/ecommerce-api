import mongoose from "mongoose";


export const isObjectId = (id, message) => {
    const { isValidObjectId } = mongoose;
    if (!isValidObjectId(id)) {
        throw new Error(message);
    }
    return true;
}

export const isObjectExists = async (model, filter, message) => {
    return model.findOne(filter)
    .then((obj) => {
        if(obj){
            return true;
        }
        throw new Error(message);
    })
}