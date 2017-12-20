# es6学习笔记  

## let、const

### let

1、let所声明的变量只在let命令所在的代码块内有效。 


	{  
		let a = 10;  
    	var b = 1;  
	}  
	a //ReferenceError: a is not defined  
	b //1

2、不存在变量提升。  

var命令会发生“变量提升”的现象，即变量可以在声明之前使用，值为undefined；

	console.log(foo)	//输出undefiend
	var foo = 2;

	console.log(bar)	//报错ReferenceError
	let bar = 2;

3、暂时性死区。 

只要块级作用域中存在let命令，它所声明的变量就被“绑定”在这个区域，不再受外部的影响。

	var tmp = 123;
	if(true){
		tmp = 'abc';	//ReferenceError
		let tmp;
	}

“暂时性死区”意味着typeof不再是一个百分百安全的操作
	
	typeof x;	//ReferenceError
	let x;

隐蔽的“死区”

	function foo(x = y, y = 2){	//ReferenceError: y is not defined
    	return [x, y];
  	}
	foo();  

var与let的行为不同

	// 不报错
	var x = x;
	// 报错
	let x = x;
	// ReferenceError: x is not defined

4、不允许重复声明

	// 报错
	function func() {
	  	let a = 10;
	  	var a = 1;
	}

	// 报错
	function func() {
		let a = 10;
		let a = 1;
	}

	function func(arg) {
	  let arg; // 报错
	}
	
	function func(arg) {
	  {
	    let arg; // 不报错
	  }
	}

### 块级作用域

es5只有全局作用域和函数作用域；  
ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立。

### const
const声明一个只读的常量，一旦声明值不能改变。  
这意味着const命令一旦声明必须立刻初始化，不能留到以后赋值。

	const PI;	//SyntaxError: Missing initializer in const declaration

const作用域与let命令相同

本质  
const本质上保证的不是变量的值不能变动，而是变量指向的内存地址不能变动；  
对于简单类型（Number，String，Boolean），值就保存在变量指向的内存地址，因此等同于常量；  
而对于复合型（Array，Object）,变量指向的内存地址保存的只是一个指针，const只能保证这个指针是固定的

***

> es5变量的声明只有两种方法：var、function  
> es6变量的声明增加四种方法：let、const、import、class

## 变量的解构赋值

基本用法  

	let a = 1;
	let b = 2;
	let c = 3;

等同于

	let [a, b, c] = [1, 2, 3];

模式匹配：只要等号两边的模式相同，左边的变量就会被赋予想对应的值

### 用途  
1、 交换变量的值

	let x = 1, y = 2;
	[x, y] = [y, x];

2、 从函数返回多个值

	function fn(){
		return [1, 2, 3];
	}
	let [a, b, c] = fn();

	function example() {
	  return {
	    foo: 1,
	    bar: 2
	  };
	}
	let { foo, bar } = example();

3、 函数参数的定义

	// 参数是一组有次序的值
	function f([x, y, z]) { ... }
	f([1, 2, 3]);
	
	// 参数是一组无次序的值
	function f({x, y, z}) { ... }
	f({z: 3, y: 2, x: 1});

4、 提取JSON数据

	let jsonData = {
	  id: 42,
	  status: "OK",
	  data: [867, 5309]
	};
	
	let { id, status, data: number } = jsonData;
	
	console.log(id, status, number);
	// 42, "OK", [867, 5309]

5、 函数参数的默认值

	jQuery.ajax = function (url, {
	  async = true,
	  beforeSend = function () {},
	  cache = true,
	  complete = function () {},
	  crossDomain = false,
	  global = true,
	  // ... more config
	}) {
	  // ... do stuff
	};

6、 遍历Map结构

任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

	const map = new Map();
	map.set('first', 'hello');
	map.set('second', 'world');
	
	for (let [key, value] of map) {
	  console.log(key + " is " + value);
	}
	// first is hello
	// second is world
如果只想获取键名，或者只想获取键值，可以写成下面这样。

	// 获取键名
	for (let [key] of map) {
	  // ...
	}
	
	// 获取键值
	for (let [,value] of map) {
	  // ...
	}

7、输入模块的指定方法

	const { SourceMapConsumer, SourceNode } = require("source-map");

## 字符串的扩展

## 正则/数值/函数/数组/对象的扩展

## SET与MAP数据结构

### Set

set类似于数组，但是成员的值都是唯一的，没有重复的值

属性：  
`Set.prototype.constructor`  
`Set.prototype.size`

方法：  

- 操作方法：  
`- Set.add(value)`  
`- Set.delete(value)`  
`- Set.has(value)`  
`- Set.clear()`  

