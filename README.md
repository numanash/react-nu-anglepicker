# react-nu-anglepicker

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

You can clone it and step by step create your own NPM package and publish it.

It is simple React anglepicker.

[**Live Demo**](https://numanash.github.io/react-nu-anglepicker/)

## Installation:

```bash
npm install react-nu-anglepicker --save-dev
```

or

```bash
yarn add -D react-nu-anglepicker
```

## Usage :

Add `NuAnglePicker` to your component:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NuAnglePicker } from 'react-nu-anglepicker'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <div>
            <h2>Default AnglePicker</h2>
            <NuAnglePicker />
        </div>
        <hr />
        <div>
            <h2>AnglePicker with predefined value</h2>
            <NuAnglePicker value={180} />
        </div>
    </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/react-nu-anglepicker
[npm-image]: https://img.shields.io/npm/v/react-nu-anglepicker
[github-license]: https://img.shields.io/github/license/numanash/react-nu-anglepicker
[github-license-url]: https://github.com/numanash/react-nu-anglepicker/blob/master/LICENSE
[github-build]: https://github.com/numanash/react-nu-anglepicker/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/numanash/react-nu-anglepicker/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-nu-anglepicker
