import { productsRepository } from "../repositories/index.js";
import productsService from "../services/products/productsService.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import CustomError from "../services/errors/CustomError.js";
import { ErrorCodes } from "../services/errors/enums.js";
import { response } from "../utils/response.js";

export const getProducts = async (req, res) => {
  let { limit, page, sort, query } = req.query;
  let data = await productsService.getProducts(limit, page, sort, query);
  response(res, 200, data);
};

export const createProduct = async (req, res, next) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = req.body;

  const data = await productsService.createProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  });

  if (data == 11000) {
    return response(res,200,"Codigo de producto duplicadoo");
  }
  response(res, 201, data);
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.pid;
    const response = await productsRepository.getProductById(id);
    if (response) {
      return res
        .status(200)
        .json({ message: "Producto encontrado con exito", data: response });
    }
    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const id = req.params.pid;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;

    const response = await productsRepository.updateProductById(id, {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    });
    if (response) {
      return res.status(200).json({
        status: "succes",
        message: "Producto actualizado con éxito",
        data: response,
      });
    }
    res.status(404).json({
      message: "Product not found",
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    let id = req.params.pid;
    const response = await productsRepository.deleteProductById(id);
    if (response) {
      return res
        .status(200)
        .json({ status: "success", message: "Producto eliminado con éxito" });
    }
    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};
