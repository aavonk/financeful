build: 
	docker build -t server .




###  Integration TESTS

build-test-image:
	docker build -t server-test -f Dockerfile.test .

run-test-migration:
	docker compose -f docker-compose.test.yml run --rm server-test yarn migrate:init

start-test-env:
	docker compose -f docker-compose.test.yml up

### This opens the containers, runs a migration on the DB, and then runs tests in watch mode
test-watch:
	docker compose -f docker-compose.test.yml run --rm server-test yarn migrate:init && yarn test:watch
### Opens Container and tests.
test:
	docker compose -f docker-compose.test.yml run --rm server-test  -- yarn test

test-wait:
	sudo docker compose -f docker-compose.test.yml run --rm server-test ./scripts/wait-for-it.sh database-test:5433 -- yarn jest -i
### Kills all running containers
destroy-tests:
	docker compose -f docker-compose.test.yml down

