/* eslint-disable @typescript-eslint/indent */
import { DataTypes, UUIDV4, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface DevicesAttributes extends ZygoteAttributes {
  deviceId: string
  deviceName: string
  deviceStatus: 'enable' | 'disable'
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type DevicesCreationAttributes = Optional<
  DevicesAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface DevicesInstance
  extends Model<DevicesAttributes, DevicesCreationAttributes>,
    DevicesAttributes {}

export const DevicesModel = sequelize.define<DevicesInstance>(
  'devices',
  {
    ...ZygoteModel,
    deviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deviceStatus: {
      type: DataTypes.ENUM('enable', 'disable'),
      allowNull: false,
      defaultValue: 'disable'
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'devices',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
