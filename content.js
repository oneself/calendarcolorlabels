/**
 * Create a format function for nicer string templating
 */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

/**
 * Called with calendar is loaded.  Used to add color labels.
 */

function onLoad() {
  // We need to keep running this since Google Calendar doesn't have clear page
  // loads that we can rely on the set color dot labels.
  let refreshIntervalId = setInterval(function() {
    // Get labels from storage
    chrome.storage.sync.get("colorLabels", ({ colorLabels }) => {
      // Only proceed if we have any defined.
      if (colorLabels) {
        for (var color in colorLabels) {
          var colorName = colorLabels[color][COLOR_NAME];
          // If color name is defined
          if (colorName) {
            // Find each color based on the "data-text" attribute since that seems
            // to be the only property that is not obfuscated.
            let searchTerm = '[data-text="{0}"]'.format(colorName);
            let colorHint = document.querySelector(searchTerm);
            // Make sure we found something
            if (colorHint) {
              // Make sure dotName is not an empty string.
              var colorText = colorLabels[color][COLOR_TEXT];
              if (colorText) {
                colorHint.dataset.text = colorText;
              }
            }
          }
        }
      }
    });
  }, 1000); // once a second should do it.
}

// Wait until page is fully loaded.
window.addEventListener ("load", onLoad, false);
