var request = require('request'),
    cheerio = require('cheerio'),
    open = require('open'),
    notifier = require('node-notifier');

notifier.on('click', function (notifierObject, options) {
  open(options.title);
});

function getPage(url, selector, callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var element = cheerio.load(body)(selector).first();
      callback(element.text(), element.html());
    } else {
      console.log(error, response.status);
    }
  });
}

function fetchAndNotify(url, selector, frequence, callback){
  var currentValue = undefined;
  setInterval(function(){
    getPage(url, selector, function(text, html){
      if (text != currentValue) {
        currentValue = text;

        if(callback && callback(text, html) === false) return;

        console.log(url, ':', currentValue);
        notifier.notify({
          'title': url,
          'message': currentValue,
          'wait': true
        });
      }
    });
  }, frequence);
}

module.exports = function(configs){
  for(var i in configs){
    var config = configs[i];

    // Check and fill the config
    if(!config.url) throw "Missing url in the config";
    if(!config.selector) throw "Missing selector in the config";
    if(!config.frequence) config.frequence = 60 * 1000; // default is once per minute

    fetchAndNotify(config.url, config.selector, config.frequence, config.callback);
  }
};
