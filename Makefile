install:
	npm install

up:
	npm run dev

build:
	npm run build

lint:
	npm run lint

format:
	npm run format

format-check:
	npm run format:check

smoke:
	npm run build
	npm run smoke

deploy:
	npm run deploy