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
  }
};
