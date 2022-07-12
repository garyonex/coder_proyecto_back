import { Router } from "express";
const logoutRoutes = Router()

logoutRoutes.get('/',(req,res)=>{
    if( req.session.user && req.cookies.user_sid){
        res.redirect('/')
    } else{
        res.redirect('/login')
    }
})
export default logoutRoutes