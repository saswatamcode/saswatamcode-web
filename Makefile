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

.PHONY: update-submodule
update-submodule: $(HUGO)
	@git submodule update --init --recursive

.PHONY: web
web: $(HUGO)
	@$(HUGO) -b $(WEBSITE_BASE_URL)

.PHONY: web-serve
web-serve: $(HUGO)
	@$(HUGO) serve
