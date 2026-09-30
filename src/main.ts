import type { CanvasAddonMountContext } from "../generated/mywallpaper-runtime";
import { bind } from "./bindings";
import "./style.css";
export function mount(context: CanvasAddonMountContext) {
  const node = document.createElement("div");
  node.className = "surface";
  context.layer.root.replaceChildren(node);
  const stop = bind(context, (values) => {
    const a = String(values.from ?? "#111719"),
      b = String(values.to ?? "#435556");
    node.style.background =
      values.geometry === "radial"
        ? "radial-gradient(ellipse at 28% 22%, " + b + ", " + a + " 85%)"
        : "linear-gradient(" +
          Number(values.angle ?? 135) +
          "deg, " +
          a +
          ", " +
          b +
          ")";
  });
  return () => {
    stop();
    node.remove();
  };
}
