NODE=`which node`
NPM=`which npm`
GRAFANA_PATH="node_modules/@grafana/toolkit/bin/grafana-toolkit.js"
BREW=$(which brew)
CLI_TOOLS_PATH=~/work/cli-tools/stardust_map_topology
PROJECT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))
CONTAINER_NAME=esnet-networkmap-panel
CONTAINER_ID=$(shell docker ps -f name=$(CONTAINER_NAME) -q)

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
	# start grafana docker instance and map project to plugin directory on instance
	docker-compose up -d
	# get instance info
	docker inspect $(CONTAINER_NAME) > $(PROJECT_DIR)/e2e/grafana-docker.json

.PHONY: test
test: compose
	yarn test

.PHONY: test\:component
test\:component:
	yarn test

.PHONY: test\:e2e
test\:e2e: compose
	# run e2e tests
	yarn e2e

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
