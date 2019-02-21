import {
  Object
} from "core-js";

function cloneShallow(source) {
  var target = {};

  for (var key in source) {
    //   将Object的hasOwnProperty绑定到source 上并且执行
    if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (typeof source[key] === 'object') {
            target[key] = cloneDeep1(source[key]); // 注意这里
        } else {
            target[key] = source[key];
        }

    }
  }
}
