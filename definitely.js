'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.default=function(obj){return new Proxy(obj,{get:function get(target,key){if(!(key in target)){var err=new Error('attempted to access nonexistent property `'+key+'`');err.stack=err.stack.replace(/(\n\s*at[^\n]*){2}/,'');throw err}return target[key]}})};

//# sourceMappingURL=definitely.js.map