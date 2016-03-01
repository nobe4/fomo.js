var request = require('request'),
    cheerio = require('cheerio'),
    notifier = require('node-notifier');

function getPage(url, selector, callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var text = cheerio.load(body)(selector).first().text();
      callback(text);
    } else {
      console.log(error, response.status);
    }
  });
}

function fetchAndNotify(url, selector, frequence){
  var currentValue = undefined;
  setInterval(function(){
    getPage(url, selector, function(value){
      if (value != currentValue) {
        currentValue = value;
        console.log(url, ':', currentValue);
        notifier.notify({
          'title': url,
          'message': currentValue
        });
      }
    });
  }, frequence);
}

// configs has the following format :
// [
//    { url : '', selector: '', frequence: 0 },
//    ...
// ]
module.exports = function(configs){
  for(var i in configs){
    var config = configs[i];

    // Check and fill the config
    if(!config.url) throw "Missing url in the config";
    if(!config.selector) throw "Missing selector in the config";
    if(!config.frequence) config.frequence = 60 * 1000; // default is once per minute

    fetchAndNotify(config.url, config.selector, config.frequence);
  }
};
