# FORK of next-graphql-react

We use this fork of next-graphql-react 8.0.3 because the library suffered a total refactoring after this version.

And we didn't see it worth to rewrite our code to follow the new version guidelines.

Still v8.0.3 has some issues to work with latest next.js versions, so we had to make some modifications and that's the reason of this fork.

See also that this forks depends on the also forked [https://github.com/wunderio/graphql-react](graphql-react)

See [also PR notes](https://github.com/wunderio/client-fi-espoo-web/pull/298) (private repo)

Original README below:

---

# next-graphql-react

A [`graphql-react`](https://npm.im/graphql-react) integration for [Next.js](https://nextjs.org) to enable server side rendered GraphQL operations.

## Setup

To install [`next-graphql-react`](https://npm.im/next-graphql-react) and the [`graphql-react`](https://npm.im/graphql-react) peer dependency from [npm](https://npmjs.com) run:

```sh
npm install next-graphql-react graphql-react
```

See the [`withGraphQLApp`](#function-withgraphqlapp) examples to get started.

## Examples

- [The official Next.js example](https://github.com/zeit/next.js/tree/canary/examples/with-graphql-react).
- [The Next.js example](https://github.com/jaydenseric/graphql-react-examples) deployed at [graphql-react.now.sh](https://graphql-react.now.sh).

## Support

- Node.js `^10.17.0 || ^12.0.0 || >= 13.7.0`
- Browsers [`> 0.5%, not OperaMini all, not dead`](https://browserl.ist/?q=%3E+0.5%25%2C+not+OperaMini+all%2C+not+dead)

## API

### Table of contents

- [function withGraphQLApp](#function-withgraphqlapp)

### function withGraphQLApp

A higher-order React component to decorate a Next.js custom `App` component in `pages/_app.js` for [`graphql-react`](https://npm.im/graphql-react), enabling descendant GraphQL operations with server side rendering and client side data hydration.

It also forwards HTTP [`Link`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) headers with the following `rel` parameters from GraphQL responses received when [`ssr`](https://github.com/jaydenseric/graphql-react#function-ssr) runs to the Next.js page response:

- [`dns-prefetch`](https://html.spec.whatwg.org/dev/links.html#link-type-dns-prefetch)
- [`preconnect`](https://html.spec.whatwg.org/dev/links.html#link-type-preconnect)
- [`prefetch`](https://html.spec.whatwg.org/dev/links.html#link-type-prefetch)
- [`preload`](https://html.spec.whatwg.org/dev/links.html#link-type-preload)
- [`modulepreload`](https://html.spec.whatwg.org/dev/links.html#link-type-modulepreload)
- [`prerender`](https://html.spec.whatwg.org/dev/links.html#link-type-prerender)

Link URLs are forwarded unmodified, so avoid sending relative URLs from a GraphQL server hosted on a different domain to the app.

| Parameter | Type   | Description                     |
| :-------- | :----- | :------------------------------ |
| `App`     | object | Next.js custom `App` component. |

**Returns:** WithGraphQL — Next.js custom `App` higher-order component.

#### See

- [Next.js custom `App` docs](https://nextjs.org/docs#custom-app).
- [React higher-order component docs](https://reactjs.org/docs/higher-order-components).

#### Examples

_Ways to `import`._

> ```js
> import { withGraphQLApp } from 'next-graphql-react';
> ```
>
> ```js
> import withGraphQLApp from 'next-graphql-react/universal/withGraphQLApp.js';
> ```

_Ways to `require`._

> ```js
> const { withGraphQLApp } = require('next-graphql-react');
> ```
>
> ```js
> const withGraphQLApp = require('next-graphql-react/universal/withGraphQLApp');
> ```

_A custom `App`._

> In `pages/_app.js`:
>
> ```jsx
> import { GraphQLProvider } from 'graphql-react';
> import { withGraphQLApp } from 'next-graphql-react';
> import React from 'react';
>
> const App = ({ Component, pageProps, graphql }) => (
>   <GraphQLProvider graphql={graphql}>
>     <Component {...pageProps} />
>   </GraphQLProvider>
> );
>
> export default withGraphQLApp(App);
> ```
