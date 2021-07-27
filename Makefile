include .bingo/Variables.mk

WEBSITE_DIR ?= website
WEBSITE_BASE_URL ?= https://saswatamcode.tech
# MD_FILES_TO_FORMAT = $(shell find docs -name "*.md") $(shell ls *.md)

.PHONY: web-pre
web-pre: $(WEBSITE_DIR)/node_modules $(HUGO)
	@git submodule update --init --recursive
	cd $(WEBSITE_DIR)/themes/doks/ && npm install && rm -rf content
	cd $(WEBSITE_DIR)/themes/doks/layouts/partials/footer && rm -rf footer.html && touch footer.html
	cd $(WEBSITE_DIR) && $(HUGO) -b $(WEBSITE_BASE_URL)

.PHONY: web
web: $(WEBSITE_DIR)/node_modules $(HUGO)
	cd $(WEBSITE_DIR) && $(HUGO) -b $(WEBSITE_BASE_URL)

.PHONY: web-serve
web-serve: $(WEBSITE_DIR)/node_modules $(HUGO)
	@cd $(WEBSITE_DIR) && $(HUGO) serve
