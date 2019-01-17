import typecheck from "@konata9/typecheck.js";

export default {
  type: null || "session",
  getType: function() {
    return this.type;
  },
  setType: function(type) {
    if (!type) {
      throw new Error("Storage type can not be null.");
    }
    this.type = type;

    return this;
  },
  set: function(insertItem, value = null) {
    if (typecheck(insertItem) === "object") {
      for (let key in insertItem) {
        if (insertItem.hasOwnProperty(key)) {
          window[`${this.type}Storage`].setItem(key, insertItem[key]);
        }
      }
    } else if (typecheck(insertItem) === "string") {
      window[`${this.type}Storage`].setItem(insertItem, value);
    } else {
      throw new Error("InsertItem only accept object or string.");
    }

    return this;
  },
  get: function(keyItem) {
    if (typecheck(keyItem) === "array") {
      return keyItem.map(key => window[`${this.type}Storage`].getItem(key));
    } else if (typecheck(keyItem) === "string") {
      return window[`${this.type}Storage`].getItem(keyItem);
    } else {
      throw new Error("KeyItem only accept array or string.");
    }
  },
  remove: function(keyItem) {
    if (typecheck(keyItem) === "array") {
      for (let key in keyItem) {
        window[`${this.type}Storage`].removeItem(key);
      }
    } else if (typecheck(keyItem) === "string") {
      window[`${this.type}Storage`].removeItem(keyItem);
    } else {
      throw new Error("KeyItem only accept array or string.");
    }

    return this;
  },
  clear: function() {
    window[`${this.type}Storage`].clear();

    return this;
  },
  hasKey: function(key) {
    if (typecheck(key) !== "string") {
      throw new Error("Key must be a string.");
    }

    return this.listKeys().includes(key);
  },
  listKeys: function() {
    const keyList = [];
    for (let key in window[`${this.type}Storage`]) {
      if (window[`${this.type}Storage`].hasOwnProperty(key)) {
        keyList.push(key);
      }
    }

    return keyList;
  }
};