- 遍历方法：  
`- keys()		//返回键名的遍历器`  
`- values()		//返回键值的遍历器`  
`- entries()		//返回键值对的遍历器`  
`- forEach()		//使用回调函数遍历每个成员`

需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

### WeekSet  

WeekSet结构与Set类似，区别在于：  
1  WeekSet的成员只能是对象  
2  WeekSet中的对象都是弱引用，即垃圾回收机制不考虑WeekSet对该对象的引用

### Map

JavaScript中的对象，本质上是键值对的集合（Hash结构），但是传统上只能用字符串当作键。  
Map数据结构类似于对象，也是键值对的集合，但“键”的范围不限于字符串，各种类型的值都可以当做键。  
Map的键实际是跟内存地址绑定的  

- 实例的属性和操作方法
  - size属性
  - set(key, value)
  - get(key)
  - has(key)
  - delete(key)
  - clear()
- 遍历方法
  - keys()
  - values()
  - entries()
  - forEach()

### WeekMap

WeekMap结构与Map结构类似  
区别：  
WeekMap只接受对象作为键名，null除外；  
其次，WeekMap的键名所指向的对象，不计入垃圾回收机制

## module

### export

export命令用于规定模块的对外接口

### import

import命令用于输入其他模块提供的功能

### export default

export default为模块指定默认输出

## 风格规范
1. 块级作用域  
  - let取代var
  - 全局常量和线程安全
2. 字符串  
  - 静态字符串一律使用单引号或反引号，不使用双引号；动态字符串使用反引号

			//bad  
			const a = "foobar";  
			const b = 'foo' + a + 'bar';  
			
			//acceptable  
			const c = `foobar`;  
			
			//good  
			const a = 'foobar';
			const b = `foo${a}bar`;

3. 解构赋值
  - 使用数组成员对变量赋值时，优先使用解构赋值

			const arr = [1, 2, 3, 4];

			//bad
			const first = arr[0];
			const second = arr[1];

			//good
			const [first, second] = arr;

  - 函数的参数如果是对象的成员，优先使用解构赋值
			
			//bad
			function getFullName(user){
			  const firstName = user.firstName;
			  const lastName = user.lastName;
			}
			
			//good
			function getFullName(user){
			  const {firstName, lastName} = user;
			}
			
			//best
			function getFullName({firstName, lastName}){
			  
			}

  - 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值

			// bad
			function processInput(input) {
			  return [left, right, top, bottom];
			}
			
			// good
			function processInput(input) {
			  return { left, right, top, bottom };
			}
			
			const { left, right } = processInput(input);

4. 对象
  - 单行定义的对象，最后一个成员不以逗号结尾；多行定义的对象，最后一个成员以逗号结尾

			//bad
			const a = { k1: v1, k2: v2, };
			const b = {
			  k1: v1,
			  k2: v2
			};
			
			//good
			const a = { k1: v1, k2: v2 };
			const b = {
			  k1: v1,
			  k2: v2,
			}

  - 对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assgin()方法

			// bad
			const a = {};
			a.x = 3;
			
			// if reshape unavoidable
			const a = {};
			Object.assign(a, { x: 3 });
			
			// good
			const a = { x: null };
			a.x = 3;

5. 数组
  - 使用扩展运算符（...)拷贝数组
  
			// bad
			const len = items.length;
			const itemsCopy = [];
			let i;
			
			for (i = 0; i < len; i++) {
			  itemsCopy[i] = items[i];
			}
			
			// good
			const itemsCopy = [...items];

  - 使用Array.from方法将类似数组的方法转换成数组

6. 函数
  - 立即执行的函数可以写成箭头函数的形式

			(() => {
			  console.log('Welcome to the Internet.');
			})();

  - 简单的、单行的、不会复用的函数建议采用箭头函数，如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
  - 所有的配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。

			// bad
			function divide(a, b, option = false ) {
			}
			//good
			function divide(a, b, { option = false } = {} ) {
			}
  - 不要在函数体内使用arguments变量，使用rest运算符(...)代替。因为rest运算符显示表明你想要获取参数，而且arguments是一个类似数组的对象，而rest运算符可以提供一个真正的数组
  - 使用默认值语法设置函数参数的默认值。

7. Map结构

  - 只有模拟现实世界的实体对象时，才使用Object，如果只是key：value的数据结构，使用Map结构，因为Map有内置的遍历机制

8. class

  - 使用class取代需要prototype的操作。
  - 使用extends实现继承

9. 模块

  - 使用import取代require
  - 使用export取代module.exports
  - 如果模块只有一个输出值，使用export default，多个时使用export，不要同时使用