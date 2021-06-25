
PROJECT_NAME = calendarcolorlabels
OUT = out
ZIP = $(OUT)/$(PROJECT_NAME).zip

clean:
	rm -rf $(OUT)

zip: clean
	mkdir -p $(OUT)
	cd .. && zip -r $(PROJECT_NAME)/$(ZIP) $(PROJECT_NAME) -x "*.git*" "*.md" "*/out*" "*/makefile*"
