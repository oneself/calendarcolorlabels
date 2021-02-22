
// Create an options page to set the labels for each color dot
let page = document.getElementById("colors-form");

// Function to handle saving the options
function handleOptionsSave(event) {
  // Initialize the colorLabels
  let colorLabels = {};
  // Look for each predefined color (they are defined in shared.js).
  for (var color in dotColors) {
    let colorName = document.getElementById(color);
    // Check before trying to save.
    if (colorName) {
      colorLabels[color] = colorName.value;
    }
  }
  // Save labels in chrome's storage.  Show an alert when done.
  chrome.storage.sync.set({ colorLabels }, () => { alert("Saved"); });
}

function constructOptions(dotColors) {
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
      span.style.backgroundColor = dotColors[color];
      // Then the color's name
      let colorLabel = document.createElement("span");
      colorLabel.textContent = color
      colorLabel.className = "color-label";
      // And finally, the input to fill in the custom name.
      let text = document.createElement("input");
      text.type = "text";
      text.name = color;
      text.id = color;
      // If there's a name defined, take it from storage.
      text.value = colorLabels.hasOwnProperty(color) ? colorLabels[color] : "";
      div.appendChild(span);
      div.appendChild(colorLabel);
      div.appendChild(text);
      page.appendChild(div);
    }

    // Add a submit button to save changes
    let submitDiv = document.createElement("div");
    submitDiv.className = "submit-btn";
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Save";
    submitBtn.addEventListener("click", handleOptionsSave);
    submitDiv.appendChild(submitBtn);
    page.appendChild(submitDiv);
  });
}

constructOptions(dotColors);
