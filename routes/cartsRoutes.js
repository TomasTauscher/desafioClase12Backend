import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import passport from "passport";

const router = Router()


router.post("/", authorization("user"), async (req, res) => {

    try{

        const cart = await cartDao.create()

        res.status(201).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"),  async (req, res) => {

    try{
        const {cid, pid} = req.params
        const cart = await cartDao.addProductToCart(cid, pid)
        if(cart.product === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${pid}`})
        if(cart.cart === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${cid}`})

        res.status(200).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), async (req, res) => {

    try{
        const {cid, pid} = req.params
        const { quantity } = req.body
        const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity)
        if(cart.product === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${pid}`})
        if(cart.cart === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${cid}`})

        res.status(200).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), async (req, res) => {

    try{
        const {cid, pid} = req.params
        const cart = await cartDao.deleteProductInCart(cid, pid)
        if(cart.product === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${pid}`})

        res.status(200).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.get("/:cid", passportCall("jwt"), authorization("user"), async (req, res) => {

    try{
        const {cid} = req.params
        const cart = await cartDao.getById(cid)
        if(!cart) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con el id ${cid}`})

        res.status(200).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})


router.put("/:cid", passportCall("jwt"), authorization("user"), async(req, res) => {
    try{
        const { cid } = req.params;
        const body = req.body;
        const cart = await cartDao.update(cid, body)
        if(!cart) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con el id ${cid}`})


        res.status(200).json({ status: "success", payload: cart})
    }
    catch{
        console.log(error)
        res.status(500).json({ status: "Error", msg: "Error interno del servidor"})
    }
})
router.delete("/:cid", passportCall("jwt"), authorization("user"), async(req, res) => {
    try{
        const { cid } = req.params;
        const cart = await cartDao.deleteAllProductsInCart(cid)
        if(!cart) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con el id ${cid}`})


        res.status(200).json({ status: "success", payload: cart})
    }
    catch{
        console.log(error)
        res.status(500).json({ status: "Error", msg: "Error interno del servidor"})
    }
})



export default router;