import { cartManager } from "../models/cart.model.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await cartManager.getElements();
    res.status(200).json({ status: "succes", data: carts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
export const createCart = async (req, res) => {
  try {
    const response = await cartManager.addElements();
    res.status(201).json({ message: "Created cart", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
export const getCartById = async (req, res) => {
  try {
    const id = req.params.cid;
    const response = await cartManager.getCartPopulate(id);
    if (!response) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json({ status: "succes", data: response });
  } catch (error) {
    console.log("Error during cart creation: ", error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
export const addProductFromCart = async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const response = await cartManager.addProductFromCart(idCart, idProduct);
    if (!response) {
      res.status(404).json({ message: "Product Not Found" });
    } else {
      res.status(201).json({ message: "Producto agregado al carrito" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
export const deleteAllProductsFromCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await cartManager.deleteAllProductsFromCartById(cid);
    res.status(200).json({ message: "Productos eliminados del cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const response = cartManager.deleteProductCart(cid, pid);
    res.status(200).json({
      status: "succes",
      message: `Producto con id:${pid} eliminado correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
export const updateCartById = async (req, res) => {
  try {
    const { products } = req.body;
    const { cid } = req.params;
    const response = await cartManager.updateCartById(cid, products);
    res.status(200).json({
      status: "succes",
      message: `cart con id:${cid} actualizado correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
export const updateProductCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const response = await cartManager.updateProductCart(cid, pid, quantity);
    res.status(200).json({
      status: "succes",
      message: `cart con id:${cid} y product con id:${pid} actualizado correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
//PRUEBAS*****************
/*
export const getProductFromCart = async (req, res) => {};
*/
