////////////////////////////////////////////////
// Force a weird jQuery identifier so
// script don't interfere with page libraries
////////////////////////////////////////////////
var $JQ = jQuery.noConflict();

$JQ.utils = function () {
  return {

    ////////////////////////////////////////////
    // GET EXTENSION API OBJECT
    ////////////////////////////////////////////
    getExtensionApi: function() {

      if (typeof browser !== 'undefined') {
        return browser;
      }
      else if (typeof chrome !== 'undefined')
      {
        return chrome;
      }

      console.error('Both "browser" and "chrome" objects are undefined.');
      return null;
    },

    getEnabledLanguageIsoCodes: function() {
      return [
       'en',
       'fr',
       'es',
       'de',
       'it',
       'pt',
       'nl'
      ]
    },

    getCurrentLanguageIsoCode: function() {
      var fullIsoCode = this.getExtensionApi().i18n.getUILanguage();

      return fullIsoCode.split('-')[0];
    },

    sendMessage: function(message, callback) {

      // Chrome API differs from Web Extensions (uses callbacks over promises)
      if (typeof browser !== 'undefined') {

        var promise = this.getExtensionApi()
          .runtime
          .sendMessage(message);

        promise.then(
          // Success callback
          function(response) {
            callback(response);
          },
          // Error callback
          function(response) {
            console.error('Failed get value. ' , response);
            return false;
          });

      } else if (typeof chrome !== 'undefined') {

        this.getExtensionApi()
          .runtime
          .sendMessage(
            message,
            function (response) {
              callback(response);
            }
          );
      }
    },
    onMessage: function(callback) {
      console.log('onMessage called.');

      // Chrome API differs from Web Extensions (uses callbacks over promises)
      if (typeof browser !== 'undefined') {

        var promise = this.getExtensionApi()
          .runtime
          .onMessage
          .addListener(callback);

      } else if (typeof chrome !== 'undefined') {

        //noinspection TypeScriptUnresolvedVariable,TypeScriptValidateJSTypes
        this.getExtensionApi()
          .runtime
          .onMessage
          .addListener(
            function (request,sender,sendResponse) {
              callback(request,sender,sendResponse);
            }
          );
      }
    }

  }
};


// TODO: 'When' we refactor to typescript put this somewhere that can be shared to avoid copy pasting

console.log('debug');
// Get current language ISO code
var languageIsoCode = $JQ.utils().getCurrentLanguageIsoCode();
// Get array of enabled language iso codes
var enabledLanguages = $JQ.utils().getEnabledLanguageIsoCodes();

// Default body class
var bodyClass = 'lang-en';

// If current language ISO code is an enabled language
if (enabledLanguages.indexOf(languageIsoCode) !== -1)
{
  // Generate language body class
  bodyClass = 'lang-' + languageIsoCode;
}

// Add class to body of page
$JQ('body').addClass(bodyClass);
