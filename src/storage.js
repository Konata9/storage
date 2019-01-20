import typecheck from '@konata9/typecheck.js'
import * as ParamsCheck from './paramsCheck.js'

export default {
  EXPIRE_PATTERN: /^\-\-/,
  ONE_MINUTE: 1000 * 60,
  ONE_HOUR: 1000 * 60 * 60,
  ONE_DAY: 1000 * 60 * 60 * 24,
  ONE_MONTH: 1000 * 60 * 60 * 24 * 30,

  type: null || 'session',

  getType: function() {
    return this.type
  },

  setType: function(type) {
    ParamsCheck.storageTypeCheck(type)
    this.type = type
  },

  set: function(insertItem, type = this.type) {
    ParamsCheck.objectParamsCheck('insertItem', insertItem)
    ParamsCheck.storageTypeCheck(type)

    for(let key in insertItem) {
      if(insertItem.hasOwnProperty(key)) {
        window[`${type}Storage`].setItem(key, JSON.stringify(insertItem[key]))
      }
    }
  },

  setExpireKey: function(insertItem, options = null) {
    ParamsCheck.objectParamsCheck('insertItem', insertItem)

    options = options ? options : {}
    ParamsCheck.objectParamsCheck('options', options)

    let opts = {
      type: this.type,
      expires: this.ONE_DAY,
      ...options
    }

    for(let key in insertItem) {
      let expireKey = `--${key}--`
      this.set({
        [key]: insertItem[key],
        [expireKey]: +new Date() + opts.expires
      }, opts.type)
    }
  },

  get: function(keyItem, type = this.type) {
    if(typecheck(keyItem) === 'array') {
      return keyItem.map(key => {
        if(this.checkExpired(key, type)) {
          this.remove([key, `--${key}--`])
          return null
        } else {
          return JSON.parse(window[`${type}Storage`].getItem(key))
        }
      })
    } else if(typecheck(keyItem) === 'string') {
      if(this.checkExpired(keyItem, type)) {
        this.remove([keyItem, `--${keyItem}--`])
        return null
      } else {
        return JSON.parse(window[`${type}Storage`].getItem(keyItem))
      }
    } else {
      throw new TypeError('KeyItem only accept array or string')
    }
  },

  remove: function(keyItem = [], type = this.type) {
    if(typecheck(keyItem) === 'array') {
      for(let key of keyItem) {
        window[`${type}Storage`].removeItem(key)
      }
    } else if(typecheck(keyItem) === 'string') {
      window[`${type}Storage`].removeItem(keyItem)
    } else {
      throw new TypeError('KeyItem only accept array or string')
    }
  },

  clear: function(type = this.stype) {
    ParamsCheck.storageTypeCheck(type)
    window[`${type}Storage`].clear()
  },

  hasKey: function(key, type = this.type) {
    ParamsCheck.stringParamsCheck('Key', key)
    return this.listKeys(type, true).includes(key)
  },

  listKeys: function(type = this.type, full = false) {
    ParamsCheck.storageTypeCheck(type)

    let keyList = []
    for(let key in window[`${type}Storage`]) {
      if(window[`${type}Storage`].hasOwnProperty(key)) {
        keyList.push(key)
      }
    }

    if(!full) {
      return keyList.filter(key => !this.EXPIRE_PATTERN.test(key))
    } else {
      return keyList
    }
  },

  checkExpired: function(key, type = this.type) {
    ParamsCheck.stringParamsCheck('Key', key)
    let expireKey = `--${key}--`
    if(this.hasKey(expireKey, type)) {
      return this.get(expireKey, type) < +new Date()
    } else {
      return null
    }
  }
}
