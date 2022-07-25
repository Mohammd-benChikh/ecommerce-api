import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongodbConnect from './config/mongodbConnect.js';
import fileUpload from 'express-fileupload';

import productRouter from './routes/prodcutRouter.js';
import adminRouter from './routes/admin/index.js';

dotenv.config({});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 2 * 1024 * 1024 },
}))

const port = process.env.PORT;

app.get('/',(req,res) => {
    return res.send('Hello simo');
})

app.use('/api/products',productRouter);
app.use('/api/admin',adminRouter);


/* mongodbConnect()
.then(() => {
    app.listen(port,() => console.log(`Ecommerce server running on port ${port}`));
}).catch(error => {
    console.log(error);
})

 */

app.listen(port,() => console.log(`Ecommerce server running on port ${port}`));