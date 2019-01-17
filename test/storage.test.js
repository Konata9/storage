import Storage from "../index";
import { expect } from "chai";

describe("Type check test:", () => {
  it("Get default type", () =>
    expect(Storage.getType()).to.be.equal("session"));
  it("Set type local", () => {
    Storage.setType("local");
    expect(Storage.getType()).to.be.equal("local");
  });
});
