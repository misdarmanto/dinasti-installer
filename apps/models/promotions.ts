/* eslint-disable @typescript-eslint/indent */
import { DataTypes, UUIDV4, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface PromotionAttributes extends ZygoteAttributes {
  promotionId: string
  promotionProductId: string
  promotionProductPrice1: number
  promotionProductPrice2: number
  promotionProductPrice3: number
  promotionStartDate: string
  promotionEndDate: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type PromotionCreationAttributes = Optional<
  PromotionAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface PromotionInstance
  extends Model<PromotionAttributes, PromotionCreationAttributes>,
    PromotionAttributes {}

export const PromotionsModel = sequelize.define<PromotionInstance>(
  'promotions',
  {
    ...ZygoteModel,
    promotionId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    promotionProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    promotionProductPrice1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    promotionProductPrice2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    promotionProductPrice3: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    promotionStartDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    promotionEndDate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'promotions',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
