.PHONY: run-manage-files ls clean

run-manage-files:
	node --permission --allow-fs-read="./file.txt" --allow-fs-write="./output/*" manage-files.js

ls:
	node cli.js $(DIR)

clean:
	rm -rf output