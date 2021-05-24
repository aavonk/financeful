### DEV 

build-dev:
	cd web && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up


stop-dev:
	docker compose -f docker-compose-dev.yml down

seed-db:
	docker compose -f docker-compose-dev.yml run --rm server yarn seed:db

reset-db:
	docker compose -f docker-compose-dev.yml run --rm server yarn reset:db

