import { Schema } from "mongoose";
import { ManagerMongoDB } from "../db/ManagerMongoDB.js";

const cartCollection = "carts";

const cartSchema = new Schema({
  products: [
    {
      prodId: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});
//POPULATE
cartSchema.pre("find", function () {
  this.populate("products.prodId");
});

export class CartManagerMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.URL_MONGODB, cartCollection, cartSchema);
  }
  async getCartPopulate(id) {
    this.setConnection();
    try {
      return await this.model.findById(id).populate("products.prodId");
    } catch (error) {
      console.log(error);
    }
  }
  async addProductFromCart(cartId, productId) {
    try {
      const quantity = 1;
      const cart = await this.getElementById(cartId);
      if (!cart) return false;

      const productIndex = cart.products.findIndex(
        (product) => product.prodId.toString() == productId
      );

      if (productIndex == -1) {
        cart.products.push({ prodId: productId, quantity: quantity });
      } else {
        let res = (cart.products[productIndex].quantity += 1);
      }
      const res = await cart.save();
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAllProductsFromCartById(cartId) {
    try {
      const cart = await this.getElementById(cartId);
      cart.products = [];
      const updateCart = await this.updateElement(cartId, cart);
      await updateCart.save();
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductCart(cid, pid) {
    try {
      const cart = await this.getElementById(cid);
      const deletectedProduct = cart.products.filter(
        (prod) => prod.prodId.toString() !== pid
      );
      cart.products = deletectedProduct;
      await cart.save();
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async updateCartById(cid, products) {
    try {
      const cart = await this.getElementById(cid);
      console.log("Soy el cart: " + cart); //PRUEBA
      if (!cart) throw new Error("Cart not found");
      cart.products = products;
      await cart.save();
      console.log("Soy el nuevo cart: " + cart); //PRUEBA
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProductCart(cid, pid, quantity) {
    try {
      const cart = await this.getElementById(cid);
      if (!cart) throw new Error("Cart not found");
      const productIndex = cart.products.findIndex(
        (product) => product.prodId.toString() === pid
      );
      console.log(`Soy el product ${productIndex}`); //PRUEBA
      if (!productIndex) throw new Error("Product not found");
      const updateQuantity = (cart.products[productIndex].quantity = quantity);
      await cart.save();
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  //PRUEBAS********************
}

export const cartManager = new CartManagerMongoDB();
