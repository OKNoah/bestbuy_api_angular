# Best Buy Coding Assessment

This is a coding assessment for Best Buy. It uses the Best Buy product API and Angular, as well some modules. Bower used for package management.

A demo is live here: http://noahjobsgray.com/bb_assessment/#/maker/apple

## Installtion

The site uses Bower as it's package manager. If you don't have Bower, do

On Mac (this requires Homebrew from http://brew.sh):

`brew install bower`

on Debian/Ubuntu Linux:

`apt-get install bower`

Then navigate to your desired install directory (eg. /var/www) and clone the repo:

	cd /var/wwww
	git clone https://github.com/OKNoah/bestbuy_api_angular.git

Go to the new folder and install the dependencies with bower

	cd bestbuy_api_angular
	bower install

That's it. You don't need Apache. You can just open the index.html file locally. Or run Apache or a node server to view it.

## Usage

First, choose a manufacturer in the top nav. You can also choose any anufacturer by going to `index.html#/maker/MANUFACTURER-NAME`, eg. `index.html#/maker/intel`.

You can then see a list of the categories that's made from the first results. Click a category to narrow the search results to that manufacturer and category. The URL will be `index.html#/maker/MANUFACTERE-NAME/category/CATEGORYPATH-ID`, eg. `index.html/#/maker/amd/category/abcat0500000`.

Click on a product (anywhere) to bring up an offers details modal. Click away to close it.

## Shortcomings

1. The catgeory list isn't complete. It should use the categry API.

2. It's not completely responsive. It works, but the collapse button is broken, I think.

3. There should be more maufacturers and a manufacturer search.

I might improve it later for fun.