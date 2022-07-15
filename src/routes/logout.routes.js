import { Router } from "express";
const logoutRoutes = Router()

// logoutRoutes.get('/',(req,res)=>{
//     if( req.session.user && req.cookies.user_sid){
//         res.redirect('/')
//     } else{
//         res.redirect('/login')
//     }
// })

logoutRoutes.get('/',(req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/login')
        console.log(err)
    })
})
export default logoutRoutes