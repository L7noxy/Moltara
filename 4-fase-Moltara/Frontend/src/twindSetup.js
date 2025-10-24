import { install } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";

install({
  presets: [presetAutoprefix(), presetTailwind()],
});
