# ESnet Network Map Release Process

Publishing a JS package to NPM can be a confusing process. The commands to technically achieve a deployment are simple, but the process is lacking in any formality or discipline. In particular, for instance, when lacking a `.npmignore` file, `npm publish` will publish every single file in a directory.

## Supporting files

`Makefile`

For this repo, the Makefile coordinates the test, build, and release process.

`.npmignore`

By default, in theory, `npm publish` should respect the exclusions from `.gitignore`. In practice, however, this is not a reliable mechanism.

We should specifically exclude any files not intended to be published in a `.npmignore` file. To test the `.npmignore` file you can use

```make testignore```

Internally, this command does something like this:

```
npm pack && tar -tf esnet-networkmap-panel-\*.tgz | sort && rm esnet-networkmap-panel-\*
```

and presents the user with a command prompt to check the file manifest.

## Deploying to NPM

To run the tests, build a production copy, check the manifest of published files and perform the publish to npm, run

`make publish`