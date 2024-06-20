import { createDevice } from './create'
import { findAllDevice, findDetailDevice } from './find'
import { removeDevice } from './remove'
import { updateDevice } from './update'

export const DeviceController = {
  create: createDevice,
  findAll: findAllDevice,
  findDetail: findDetailDevice,
  remove: removeDevice,
  update: updateDevice
}
