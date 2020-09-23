function Promise3(fn) {
  this.callbacks = [];

  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.callbacks.forEach((callback) => callback(value));
    });
  };

  fn(resolve);
}

Promise3.prototype.then = function (onResolved) {
  return new Promise3((resolve) => {
    this.callbacks.push(() => {
      const res: any = onResolved(this.data);
      if (res instanceof Promise3) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};
