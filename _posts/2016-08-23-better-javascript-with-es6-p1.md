---
title: "Better JavaScript with ES6, Part 1"
layout: post
date: 2016-08-23 15:52
image: /assets/images/js-with-es6.png
headerImage: true
tag:
  - JavaScript
  - ES6
categories:
  - Web Development
  - JavaScript
blog: true
author: hoangmaihuy
description: ES6 new features
---

## Introduction

Với sự xuất hiện của ES2015 và Node.js hỗ trợ rất nhiều tính năng mới của nó, chúng ta hoàn toàn có thể nói rằng: *The Future is Upon Us*.

Đó là sự thật. [V8 Engine đang nhanh chóng cập nhật xu hướng](http://v8project.blogspot.com/2016/03/v8-release-50.html) và [Node.js cũng được trang bị những điểm mạnh của ES2015 sẵn sàng để phát triển phần mềm](https://nodejs.org/en/docs/es6/). Dưới đây là một số điểm mới được xem là Essentials™, một tập các tính năng chúng ta có thể sử dụng với sự hỗ trợ của Babel hoặc Traceur.

Bài viết này sẽ điểm qua 3 tính năng phổ biến của ES2015 có sẵn trong Node:

* Block scoping with `let` and `const`
* Arrow functions
* Shorthand properties & methods.

Let's get to it.

---
## Block Scope with `let` and `const`

**Scope** là phạm vi trong chương trình mà biến (variables) tồn tại. Nói cách khác, nó là một tập quy tắc xác định ta được phép sử dụng biến đã được khai báo ở những chỗ nào.

Chúng ta đều biết rằng JavaScript chỉ tạo scope mới trong function. Thực chất, có *ba* cách để tạo scope mới trong JavaScript, đó là:

1. **Tạo function**. Ai cũng biết điều này.
2. **Tạo một `catch` block**. [I'm not kidding](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/apB.md).
3. **Tạo một code block**. Nếu bạn đang code ES2015, khai báo một biến với `let` hoặc `const` trong một code block sẽ giớ hạn phạm vi của chúng *chỉ trong block đó*. Đây được gọi là *block scoping*.

Một *block* là một đoạn code được bao bởi cặp ngoặc `{ thế này }`. Chúng thường xuất hiện ở `if`/`else` hay `try`/`catch`/`finally` blocks. Ta cũng có thể bao một đoạn code tùy tiện trong ngoặc để tạo code block nếu muốn.

{% highlight js %}
// You have to use strict to try this in Node
"use strict";

var foo = "foo";
function baz() {
    if (foo) {
        var bar = "bar";
        let foobar = foo + bar;
    }
    // Both foo and bar are visible here
    console.log("This situation is " + foo + bar + ". I'm going home.");

    try {
        console.log("This log statement is " + foobar + "! It threw a ReferenceError at me!");
    } catch (err) {
        console.log("You got a " + err + "; no dice.");
    }

    try {
        console.log("Just to prove to you that " + err + " doesn't exit outside of the above `catch` block.");
    } catch (err) {
        console.log("Told you so.");
    }
}

baz();

try {
    console.log(invisible);
} catch (err) {
    console.log("invisible hasn't been declared, yet, so we get a " + err);
}
let invisible = "You can't see me, yet"; // let-declared variables are inaccessible before declaration
{% endhighlight %}

Một số điểm cần chú ý.

* Chú ý rằng `foobar` không visible bên ngoài `if` block, bởi vì ta khai báo nó với `let`;
* Ta có thể sử dụng `foo` ở bất kì đâu, vì ta khai báo với `var` ở global scope;
* Ta có thể sử dụng `bar` bất kì đâu bên trong `baz`, bởi vì `var` khai báo biến trong function scope;
* Ta không thể sử dụng `let` hay `const` để khai báo biến trước khi gán giá trị cho chúng. Nói cách khác, chúng không tương tự như dùng `var` để khai báo.

`const` cũng tương tự như `let` ngoại trừ hai điểm.

1. *Phải* gán giá trị cho biến const khi tạo chúng, không được phép khai báo trước rồi mới gán giá trị sau.
2. *Không thể* thay đổi giá trị của biến `const` sau khi tạo. Nếu bạn thử sẽ bị lỗi `TypeError`.

## `LET` & `CONST`: WHO CARES?

Chúng ta đã quá quen thuộc với `var` và giờ có thể bạn đang tự hỏi mình có *really need* `let` và `const` không.

Good question. Trả lời ngắn gọn -- no. Not *really*. Nhưng có một vài lý do để cân nhắc việc sử dụng `let` và `const` khi có thể.

* Cả `let` và `const` đều không bị đưa lên scope to nhất (function), làm cho code trở nên dễ đọc hơn và đỡ bị hiểu nhầm.
* Chúng giới hạn phạm vi (visibility) nhiều nhất có thể, điều này giúp tránh loạn variable hay namespace.
* Đôi khi ta không cần thay đổi giá trị của biến trừ khi thực sự cần, `const` làm cho biến trở nên *immutable* (không thể thay đổi).

Ta cũng có thể sử dụng `let` trong `for` loops.

{% highlight js %}
"use strict";

var languages = ['Danish', 'Norwegian', 'Swedish'];

// Pollutes global namespace. Ew!
for (var i = 0; i < languages.length; i += 1) {
    console.log(`${languages[i]} is a Scandinavian language.`);
}

console.log(i); // 4

for (let j = 0; j < languages.length; j += 1) {
    console.log(`${languages[j]} is a Scandinavian language.`);
}

try {
    console.log(j); // Reference error
} catch (err) {
    console.log(`You got a ${err}; no dice.`);
}
{% endhighlight %}

Sử dụng `var` để khai báo biến chạy trong vòng `for` không thực sự giữ nó lại trong vòng lặp. Sử dụng `let` thì được.

`let` cũng có lợi thế khi trói buộc biến chạy trong vòng lặp, vậy nên mỗi vòng lặp có một `copy riêng`, hơn là sử dụng chung một biến global.

{% highlight js %}
"use strict";

// Simple & Clean
for (let i = 1; i < 6; i += 1) {
    setTimeout(function() {
        console.log("I've waited " + i + " seconds!");
    }, 1000 * i);
}

// Totally dysfunctional
for (var j = 0; j < 6; j += 1) {
        setTimeout(function() {
        console.log("I've waited " + j + " seconds for this!");
    }, 1000 * j);
}
{% endhighlight %}

Vòng lặp đầu tiên chạy đúng như những gì bạn nghĩ. Cái dưới sẽ in ra "I've waited 6 seconds!", mỗi giây.

Quyền lựa chọn nằm ở bạn, hãy cẩn thận.

---
## The Quirks of Dynamic `this`

`this` trong JavaScript vẫn nổi tiếng trong việc có thể làm mọi thứ trừ những thứ bạn thực sự muốn nó làm.

Sự thật thì [quy tắc rất đơn giản](https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes). Nhưng đôi khi `this` gây ra những lỗi rất ngớ ngẩn.

{% highlight js %}
"use strict";

const polyglot = {
    name : "Michel Thomas",
    languages : ["Spanish", "French", "Italian", "German", "Polish"],
    introduce : function () {
        // this.name is "Michel Thomas"
        const self = this;
        this.languages.forEach(function(language) {
            // this.name is undefined, so we have to use our saved "self" variable
            console.log("My name is " + self.name + ", and I speak " + language + ".");
        });
    }
}

polyglot.introduce();
{% endhighlight %}

Bên trong `introduce`, `this.name` là `undefined`. Ngay bên ngoài callback, trong mỗi vòng `forEach` nó chỉ đến object `polygot`. Thông thường, trong trường hợp này ta muốn `this` trong `function(languague)` trỏ đến cùng đối tượng `this` ở function ngoài.

Vấn đề là function trong JavaScript luôn tự định nghĩa `this` riêng của chúng mỗi khi được gọi, dựa theo [well-established four rules](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch2.md). Cơ chế này được gọi là *dynamic `this`*.

Không có một quy tắc nào nói rằng `this` có nghĩa là "nearby"; cũng như không có cách nào để JavaScript có thể định nghĩa `this` dựa theo nghĩa của scope bên ngoài.

Điều này có nghĩa là mỗi khi engine tìm giá trị của `this`, nó sẽ tìm được một cái nhưng không cùng giá trị bên ngoài callback. Có hai cách truyền thống để giải quyết vấn đề này.

1. Lưu `this` ở function bên ngoài vào một biến, thường gọi là `self` và sử dụng ở function bên trong; hoặc
2. Gọi `bind` ở function bên trong để gán giá trị cho cho `this`.

Cả hai cách đều hoạt động tốt, nhưng chúng có thể hơi khó chịu.

Nếu như function bên trong không gán giá trị `this` riêng của chúng, JavaScript sẽ tìm giá trị của `this` như chúng tìm giá trị của các biến khác: Bằng cách lộn ngược lên scope cha cho đến khi tìm được cái cùng tên. Nó cho phép cho sử dụng giá trị của `this` như "nearby" source code, hay được biết đến như *lexical `this`*.

Code sẽ trở nên gọn gàng hơn rất nhiều nếu ta có cấu trúc này.

## LEXICAL `THIS` WITH ARROW FUNCTIONS

Trong ES2015, chúng ta có. Arrow functions không trói buộc giá trị của `this`, cho phép ta sử dụng như lexical binding của `this`. Ta có thể viết lại code trên như sau.

{% highlight js %}
"use strict";

let polyglot = {
    name : "Michel Thomas",
    languages : ["Spanish", "French", "Italian", "German", "Polish"],
    introduce : function () {
        this.languages.forEach((language) => {
            console.log("My name is " + this.name + ", and I speak " + language + ".");
        });
    }
}
{% endhighlight %}

...Và mọi thứ hoạt động như mong muốn
Arrow function có một vài loại syntax.

{% highlight js %}
"use strict";

let languages = ["Spanish", "French", "Italian", "German", "Polish"];

// In a multiline arrow function, you must use curly braces,
//  and you must include an explicit return statement.
let languages_lower = languages.map((language) => {
    return language.toLowerCase()
});

// In a single-line arrow function, curly braces are optional,
//   and the function implicitly returns the value of the last expression.
//   You can include a return statement if you'd like, but it's optional.
let languages_lower = languages.map((language) => language.toLowerCase());

// If your arrow function only takes one argument, you don't need to wrap it in
//   parentheses.
let languages_lower = languages.map(language => language.toLowerCase());

// If your function takes multiple arguments, you must wrap them in parentheses.
let languages_lower = languages.map((language, unused_param) => language.toLowerCase());

console.log(languages_lower); // ["spanish", "french", "italian", "german", "polish"]

// Finally, if your function takes no arguments, you must include empty parentheses before the arrow.
(() => alert("Hello!"))();
{% endhighlight %}

Bạn có thể tìm hiểu thêm ở [MDN docs on arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

---
## Shorthand Properties & Methods

ES2015 cũng cung cấp một số cách mới để define properties và methods của objects.

### SHORTHAND METHODS

Trong JavaScript, một *method* là một property của object có giá trị là function:

{% highlight js %}
"use strict";

// Kudos to @_finico for catching a type in the first draft.
const myObject = {
    foo : function () {
        console.log('bar');
    },
}
{% endhighlight %}

Trong ES2015, ta có thể viết một cách đơn giản:

{% highlight js %}
"use strict";

const myObject = {
    foo () {
        console.log('bar');
    },
    * range (from, to) {
        while (from < to) {
            if (from === to)
                return ++from;
            else
                yield from ++;
        }
    }
}
{% endhighlight %}

Chú ý rằng ta cũng có thể dùng generators để định nghĩa method. Ta chỉ cần nối tên của function với dấu hoa thị (\*).

Đây được gọi là *method definitions*. Chúng tương tự như cách truyền thống *function-as-properties*, nhưng có vài điểm khác biệt:

* Chỉ có thể gọi `super` từ một *method definition*;
* Không được phép gọi method definition với `new`.

Ta sẽ bàn về classes và từ khóa `super` sau trong bài viết này. Nếu bạn đang vội, [Exploring ES6](http://exploringjs.com/es6/ch_classes.html) có tất cả thứ bạn muốn.

### SHORTHAND & COMPUTED PROPERTIES

ES6 cũng giới thiệu *shorthand* và *computed properties*.

Nếu tên của object's keys giống với tên của variables tạo giá trị cho chúng, ta có thể khởi tạo object chỉ bằng *variable names* thay vì viết một cặp key-value giống nhau.

{% highlight js %}
"use strict";

const foo = 'foo';
const bar = 'bar';

// Old syntax
const myObject = {
    foo : foo,
    bar : bar
};

// New syntax
const myObject = { foo, bar }
{% endhighlight %}

Cả hai syntaxes đều tạp một object với `foo` và `bar` keys có giá trị là hai biến `foo` và `bar`. Cách dưới đây cũng tương tự nhưng về mặt cú pháp thì tốt hơn.

Ta có thể sử dụng shorthand properties để định nghĩa ngắn gọn public APIs khi sử dụng [revealing module pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript).

{% highlight js %}
"use strict";

function Module () {
    function foo () {
        return 'foo';
    }

    function bar () {
        return 'bar';
    }

    // Write this:
    const publicAPI = { foo, bar }

    /* Not this:
    const publicAPI =  {
       foo : foo,
       bar : bar
    } */

    return publicAPI;
};
{% endhighlight %}

Ở đây ta tạo và return một `publicAPI` object, key `foo` tương ứng với method `foo`, tương tự với key `bar`.

### COMPUTED PROPERTY NAMES

Đây là một trường hợp ít được dùng, nhưng ES6 cũng cho phép sử dụng expressions làm property names.

{% highlight js %}
"use strict";

const myObj = {
  // Set property name equal to return value of foo function
    [foo ()] () {
      return 'foo';
    }
};

function foo () {
    return 'foo';
}

console.log(myObj.foo() ); // 'foo'
{% endhighlight %}

Dựa theo Dr. Raushmayer trong [Exploring ES6](http://exploringjs.com/), chức năng chính của điều này là để đặt property names bằng với [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) values.

### GETTER & SETTER METHODS

Cuối cùng, mình muốn nhắc tới `get` và `set` methods, thứ mà đã có từ ES5.

{% highlight js %}
"use strict";

// Example adapted from MDN's page on getters
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
const speakingObj = {
    // Track how many times "speak" has been called
    words : [],

    speak (word) {
        this.words.push(word);
        console.log('speakingObj says ' + word + '!');
    },

    get called () {
        // Returns latest word
        const words = this.words;
        if (!words.length)
            return 'speakingObj hasn\'t spoken, yet.';
        else
            return words[words.length - 1];
    }
};

console.log(speakingObj.called); // 'speakingObj hasn't spoken, yet.'

speakingObj.speak('blargh'); // 'speakingObj says blargh!'

console.log(speakingObj.called); // 'blargh'
{% endhighlight %}

Có một vài thứ cần nhớ khi sử dụng getters:

* Getters không có arguments;
* Không thể có properties cùng tên với getter functions;
* Có thể tạo getter theo ý mình bằng cách sử dụng `Object.defineProperty(OBJECT, "property name", { get : function () { . . . } })`

Để ví dụ, ta có thể define getter bên trên theo cách sau:

{% highlight js %}
"use strict";

const speakingObj = {
    // Track how many times "speak" has been called
    words : [],

    speak (word) {
        this.words.push(word);
        console.log('speakingObj says ' + word + '!');
    }
};

// This is just to prove a point. I definitely wouldn't write it this way.
function called () {
    // Returns latest word
    const words = this.words;
    if (!words.length)
        return 'speakingObj hasn\'t spoken, yet.';
    else
        return words[words.length - 1];
};

Object.defineProperty(speakingObj, "called", get : getCalled )
{% endhighlight %}

Bên cạnh getters ta cũng có setters. Đáng ngạc nhiên, chúng gán properties của object với một logic khác.

{% highlight js %}
"use strict";

// Create a new globetrotter!
const globetrotter = {
    // Language spoken in the country our globetrotter is currently in
    const current_lang = undefined,

    // Number of countries our globetrotter has travelled to
    let countries = 0,

    // See how many countries we've travelled to
    get countryCount () {
        return this.countries;
    },

    // Reset current language whenever our globe trotter flies somewhere new
    set languages (language) {
        // Increment number of coutnries our globetrotter has travelled to
        countries += 1;

        // Reset current language
        this.current_lang = language;
    };
};

globetrotter.language = 'Japanese';
globetrotter.countryCount; // 1

globetrotter.language = 'Spanish';
globetrotter.countryCount; // 2
{% endhighlight %}

Mọi thứ được nhắc đến bên trên về getters đều có thể áp dụng vào setters, ngoại trừ:

* Không giống như getters có thể không có arguments, setters phải được truyền *duy nhất* một argument.

Không theo quy tắc sẽ throw an error.

---
## Conclusion

Tương lai của JavaScript đang diễn ra hôm nay, và đã đến lúc nắm bắt những gì mà nó mang lại. Trong bài viết này, chúng ta đã xem xét ba tính năng phổ biến của ES2015:

* Block scoping with `let` and `const`;
* Lexical scoping of `this` with arrow functions;
* Shorthand object properties and methods, plus a review of getter and setter functions.

Chi tiết hơn về `let`, `const`, và khái niệm của block scoping, bạn có thể đọc [Kyle Simpson's take on block scoping](https://davidwalsh.name/for-and-against-let). Nếu bạn cần reference nhanh và thực tế, check trang MDN `let` và `const`.

Dr. Rauschmayer có một [bài viết rất tuyệt vời về arrow functions và lexical `this`](http://www.2ality.com/2012/04/arrow-functions.html). Bạn có thể dành thời gian nghiên cứu chúng để hiểu rõ hơn những gì được viết ở đây.

Cuối cùng, với mọi khía cạnh đã được đề cập ở đây thì [Exploring ES6](http://exploringjs.com/) là một trong những reference tốt nhất có thể tìm thấy trên web.

Trong bài tiếp theo mình sẽ đề cập đến Classes trong ES6.

---
Đây là bài viết mình dịch từ [Better JavaScript series, Part 1](part 1 of the Better JavaScript series). Nếu có sai sót gì bạn có thể comment bên dưới, mình rất vui lòng nhận góp ý của mọi người.
