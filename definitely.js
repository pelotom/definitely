'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _messages=require('./messages');var messages=_interopRequireWildcard(_messages);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}exports.default=function(obj){return new Proxy(obj,{get:function get(target,key){if(!(key in target)){var err=new Error(messages.nonexistent(key));err.stack=err.stack.replace(/(\n\s*at[^\n]*){2}/,'');throw err}return target[key]}})};

//# sourceMappingURL=definitely.js.map