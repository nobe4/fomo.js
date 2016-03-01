# fomo.js

Fear of missing out. JS to the rescue !

Add an url, a selector and let the notifications flow !
See test.js for an example.

## Usage

    var fomo = require('fomo');
    fomo( /* config */ );

## Config

The configuration has the following format :

      [
         { url : '', selector: '', frequence: 0 },
         ...
      ]

The frequence is optional (default: 1 minute).

## How does it work ?

The script fetches the url, get the text of the first element matched by the selector and look for changes. Each time the value changes, a notification will be sent.

## Contribution

Idea, bug? Open a new issue!

## License

MIT
