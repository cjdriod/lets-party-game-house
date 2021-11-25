/**
 * Nested Object or Array data value retriever
 * @param source
 * @param variables
 * @param fallbackValue
 * @param allowNull
 * @returns {any|boolean|string}
 */
export const getValues = (source, variables, fallbackValue = false, allowNull = false) => {
  if (source === null && allowNull) {
    return null
  }

  const targetValueHierarchy = variables
    .toString()
    .replace(/[[\]]/g, '.')
    .split('.')
    .filter((key) => key !== '')

  // Check for string type because string is subtype of Array
  // Dont worries, if the data type not an object or array will fail after that.
  if (!source || ['string, boolean'].includes(typeof source) || targetValueHierarchy.length === 0) {
    return fallbackValue
  }

  // Retain data type cause data type is dynamic
  let result = Object.assign(source)

  for (let i = 0; i < targetValueHierarchy.length; i++) {
    result = result[targetValueHierarchy[i]]

    if (result === undefined) {
      break
    }

    if (result === null && i !== targetValueHierarchy.length - 1) {
      result = undefined
      break
    }
  }

  if (result === null && allowNull) {
    return null
  }

  return result !== undefined ? result : fallbackValue
}
