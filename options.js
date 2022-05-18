
/**
 * Function to handle saving the options
 */
function handleOptionsSave(event) {
  // Initialize the colorLabels
  let colorLabels = {};
  let dotColors = DEFAULT_DOT_NAME_SCOLORS;
  // Look for each predefined color (they are defined in shared.js).
  for (var color in dotColors) {
    let colorName = document.getElementById("color-" + color);
    let colorText = document.getElementById(color);
    colorLabels[color] = {
      COLOR_NAME: colorName ? colorName.value : color,
      COLOR_TEXT: colorText ? colorText.value : ""
    };
  }
  // Save labels in chrome's storage.  Show an alert when done.
  chrome.storage.sync.set({ colorLabels }, () => { alert("Saved"); });
}

/**
 * Function to restore detault colors.
 */
function handleOptionsRestoreDefaultColors(event) {
  let dotColors = DEFAULT_DOT_NAME_SCOLORS;
  // Look for each predefined color (they are defined in shared.js).
  for (var color in dotColors) {
    let colorName = document.getElementById("color-" + color);
    if (colorName) {
      colorName.value = color;
    }
  }
  return false;
}

/**
 * Construct the options page.
 */
function constructOptions(dotColors) {
  // Create an options page to set the labels for each color dot
  let formFields = document.getElementById("colors-form-fields");

  // Read labels from storage.
  chrome.storage.sync.get("colorLabels", ({ colorLabels }) => {
    // If this is a fresh install, initialize the array.
    if (!colorLabels) {
      colorLabels = {};
    }
    // Generated options for each predefined color (they are defined in shared.js).
    for (var color in dotColors) {
      let div = document.createElement("div");
      div.className = "color-option";
      // Display a circle with color
      let span = document.createElement("span");
      span.className = "circleBase";
      span.id = "circle-" + color;
      span.style.backgroundColor = dotColors[color];
      // Then the color's name
      let colorLabel = document.createElement("input");
      //colorLabel.textContent = color;
      //colorLabel.className = "color-label";
      colorLabel.type = "text";
      colorLabel.value = color;
      colorLabel.id = "color-" + color;
      // Try to read the color's label from storage, if it's not there, use the English name.
      // This gives the ability to support other languages.
      if (colorLabels.hasOwnProperty(color) && colorLabels[color][COLOR_NAME]) {
        colorLabel.value = colorLabels[color][COLOR_NAME];
      } else {
          colorLabel.value = color;
      }
      // And finally, the input to fill in the custom name.
      let colorText = document.createElement("input");
      colorText.type = "text";
      colorText.name = color;
      colorText.id = color;
      // If there's a color text defined, take it from storage.
      if (colorLabels.hasOwnProperty(color) && colorLabels[color][COLOR_TEXT]) {
        colorText.value = colorLabels[color][COLOR_TEXT];
      }
      div.appendChild(span);
      div.appendChild(colorLabel);
      div.appendChild(colorText);
      //formFields.insertBefore(div, form.firstChild);
      formFields.appendChild(div);
    }

    // Add restore defaults button handler to change color names back to English.
    let restoreDefaultsBtn = document.getElementById("colors-form-restore-button");
    restoreDefaultsBtn.addEventListener("click", handleOptionsRestoreDefaultColors);

    // Add a submit button handler to save changes
    let submitBtn = document.getElementById("colors-form-save-button");
    submitBtn.addEventListener("click", handleOptionsSave);
  });
}

constructOptions(DEFAULT_DOT_NAME_SCOLORS);
