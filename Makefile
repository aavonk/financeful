### DEV 

build-dev:
	cd web && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

stop-dev:
	docker compose down