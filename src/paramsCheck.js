import typecheck from '@konata9/typecheck.js'

const notNullParamsCheck = (paramName, param) =>{
  if(!param){
    throw new ReferenceError(`${paramName} can't be null`)
  }
}

const paramTypeCheck = (paramName, param, paramType) =>{
  if(typecheck(param) !== paramType){
    throw new TypeError(`${paramName} require param type: ${paramType}`)
  }
}

export const objectParamsCheck = (paramName, param) => {
  notNullParamsCheck(paramName, param)
  paramTypeCheck(paramName, param, 'object')
}

export const stringParamsCheck = (paramName, param) =>{
  notNullParamsCheck(paramName, param)
  paramTypeCheck(paramName, param, 'string')
}

export const storageTypeCheck = (type) => {
  stringParamsCheck('Type', type)
  if(type !== 'local' && type !== 'session') {
    throw new ReferenceError('Type must be local or session')
  }
}
