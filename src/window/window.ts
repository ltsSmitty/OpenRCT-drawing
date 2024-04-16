import * as flex from "openrct2-flexui";
import { customWidget } from "./customWidget";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize() {
    let tColor = 0;
    window = flex.window({
        title: "Draw",
        width: 250,
        height: 250,
        position: "center",
        colours: [flex.Colour.LightBlue, flex.Colour.White],
        onOpen: () => (isWindowOpen = true),
        onClose: () => (isWindowOpen = false),
        content: [
            customWidget({
                height: 200,
                onDraw: function (this, g: GraphicsContext) {
                    if (tColor > 255) {
                        return;
                    }
                    console.log("Drawing");
                    tColor += 0.1;
                    const color = Math.floor(tColor);
                    g.colour = color;
                    g.stroke = color;
                    g.fill = color;
                    g.line(10, 20, 200, 30);
                    g.box(10, 40, 200, 50);
                    g.text(`Color: ${color}`, 10, 100);
                    g.rect(10, 120, 200, 80);
                },
            }),
            flex.button({
                text: "Reset",
                onClick: () => {
                    tColor = 0;
                },
            }),
        ],
    });
}

/**
 * Opens the main window. If already open, the window will be focused.
 */
export function openWindow() {
    if (isWindowOpen) {
        window.focus();
    } else {
        window.open();
    }
}
