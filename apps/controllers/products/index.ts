import { createProduct } from './create'
import { findAllProducts, findDetailProduct } from './find'
import { removeProduct } from './remove'
import { updateProduct } from './update'

export const ProductController = {
  create: createProduct,
  findAll: findAllProducts,
  findOne: findDetailProduct,
  remove: removeProduct,
  update: updateProduct
}
