export default class CartDTO {
    constructor(cart) {
        //this.products = cart.products
    }

}
/*
static getCartResponseForRole = (cart, role) => {
    switch (role) {
      case "admin":
        return {
         
        };
      default:
        return {
           
        };
    }
  }; 

    Modificar el dto de cart:
*     devolver todos los carritos completos sin __v al admin. sin permisos a otro rol
*     solamente devolver el carrito al usuario logueado con sus producto. sacar el __v y el id
* 
*/