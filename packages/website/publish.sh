#!/bin/sh

yarn next build
yarn next export
touch out/.nojekyll
git add out/
git commit -m "chore: deploy website to gh-pages"
git subtree push --prefix out origin gh-pages
