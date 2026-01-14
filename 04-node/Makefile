.PHONY: run-manage-files run-server ls clean

run-manage-files:
	node --permission --allow-fs-read="./file.txt" --allow-fs-write="./output/*" manage-files.js

run-server:
	node --watch server.js

ls:
	node cli.js $(DIR)

clean:
	rm -rf output