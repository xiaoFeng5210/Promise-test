class Promise2 {
  succeed = null;
  fail = null;
  state = "pending";
  callbacks = [];

  resolve = result => {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    setTimeout(() => {
      if (typeof this.succeed === "function") {
        this.succeed.call(undefined, result);
      }
    }, 0);
  };
  reject = reason => {
    if (this.state !== "pending") return;
    this.state = "rejected";
    setTimeout(() => {
      if (typeof this.succeed === "function") {
        this.fail.call(undefined, reason);
      }
    }, 0);
  };

  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接受函数");
    }

    fn(this.resolve, this.reject);
  }
  then(succeed, fail) {
    if (typeof succeed === "function") {
      this.succeed = succeed;
    }
    if (typeof succeed === "function") {
      this.fail = fail;
    }
  }
}

export default Promise2;
