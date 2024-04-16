import { ElementParams, FlexiblePosition, WidgetCreator, AbsolutePosition, ParentControl, BuildOutput, Control } from "openrct2-flexui";

/**
 * The parameters for configuring the custom drawing widget.
 */
export interface CustomParams extends ElementParams {
    onDraw?: (g: GraphicsContext) => void;
}

/**
 * Create a custom widget for drawing.
 */
export function customWidget(params: CustomParams & FlexiblePosition): WidgetCreator<FlexiblePosition>;
export function customWidget(params: CustomParams & AbsolutePosition): WidgetCreator<AbsolutePosition>;
export function customWidget<I, P>(params: CustomParams & I): WidgetCreator<I, P> {
    return (parent, output) => new CustomControl<I, P>(parent, output, params);
}

interface WidgetBaseDesc extends Omit<WidgetBase, "window"> {}

interface CustomDesc extends WidgetBaseDesc {
    type: "custom";
    onDraw?: (g: GraphicsContext) => void;
}

/**
 * A controller class for a button widget.
 */
export class CustomControl<I, P> extends Control<CustomDesc, I, P> implements CustomDesc, CustomParams {
    onDraw?: ((g: GraphicsContext) => void) | undefined;

    constructor(parent: ParentControl<I, P>, output: BuildOutput, params: CustomParams & I) {
        super("custom", parent, output, params);

        const binder = output.binder;
        binder.add(this, "onDraw", (this, params.onDraw));
    }
}
