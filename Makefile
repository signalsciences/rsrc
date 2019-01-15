fresh: ## clear out all node_modules and lock files, reinstall
	rm -rf packages/**/node_modules \
		&& rm -rf node_modules yarn.lock \
		&& yarn install

flow-typed: ## reinstall flow-types for packages
	rm -rf ./packages/**/flow-typed \
		&& yarn run -- lerna exec --concurrency 1 -- \
		npx flow-typed install --overwrite --packageDir ../../

license: ## copy license files to packages
	echo packages/** | xargs -n 1 cp LICENSE

#  ---
#  DOCKER
#  ---

docker-image: ## build docker image for cosmo
	docker build -t cosmo .

docker-build: docker-image ## build the packages
	docker run -it --rm --init \
		-v /usr/src/app/node_modules \
		-v ${PWD}:/usr/src/app \
		cosmo \
		yarn build

docker-dev: docker-image ## starts the next server on port 3000
	docker run -it --rm --init \
		-v /usr/src/app/node_modules \
		-v ${PWD}:/usr/src/app \
		-h 0.0.0.0 \
		-p 3000:3000 \
		cosmo \
		yarn dev

docker-test: docker-image ## runs unit tests
	docker run -it --rm --init \
		-v /usr/src/app/node_modules \
		-v ${PWD}:/usr/src/app \
		cosmo \
		yarn test

docker-shell: docker-image ## builds the container and opens a shell
	docker run -it --rm --init \
		-v /usr/src/app/node_modules \
		-v ${PWD}:/usr/src/app \
		-h 0.0.0.0 \
		-p 3000:3000 \
		cosmo \
		/bin/bash

# https://www.client9.com/self-documenting-makefiles/
help:
	@awk -F ':|##' '/^[^\t].+?:.*?##/ {\
	printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)

.DEFAULT_GOAL: help

.PHONY: help fresh flow-typed license docker-image docker-build docker-dev docker-test docker-shell
