
## Development Notes

This project was built in Node 14.21.3 (LTS Fermium) and intended to be built using Yarn (1.22.21).

### Local development

Pre-requisite: For local development, Grafana must be running locally as a service or as a Docker container.

1. Ensure Grafana is running.
    - On Homebrew (Mac), `brew services start grafana` should be sufficient.
    - Via Docker, you can start the container using `docker run -d -p 3000:3000  grafana-esnet-networkmap-panel-grafana`
    - On Windows, you may use Docker Desktop to run the container or enable it as a Windows service. (Hit Ctrl-R and enter
    `services.msc` to open the Services dialog, scroll to the Grafana entry, right-click and select Enable.)

Project setup:

Pre-requisites: Both Node 14.21.3 (LTS Fermium) and Yarn must be installed. Later builds may not build or your mileage may vary.

2. Install required dependencies via Yarn, as normal:

```
$ yarn install
```

3. Configure Grafana to read plugins from the parent directory of the project.

When installed as a service, the most likely place for the config file is `/usr/local/etc/grafana/grafana.ini`
For exmaple, if the project is located in /Users/myuser/grafana-plugins/grafana-esnet-networkmap-panel, set the
plugins value to the parent directory:

```grafana.ini
plugins = /Users/myuser/grafana-plugins ;/var/lib/grafana/plugins
```

When running it as a Docker container using docker-compose, the `docker-compose.yaml` file already maps the generated
dist directory to the correct location.

Mapping only needs to be done once. Restart Grafana or the container after mapping is complete.

4. Build the project once using `make dev`. This will create source maps permit setting of breakpoints in Chrome Debugger during development. Note that this must be run at least once and may require rerunning periodically if the plugin is being developed in the Grafana webapp.

5. Build the project using `make prod` (`prod` is not a typo). A failure during signing is expected for local development.

This will update the files in the dist directory.

```
$ make prod
```

3. Run the Yarn script `build_dts` to complete the process of building without signing.

This will update the files in the dist directory and readies the contents for Grafana. If Grafana is already running,
and already has its plugins directory mapped (see step 4), there is no need to restart.

```
$ yarn run build_dts
```

4. Open a browser and navigate to your Grafana instance.

5. Login and create a new dashboard or navigate to the default one.

6. Add a new panel to the dashboard. The plugin should be ready for adding as "Network Map Panel".

7. Enter edit mode in the newly added panel. You should be able to view a map (and it's sidebar when enabled) plus work with the
Grafana sidebar on the right to configure the panel.

### Troubleshooting

Q1. I cannot set breakpoints in TypeScript files in the Chrome debugger. What is going on?

A1. It is possible that the project was built using `make prod` without running `make dev` first. `make dev` will create the source
    maps files in the dist directory allowing setting of breakpoints within TypeScript.