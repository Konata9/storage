import typecheck from "@konata9/typecheck.js";

export default {
  // CONSTANT VALUE
  ONE_MINUTE: 1000 * 60,
  ONE_HOUR: 1000 * 60 * 60,
  ONE_DAY: 1000 * 60 * 60 * 24,
  ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
  // type value & function
  type: null || "session",
  getType: function () {
    return this.type;
  },
  setType: function (type) {
    if (!type) {
      throw new Error("Storage type can not be null");
    }
    if (type !== 'local' && type !== 'session') {
      throw new Error("Type must be local or session")
    }
    this.type = type;
  },
  // storage function
  set: function (insertItem, value = null, expireKey = false, expires = this.ONE_DAY) {
    if (typecheck(insertItem) === "object") {
      for (let key in insertItem) {
        if (insertItem.hasOwnProperty(key)) {
          window[`${this.type}Storage`].setItem(key, JSON.stringify(insertItem[key]));
        }
      }
    } else if (typecheck(insertItem) === "string") {
      if (expireKey) {
        window[`${this.type}Storage`].setItem(`__${insertItem}__`, JSON.stringify(+new Date() + expires))
      }
      window[`${this.type}Storage`].setItem(insertItem, JSON.stringify(value))
    } else {
      throw new Error("InsertItem only accept object or string");
    }
  },
  get: function (keyItem) {
    if (typecheck(keyItem) === "array") {
      return keyItem.map(key => {
        if (this.checkExpired(key)) {
          this.remove([key, `__${key}__`])
          return null
        } else {
          return JSON.parse(window[`${this.type}Storage`].getItem(key))
        }
      });
    } else if (typecheck(keyItem) === "string") {
      if (this.checkExpired(keyItem)) {
        this.remove([keyItem, `__${keyItem}__`])
        return null
      } else {
        return JSON.parse(window[`${this.type}Storage`].getItem(keyItem));
      }
    } else {
      throw new Error("KeyItem only accept array or string");
    }
  },
  remove: function (keyItem = []) {
    if (typecheck(keyItem) === "array") {
      for (let key of keyItem) {
        window[`${this.type}Storage`].removeItem(key);
      }
    } else if (typecheck(keyItem) === "string") {
      window[`${this.type}Storage`].removeItem(keyItem);
    } else {
      throw new Error("KeyItem only accept array or string");
    }
  },
  clear: function () {
    window[`${this.type}Storage`].clear();
  },
  hasKey: function (key) {
    if (typecheck(key) !== "string") {
      throw new Error("Key must be a string");
    }
    return this.listKeys().includes(key);
  },
  listKeys: function () {
    const keyList = [];
    for (let key in window[`${this.type}Storage`]) {
      if (window[`${this.type}Storage`].hasOwnProperty(key)) {
        keyList.push(key);
      }
    }
    return keyList;
  },
  checkExpired: function (key) {
    if (typecheck(key) !== 'string') {
      throw new Error("Key must be a string")
    }
    let expireKey = `__${key}__`
    if (this.hasKey(expireKey)) {
      return this.get(expireKey) < +new Date()
    } else {
      return null
    }
  }
};
