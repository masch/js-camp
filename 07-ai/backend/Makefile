.PHONY: run-server

run-server:
	node --watch app.js

run-server-prod:
	NODE_ENV=production node --watch app.js

deploy-prod:
	vc deploy --prod

test:
	NODE_ENV=test node --test app.test.js

test-dev:
	NODE_ENV=test node --test --watch app.test.js