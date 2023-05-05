start:
	@echo "Starting App ..."
	@echo "Starting Hasura ..."
	@cd hasura && docker compose up -d && cd ..
	@echo "Starting Server ..."
	@yarn start:dev
	@echo "Open Hasura Console ..."
	@open http://localhost:8080/console

down-hasura:
	@echo "Stopping Hasura ..."
	@cd hasura && docker compose down
