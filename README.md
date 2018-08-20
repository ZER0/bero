# Bero

[![Build Status](https://travis-ci.com/ZER0/bero.svg?branch=master)](https://travis-ci.com/ZER0/bero)

A simple JavaScript utility for generating classnames following the BEM principles.

Usage:

```js
import bem from "bero";

bem("button", "label", ["visible", "active"]);
// => 'button__label button__label--visible button__label--active'
```

The library can also be used directly on the page just including the `index.js` in a standalone `<script>` tag; or by RequireJS.

### Rationale

I found repeating myself a lot when I was working on a React project following the BEM structure and naming convention; even using library such `classnames`.
I wanted a similar non-invasive approach as `classnames` lib, but following the BEM naming convention, and that's the reason behind the creation of `bero`.

### Why "bero"?

It's a reference to _Yōkai Ningen Bem (妖怪人間ベム Yōkai Ningen Bemu_, translated officially as _Humanoid Monster Bem_), a 1968 Japanise anime that I used to watch when I was a kid. The main characters were _Bem_, _Bera_ and _Bero_.

## Usage

The `bem` function is a curried function, takes up to three arguments.

The simplest usage is the basic signature with two arguments, `identifier` and `modifiers`:

```js
bem(identifier: String, modifiers: Array|Object) : String
```

### `identifier: String`

The `identifier` can be either a `block`, or an `element`.

If an `element` is specified, the full identifier has to be written, in the form of `block__elem`. For example:

```js
bem("button__label", ["visible", "active"]);
// => 'button__label button__label--visible button__label--active'
```

Since `bem` is a curried function, it also possible write the code above as:

```js
const label = bem("button__label");

label(["visible", "active"]);
// => 'button__label button__label--visible button__label--active'
```

This form would be rarely used for elements; it's more common having _block functions_, when the signature with three arguments is used:

```js
bem(block: String, elem: String, modifiers: Array|Object) : String
```

In this form, the equivalent of the code above would be:

```js
bem("button", "label", ["visible", "active"]);
// => 'button__label button__label--visible button__label--active'
```

But it would be more common used as curried function for _block functions_:

```js
const button = bem("button");

button("label", ["visible", "active"]);
// => 'button__label button__label--visible button__label--active'
```

This form is useful especially in components, where there is likely only one block per component, but multiple elements as children of that block.

### `modifiers: Array|Object`

The `modifiers` arguments can be either an `Array` or an `Object`.
The logic is the same of [@JedWatson](https://github.com/JedWatson)'s [classnames](https://github.com/JedWatson/classnames) module.

If it's an `Array`, every element that is considered _truthy_, would be
added as modifier in the resulting classname:

```js
bem("button__label", [false, "visible", 0, , "", undefined, "active"]);
// =>  button__label button__label--visible button__label--active'
```

However, `modifiers` really shines when an `Object` is given:

```js
bem("button__label", {
  visible: isVisible,
  active: isActive
});
// with `isVisible`: true, `isActive`: true
// => button__label button__label--visible button__label--active'

// with `isVisible`: true, `isActive`: false
// => button__label button__label--visible'

// with `isVisible`: false, `isActive`: true
// => button__label button__label--active'

// with `isVisible`: false, `isActive`: false
// => button__label
```

With [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) you can also have modifiers as such:

```js
bem("button__label", {
  [color]: !!color
});
// with `color`: undefined:
// => button__label

// with `color`: "red"
// => button__label button__red
```

### The `join` function

`bero` comes with an utility function that helps to concatenate several `truthy` values in one string. That's useful when the generated _BEM_ classname needs to
be concatenate by external strings, such a `className` passed by props in React. See below for a real-world example.

### Usage with React Component.

```js
import bem, { join } from "bero";

const button = bem("button");

export default class Button {
  // ...
  render() {
    const { pressed, hover } = this.state;
    const { className, label, onClick } = this.props;

    return (
      <button
        className={join(button({ pressed, hover }), className)}
        onClick={onClick}
      >
        <label className={button("label", ["strong"])}>{label}</label>
      </button>
    );
  }
}
```

## License

[MIT](LICENSE.md). Copyright (c) 2018 Matteo Ferretti
