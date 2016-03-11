# fomo.js

Fear of missing out. JS to the rescue !

Add an url, a selector and let the notifications flow !
See test.js for an example.

## Installation

    npm install nobe4/fomo.js

## Usage

    var fomo = require('fomo.js');
    fomo( /* config */ );

When you click on the notification, it will open the url in your web browser.

## Config

The configuration has the following format :

      [
         { url : '', selector: '', frequence: 0, callback: function(url, innerText, innerHTML) {} },
         ...
      ]

The frequence is optional (default: 1 minute).
The callback is optional. By default the notification pops up and nothing else happens. If you do specify one, it will prevent the notification.

## How does it work ?

The script fetches the url, get the text of the first element matched by the selector and look for changes. Each time the value changes, a notification will be sent.

## Contribution

Idea, bug? Open a new issue!

## License

MIT
