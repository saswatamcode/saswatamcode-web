include .bingo/Variables.mk

WEBSITE_DIR ?= website
WEBSITE_BASE_URL ?= https://saswatamcode.tech
MD_FILES_TO_FORMAT = $(shell find content -name "*.md") $(shell ls *.md)
MDOX_CONFIG ?= .mdox.validate.yaml 
SED ?= $(shell which gsed 2>/dev/null || which sed)

.PHONY: format
format: $(MDOX)
	@echo ">> formatting blogs with link check"
	$(MDOX) fmt -l --links.validate.config-file=$(MDOX_CONFIG) $(MD_FILES_TO_FORMAT)

.PHONY: check
check: $(MDOX)
	@echo ">> checking formatting and links"
	$(MDOX) fmt --check -l --links.validate.config-file=$(MDOX_CONFIG) $(MD_FILES_TO_FORMAT)

.PHONY: web-pre
web-pre: $(HUGO)
	@git submodule update --init --recursive
	cd $(WEBSITE_DIR)/themes/doks/ && npm install && rm -rf content
	cd $(WEBSITE_DIR)/themes/doks/layouts/partials/footer && rm -rf footer.html && touch footer.html
	cd $(WEBSITE_DIR)/themes/doks/assets/js && rm -rf darkmode.js && touch darkmode.js
	$(SED) -i 's/<body class="{{ .Scratch.Get "class" }}">/<body class="{{ .Scratch.Get "class" }} dark">/' $(WEBSITE_DIR)/themes/doks/layouts/_default/baseof.html
	$(SED) -i '42d;43d' $(WEBSITE_DIR)/themes/doks/layouts/partials/head/seo.html
	$(SED) -i '77d;80d' $(WEBSITE_DIR)/themes/doks/layouts/partials/head/opengraph.html

.PHONY: web
web: web-pre $(WEBSITE_DIR)/node_modules $(HUGO)
	cd $(WEBSITE_DIR) && $(HUGO) -b $(WEBSITE_BASE_URL)

.PHONY: web-serve
web-serve: web-pre $(WEBSITE_DIR)/node_modules $(HUGO)
	@cd $(WEBSITE_DIR) && $(HUGO) serve
