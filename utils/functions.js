import mongoose from "mongoose";

export const validObjectId = (id) => {
    const ObjectId = mongoose.Types.ObjectId;
    return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

export const paginationQuery = (query) => {
    const sortDirections = ['asc', 'desc'];
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const sortBy = query.sortBy ?? "createdAt";
    const sortDir = query.sortDir ? (sortDirections.includes(query.sortDir) ? query.sortDir : 'desc') : "desc";
    return { page, limit, sortDir, sortBy };
}
