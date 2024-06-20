/* eslint-disable @typescript-eslint/indent */
import { DataTypes, UUIDV4, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface UserAttributes extends ZygoteAttributes {
  userId: string
  userName: string
  userPassword: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>

// We need to declare an interface for our model that is basically what our class would be
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const UserModel = sequelize.define<UserInstance>(
  'users',
  {
    ...ZygoteModel,
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'users',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
