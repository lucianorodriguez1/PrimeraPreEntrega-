import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import config from "./config/config.js";
import initializatePassport from "./utils/passport.js";
import errorHandler from "./middlewares/errorHandler.js";
import routeErrorHandler from "./middlewares/routeErrorHandler.js";
import { addLogger } from "./utils/logger.js";
import routes from "./routes/index.js";
import viewsRouter from "./routes/views.routes.js";

const app = express();
const __dirname = path.resolve();
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`listening to the server on PORT ${config.port}`);
});

//generar documentacion api
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion de e-commerce coder",
      description: "API para el ecommerce",
    },
  },
  apis: [`${path.join(__dirname)}/src/docs/**/*.yaml`],
};
const specs = swaggerJsDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.use(addLogger);
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      ttl: 1500,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

app.use(routeErrorHandler);
app.use(errorHandler);

//Guardar:
/**
 * 
 */

//Realizar
/*
 * Desafio Documentar 2 modulos de mi app:
 *    documentar el modulo API DE productos
 *    documentar el modulo API de carts
 * 
 * Desafio Test en 3 modulos:
 *    desarrollar 3 test(mocha,cai y supertest) para routers de products
 *    desarrollar 3 test(mocha,cai y supertest) para routers de carts
 *    desarrollar 3 test(mocha,cai y supertest) para routers de sessions
 *
 * Desafio 4 entrega integradora:
 *    crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.
 *    El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban.
 *    Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents.
 * Modificar el endpoint /api/users/premium/:uid   para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
 *    Identificación, Comprobante de domicilio, Comprobante de estado de cuenta
 *    En caso de llamar al endpoint, si no se ha terminado de cargar la documentación, devolver un error indicando que el usuario no ha terminado de procesar su documentación.(Sólo si quiere pasar de user a premium, no al revés)
 */

//Probar:
/**
 * donde se guardan los loggers de error en produccion
 * get con sort -1 de products
 * funcion deleteInactives de sessionServices (borrar usuarios por inactividad y mandarles un correo)
 * ver permisos de user.routes
 * las vistas.
 * como puedo hacer req.user.campo y no req.user.user.campo
 * Ver porque me da el error de ruta cuando hago un get de las rutas de views.
 * Poner la ruta views en routes/web y crear su index
 * Mejorar la eficiencia del addProd de cart.dao.js
 * ver el GET de api/users/current para saber qie informacion devolver. Cuando llamo a GET de users ver que se mande el DTO de users con DTO de cart en CartId.
 * Ver si esta bien devolver el producto por el controlador al crearl un modelo.
 * arreglar el CartModel del CartService(sacarlo y poner la funcion en el controlador del metodo getProductInCart).
 * verificar si puedo borrar los mensajes de de los metodos de CartService si no se encuentra el cart ya que el mensahje esta declarada en la funcion getCartById.
 * Crear la funcion en TicketDTO para devolver un formato de fecha vistoso para el usuario en el campo 'purchase_datatime'.
 * Crear errores en TicketsService.
 * Si se elimina un prducto de la base de dato que se borre de los carritos.
 * Si el producto tiene stock 0 modificar el status a false.
 * poner en el DTO de cart los quantity de los productos.
 * acordarse de poner el code en el ProductDto
 * si yo quiero hacer purchase del carrito devolver. el cart esta vacio.
 * manejar el error cuando se espera un :id params en una busqued y se introduce algo equivocado.
 * poner permisos en user.routes.js
 * en GET user sacar el password de la respuesta
 */
