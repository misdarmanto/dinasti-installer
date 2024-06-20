import { createPromotion } from './create'
import { findAllPromotion, findDetailPromotion } from './find'
import { removePromotion } from './remove'
import { updatePromotion } from './update'

export const PromotionController = {
  create: createPromotion,
  findAll: findAllPromotion,
  findOne: findDetailPromotion,
  remove: removePromotion,
  update: updatePromotion
}
