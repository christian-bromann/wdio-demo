# Lit HTML Example

To run this example, first install dependencies:

```sh { name=install-lit }
npm install
```

then run:

```sh { name=test }
npx wdio run ./wdio.conf.ts --spec ./src/Login.C.test.ts
```

If you like to run the test in watch mode, run:

```sh { name=test-watch }
npx wdio run ./wdio.conf.ts --spec ./src/Login.C.test.ts --watch
```

# Enable Test Coverage

Update the following in your `wdio.conf.ts` to capture test coverage:

```ts
    runner: ['browser', {
        preset: 'svelte',
        // start browser window when `DEBUG` environment variable is set
        headless: !Boolean(process.env.DEBUG),
        coverage: {
            enabled: true
        }
    }],
```

You can view the test coverage report via:

```sh
npm i -g http-server
cd ./coverage/html
open http://localhost:8080 && http-server
```