# strm-test

## Live demo

https://strm-test.surge.sh/

## Issues encountered

### Article source logo  
* Some logos could not be fetched from the CDN (403 error).  
* Some logos meant to be wide are padded to fit in a square format, which makes them appear much smaller than other logos

The inconsistent size of the logos could hinder the perceived quality of the UI, so I decided not to include them. Logos are not crucial so these two issues can be further investigated in the future.

## Improvements

### Duplicated articles
Some articles appear twice in the feed, from different sources. If it makes sense from the product perpective we could filter these duplicates based on the title. 

## Sticky dates

Clicking on the date will add a fake article dated May 6, so that you can better visualize the sticky dates implementation. Click again to remove.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
