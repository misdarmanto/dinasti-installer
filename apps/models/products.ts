/* eslint-disable @typescript-eslint/indent */
import { DataTypes, UUIDV4, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { PromotionsModel } from './promotions'

export interface ProductsAttributes extends ZygoteAttributes {
  productId: string
  productBarcode: string
  productName: string
  productDescription: string
  productStock: number
  productPrice1: number
  productPrice2: number
  productPrice3: number
  productQty1: number
  productQty2: number
  productQty3: number
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type ProductCreationAttributes = Optional<
  ProductsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface ProductsInstance
  extends Model<ProductsAttributes, ProductCreationAttributes>,
    ProductsAttributes {}

export const ProductsModel = sequelize.define<ProductsInstance>(
  'products',
  {
    ...ZygoteModel,
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    productBarcode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productPrice1: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    productPrice2: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    productPrice3: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    productQty1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productQty2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productQty3: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'products',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)

ProductsModel.hasOne(PromotionsModel, {
  sourceKey: 'productId',
  foreignKey: 'promotionProductId'
})