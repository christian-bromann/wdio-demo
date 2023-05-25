# SFNode Demo

A demo project showcasing component testing in WebdriverIO for various frameworks. To run the demo, click:

[![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Achristian-bromann%2Fsfnode-demo.git)

It will open VS Code and check out this project for you. You can also manually clone the project.

After you downloaded this example repository, install the dependencies via:

```sh
export DETECT_CHROMEDRIVER_VERSION=true
npx runme run -p install-lit install-preact install-react install-solid install-svelte install-vue
```

You can then kick off a component tests in the framework of your desire:

## Lit HTML

```sh
npm run wdio -w lit
```

## Preact

```sh
npm run wdio -w preact
```

## React

```sh
npm run wdio -w react
```

## SolidJS

```sh
npm run wdio -w solid
```

## Svelte

```sh
npm run wdio -w svelte
```

## Vue

```sh
npm run wdio -w vue
```