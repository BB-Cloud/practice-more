Function.prototype.mybind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    let _this = this
    let arg = [...arguments].slice(1)
    return function F() {
        // 处理函数使用new的情况
        if (this instanceof F) {
            return new _this(...arg, ...arguments)
        } else {
            return _this.apply(context, arg.concat(...arguments))
        }
    }
}



function test(age) {
    console.log(`name:${this.name},age:${age}`)
}
test.mybind({
    name: 'coco'
}, 18)()