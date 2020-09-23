class Promise2 {
  succeed = null;
  fail = null;
  state = "pending";
  callbacks = [];

  resolve = (result) => {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    setTimeout(() => {
      this.callbacks.forEach((handle) => {
        if (typeof this.succeed === "function") {
          const resolve = handle[0].call(undefined, result);
          handle[2].resolveWith(resolve);
        }
      });
    }, 0);
  };
  reject = (reason) => {
    if (this.state !== "pending") return;
    this.state = "rejected";
    setTimeout(() => {
      this.callbacks.forEach((handle) => {
        if (typeof this.succeed === "function") {
          const error = handle[1].call(undefined, reason);
          handle[2].resolveWith(error);
        }
      });
    }, 0);
  };

  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接受函数");
    }

    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(succeed?, fail?) {
    const handle = [];
    if (typeof succeed === "function") {
      handle[0] = succeed;
    }
    if (typeof succeed === "function") {
      handle[1] = fail;
    }
    handle[2] = new Promise2(() => {});
    this.callbacks.push(handle);
    return handle[2];
  }

  resolveWith(x) {
    if (x instanceof Promise2) {
      x.then(
        (result) => this.resolve(result),
        (reason) => this.reject(reason)
      );
    }
    if (x instanceof Object) {
    }
  }
}

export default Promise2;
