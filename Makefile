NODE=`which node`
NPM=`which npm`
GRAFANA_PATH="node_modules/@grafana/toolkit/bin/grafana-toolkit.js"
BREW=$(which brew)
CLI_TOOLS_PATH=~/work/cli-tools/stardust_map_topology
PROJECT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))
CONTAINER_NAME=esnet-networkmap-panel
PROXY_NAME=mitmproxy
NETWORK_NAME=esnet-networkmap-e2e-net
CONTAINER_ID=$(shell docker ps -f name=$(CONTAINER_NAME) -q)
INSTANCES=$(shell docker ps --filter name=$(CONTAINER_NAME) --filter name=$(PROXY_NAME) -qa)
NETWORKS=$(shell docker network ls --filter name=${NETWORK_NAME} -q)
SPINUP_SLEEP_T=5

.PHONY: prod
prod:
	make build

.PHONY: build
build:
	yarn test
	yarn build
	yarn sign "--rootUrls" https://dashboard.stardust.es.net/,https://gf.gc1.dev-stage.stardust.es.net/
	yarn run "build_dts"

.PHONY: dev
dev:
	yarn dev

.PHONY: run
run:
	python3 -m http.server

.PHONY: restart
restart:
	$(BREW) services restart grafana

.PHONY: compose
compose:
	# start grafana docker instances + network, and map project to plugin directory on instance
	@if test "$(strip $(INSTANCES))" = ""; then docker -D compose up -d; else echo "Grafana instance found."; fi
	# get instances info
	sleep 2
	docker inspect $(CONTAINER_NAME) > $(PROJECT_DIR)/e2e/grafana-docker.json
.PHONY: test
test: compose
	@echo "Starting component tests..."
	yarn test
	@echo "Waiting for container to spin up..."
	@sleep $(SPINUP_SLEEP_T)
	@echo "Starting E2E Tests..."
	yarn e2e

.PHONY: test\:component
test\:component:
	@echo "Starting component tests..."
	yarn test

.PHONY: test\:e2e
test\:e2e: compose
	# run e2e tests
	@echo "Waiting for container to spin up..."
	@sleep $(SPINUP_SLEEP_T)
	@echo "Starting E2E Tests..."
	yarn run e2e

.PHONY: test\:ui
test\:ui: compose
	# run e2e tests, but with ui
	@echo "Starting E2E tests in Playwright UI..."
	yarn run e2e:ui

.PHONY: testignore
testignore:
	@echo ""
	@echo "These files will be included in 'npm publish' package:"
	@npm pack > /dev/null 2>&1
	@tar -tf *.tgz | sort | awk '{ print "    ", $$0 }'
	@rm *.tgz
	@echo ""

.PHONY: confirm
confirm:
	@echo "Does this look right? [y/N] " && read ans && [ $${ans:-N} = y ]

CURR_PUBLISHED_VERSION = $(shell npm view . version)
CURR_LOCAL_VERSION = $(shell cat package.json | jq -r .version)
.PHONY: check_version
check_version:
	@if test $(CURR_PUBLISHED_VERSION) = $(CURR_LOCAL_VERSION); then echo "The version number in 'package.json' matches the previous version. Refusing to publish." && false; else true; fi

.PHONY: push
push:
	npm publish

.PHONY: publish
publish: check_version prod testignore confirm push

.PHONY: clean
clean:
	@rm -rf ${PROJECT_DIR}.config/env
	@if test "$(strip $(INSTANCES))" = ""; then echo "No instances to cleanup."; else docker rm -v -f $(INSTANCES); fi
	@if test "$(strip $(NETWORKS))" = ""; then echo "No network $(NETWORK_NAME) found to remove."; else docker network rm $(NETWORKS); fi