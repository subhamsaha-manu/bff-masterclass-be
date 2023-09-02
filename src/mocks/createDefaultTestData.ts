import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'
import { DeepPartial } from '~app/util/testUtils/builders/builder'

export const createDefaultTestData = <T>(initialProps: () => DeepPartial<T>) => {
  return function defaultTestData(otherProps?: DeepPartial<T>) {
    return buildTestData<T>(initialProps(), otherProps || ({} as DeepPartial<T>))
  }
}

export const buildTestData = <T>(defaultProps: DeepPartial<T>, otherProps: DeepPartial<T>): T => {
  return mergeWith(defaultProps, otherProps, customizer) as T
}

function customizer<T>(objValue: T, srcValue: T) {
  if (isArray(objValue)) {
    return srcValue
  }
  if (srcValue === undefined) {
    return null
  }
}
