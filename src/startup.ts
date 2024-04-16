import * as window from "./window/window";
function onClickMenuItem() {
  // Write code here that should happen when the player clicks the menu item under the map icon.

  console.log("Hello world!");
}

export function startup() {
  // Write code here that should happen on startup of the plugin.

  if (typeof ui !== "undefined") {
    window.initialize();
    const menuItemName = "Drawing";
    ui.registerMenuItem(menuItemName, window.openWindow);
  }
}
