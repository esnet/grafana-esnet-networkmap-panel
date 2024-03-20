
## Development Notes

This project was built in Node 18.19.1 (LTS Hydrogen) and must built using Yarn (1.22.0 or higher).

## Table of Contents

[Local Development](#local-development)

[Troubleshooting](#troubleshooting)

[Testing Requirements](#testing-requirements)

## Local development

Pre-requisite: For local development, Grafana must be running locally as a service or as a Docker container.

1. Ensure Grafana is running.
    - On Homebrew (Mac), `brew services start grafana` should be sufficient.
    - Via Docker, you can start the container using `docker run -d -p 3000:3000  grafana-esnet-networkmap-panel-grafana`
    - On Windows, you may use Docker Desktop to run the container or enable it as a Windows service. (Hit Ctrl-R and enter
    `services.msc` to open the Services dialog, scroll to the Grafana entry, right-click and select Enable.)

Project setup:

Pre-requisites: Both Node 18.19.1 (LTS Hydrogen) and Yarn 1.22.0 or higher must be installed. Other versions may not build
and when they do, stability issues, unexpected failures, or loss of functionality may occur.

It is recommended to use [nvm](https://github.com/nvm-sh/nvm) to install and manage your Node versions.

2. Install required dependencies via Yarn, as normal:

```sh
$ yarn install
```

3. Configure Grafana to read plugins from the parent directory of the project.

When installed as a service, the most likely place for the config file is `/usr/local/etc/grafana/grafana.ini`
For example, if the project is located in /Users/myuser/grafana-plugins/grafana-esnet-networkmap-panel, set the
plugins value to the parent directory:

```grafana.ini
plugins = /Users/myuser/grafana-plugins ;/var/lib/grafana/plugins
```

When running it as a Docker container using docker-compose, the `docker-compose.yaml` file already maps the generated
dist directory to the correct location.

Mapping only needs to be done once. Restart Grafana or the container after mapping is complete.

4. Build the project once using `make dev`. This will create source maps permit setting of breakpoints in Chrome Debugger during development. Note that this must be run at least once and may require rerunning periodically if the plugin is being developed in the Grafana webapp.

5. Install Playwright browsers for testing (this only needs to be done once).

```sh
$ npx playwright install
```

6. Build the project using `make prod` (`prod` is not a typo). A failure during signing is expected for local development.

This will update the files in the dist directory.

```sh
$ make prod
```

7. Run the Yarn script `build_dts` to complete the process of building without signing.

This will update the files in the dist directory and readies the contents for Grafana. If Grafana is already running,
and already has its plugins directory mapped (see step 4), there is no need to restart.

```sh
$ yarn run build_dts
```

8. Open a browser and navigate to your Grafana instance.

9. Login and create a new dashboard or navigate to the default one.

10. Add a new panel to the dashboard. The plugin should be ready for adding as "Network Map Panel".

11. Enter edit mode in the newly added panel. You should be able to view a map (and its sidebar when enabled) plus work with the
Grafana sidebar on the right to configure the panel. Follow the instructions in README.md to configure the Grafana panel.

### Troubleshooting

Q1. I cannot set breakpoints in TypeScript files in the Chrome debugger. What is going on?

A1. It is possible that the project was built using `make prod` without running `make dev` first. `make dev` will create the source
    maps files in the dist directory allowing setting of breakpoints within TypeScript.

## Testing Requirements

[Playwright](https://https://playwright.dev/) and Karma-driven [ShouldJS](https://shouldjs.github.io/) are used to implement integration
and unit testing for the plugin respectively, following as closely as needed to the implementation utilized by Grafana's plugin-e2e
package.

### Test configuration

You must specify a username and password as a JSON object under playwright/.auth/credentials.json. At the same time,
e2e/e2e.config.json should be configured to target a particular dashboard for running the tests upon. Use the included
e2e.config.json.sample as a basis for your own e2e.config.json.

Testids should not have to be changed, although you have the option of doing so. The only requirement is that all testids
therein be unique.

Sample playwright/.auth/credentials.json:

```json
{
    "username": "myGrafanaUser",
    "password": "myGrafanaPassword"
}
```

### Test Browsers

Browser packages utilized by Playwright must be installed globally in order to run the e2e tests. To install them, open a shell command prompt
and enter:

```sh
$ npx playwright install
```

### Test Execution and Reporting

To run both component and integration tests:

```sh
$ make test
```

Prior to running the tests,

You also have the option of running component and integration tests separately, either using make or Yarn (both pairs
of shell commands below do the same thing.)

```sh
$ make test:component
$ make test:e2e

$ yarn test
$ yarn e2e
```

Integration tests are written with the assumption the Playwright's own browsers are globally installed in the system
using `npx playwright install`. Reconfigure in the playwright.config.ts file if a different browser is
preferred. Test suite files (*.spec.js) are included in the e2e folder.
