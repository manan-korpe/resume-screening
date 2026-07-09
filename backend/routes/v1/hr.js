import {Router} from "express";
const router = Router();

router.get("/",(req,res)=>{
    res.end("<h1>working</h1>");
});

export default router;