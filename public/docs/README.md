# Changelog

## Setup Next.js & Flast server

I setup [my plain next.js server last night](https://github.com/kingmeers/merchant-demo-craft/commit/75a08ee46cb4e7c1d5e66d2a940d7e0a3c9cb249), and now it's updated with libraries I may need, I've also began writing flask server for image processing & pdf creation.

## Initialised SerpAPI to get initial data for AI Agent _time_

<!-- include link & commit -->

1. Init'd SerpAPI
2. Launched GPT4 API locally
3. Started writing prompts, created functions with feedback loops that validated response and retry if failed.
4. Setup Worker Agents (multithreading) to handle different parts of the full process

## Setting up predict func using ARIMA from SERP trends on Coloring Books

1. Got best prediction for query for which to make products
2. Teaching agent to never suggested licensed/branded characters

### Todo (completed)

1. Need to skip constant data, else ARIMA would be redundant, focusing more on spikes of interest, seasonal changes, etc.
   - this is the base query will always be better than any sub-queries it may yield from AutoSuggestions

## Settings up Book Creator

Will be silly to create one function for everything, as if to assume things will never fail, so instead I've build a recursive agent inference check to confirm the response returned by LLM is the one I'm expecting.

Also will be assigning each agent a different job, and each agent's result will be used by another agent once ready, for further processing until the final module

For example

```
# Oracle to manage the book configurations
python manager.py --id oracle

# Picasso to manag the image gen per book configuration, etc.
python manager.py --id picasso
```

## Making super simple PDF for pages and internal pages

1. Made Cover PDF compliant with KDP standards
2. Made Internal Pages compliant with KDP standards

## Knowing when a book is finished, probably need a product state detector, check each folder and if one is complete, wait few seconds, bundle it and publish it as product to Merchant store!

1. All pages are done
2. Cover is done

# Mind Mapping

1. I think I will assign the status of a book to complete when it passes validation and is inside the Next.js folder, ready to be served/ purchased & tracked. Built in python, these agents will validate when they deem the books ready for production release.

# How to Run

Now things are getting a bit insane, I need to write this down

How to run

### Agents

For each session, do this

```
source ~/.bash_profile && source bookie_env/bin/activate
```

_Run all of these, simulatenously_ **in this order**

```
python picasso.py
```

```
python manager.py --id minstrel
python manager.py --id oracle
python manager.py --id picasso
python manager.py --id bookkeeper
```

then `python seer.py`
