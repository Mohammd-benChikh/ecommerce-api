import { Router } from "express";
const router = new Router();

router.post('/login',(req,res) => {
    res.send('admin login router');
});


export default router;