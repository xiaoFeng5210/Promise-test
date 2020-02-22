import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);

const assert = chai.assert;
import Promise from "../src/promise";

// mocha -r ts-node/register test/index.ts 运行可以进行ts文件的单元测试
describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise);
    assert.isObject(Promise.prototype);
  });
  it("new Promise()必须接受一个函数", () => {
    // 预测一个东西会报错
    assert.throw(() => {
      // @ts-ignore
      new Promise(1);
    });
  });

  it("new Promise(fn) 会生成一个对象,对象有then方法", () => {
    const promise = new Promise(() => {});
    assert.isFunction(promise.then);
  });

  it("new Promise(fn) 中的fn立即执行", () => {
    let called = false;
    const promise = new Promise(() => {
      called = true;
    });
    // @ts-ignore
    assert(called === true);
  });

  it("promise(fn) 中的fn执行的时候接收resolve和reject函数", () => {
    let called = false;
    const promise = new Promise((resolve, reject) => {
      called = true;
      assert.isFunction(resolve);
      assert.isFunction(reject);
      // @ts-ignore
      assert(called === true);
    });
  });

  it("promise.then(success)中success会在resolve被调用时执行", done => {
    let called = false;
    const success = sinon.fake();
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called);
      resolve();
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      });
    });
    // @ts-ignore
    promise.then(success);
  });

  it("2.2.1", () => {
    const promise = new Promise(resolve => {
      resolve();
    });
    promise.then(false, null);
    assert(1 === 1);
  });

  it("2.2.2", done => {
    const succeed = sinon.fake();
    const promise = new Promise(resolve => {
      assert.isFalse(succeed.called);
      resolve();
      setTimeout(() => {
        assert.isTrue(succeed.called);
      }, 0);
    });
  });
});
