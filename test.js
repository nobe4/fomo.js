var fomo = require('.');

fomo([
    {
      url: 'https://www.reddit.com/new/',
      selector: '.thing > div.entry.unvoted > p.title > a',
      frequence: 1 * 1000 // once every second
    },
    {
      url: 'http://stackoverflow.com/',
      selector: '.question-summary > div.summary > h3 > a',
    },
    {
      url: 'https://www.reddit.com/new/',
      selector: '.thing > div.entry.unvoted > p.title',
      frequence: 100,
      callback: function(url, text, html) {
        console.log("Callbacks work.");
        console.log("Url is " + url);
        console.log("Text is " + text);
        console.log("Html is " + html);
      }
    },
]);

