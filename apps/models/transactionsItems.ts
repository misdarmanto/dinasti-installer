/* eslint-disable @typescript-eslint/indent */
import { DataTypes, UUIDV4, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { ProductsModel } from './products'

export interface TransactionItemsAttributes extends ZygoteAttributes {
  transactionItemId: string
  transactionItemTransactionId: string
  transactionItemProductId: string
  transactionItemBasePrice: number
  transactionItemTotal: number
  transactionItemDiscount: number
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type TransactionItemsCreationAttributes = Optional<
  TransactionItemsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface TransactionItemsInstance
  extends Model<TransactionItemsAttributes, TransactionItemsCreationAttributes>,
    TransactionItemsAttributes {}

export const TransactionItemsModel = sequelize.define<TransactionItemsInstance>(
  'transaction_items',
  {
    ...ZygoteModel,
    transactionItemId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    transactionItemTransactionId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    transactionItemProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    transactionItemBasePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    transactionItemTotal: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    transactionItemDiscount: {
      type: DataTypes.NUMBER,
      allowNull: true
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'transaction_items',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)

TransactionItemsModel.hasOne(ProductsModel, {
  sourceKey: 'transactionItemProductId',
  foreignKey: 'productId'
})
