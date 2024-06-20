/* eslint-disable @typescript-eslint/indent */
import { DataTypes, UUIDV4, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { ProductsModel } from './products'
import { TransactionItemsModel } from './transactionsItems'

export interface TransactionsAttributes extends ZygoteAttributes {
  transactionId: string
  transactionUser: string
  transactionPrice: number
  transactionChange: number
  transactionPayment: number
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type TransactionsCreationAttributes = Optional<
  TransactionsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface TransactionsInstance
  extends Model<TransactionsAttributes, TransactionsCreationAttributes>,
    TransactionsAttributes {}

export const TransactionsModel = sequelize.define<TransactionsInstance>(
  'transactions',
  {
    ...ZygoteModel,
    transactionId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    transactionPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    transactionChange: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    transactionPayment: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    transactionUser: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'transactions',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)

TransactionsModel.hasMany(TransactionItemsModel, {
  as: 'transactionItems',
  sourceKey: 'transactionId',
  foreignKey: 'transactionItemTransactionId'
})