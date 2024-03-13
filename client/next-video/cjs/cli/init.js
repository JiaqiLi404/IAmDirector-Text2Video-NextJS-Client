"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var init_exports = {};
__export(init_exports, {
  builder: () => builder,
  command: () => command,
  desc: () => desc,
  handler: () => handler
});
module.exports = __toCommonJS(init_exports);
var import_prompts = require("@inquirer/prompts");
var import_chalk = __toESM(require("chalk"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_child_process = require("node:child_process");
var import_promises = require("node:fs/promises");
var import_node_path = __toESM(require("node:path"), 1);
var import_logger = __toESM(require("../utils/logger.js"), 1);
var import_json_configs = require("./lib/json-configs.js");
var import_next_config = __toESM(require("./lib/next-config.js"), 1);
const GET_STARTED_CONTENTS = `{
  "status": "ready",
  "originalFilePath": "videos/get-started.mp4",
  "provider": "mux",
  "providerMetadata": {
    "mux": {
      "uploadId": "LJeQjU9A1n029JC8Nx2Z71U7wOsdVA02n9mPOL02iYspkY",
      "assetId": "3fMT5ZqYShCbiI00Um3K00eGAqf7d6xmylwDKVEYAl4Ck",
      "playbackId": "sxY31L6Opl02RWPpm3Gro9XTe7fRHBjs92x93kiB1vpc"
    }
  },
  "createdAt": 1701286882695,
  "updatedAt": 1701287023961,
  "size": 431539343,
  "sources": [{
    "src": "https://stream.mux.com/sxY31L6Opl02RWPpm3Gro9XTe7fRHBjs92x93kiB1vpc.m3u8",
    "type": "application/x-mpegURL"
  }],
  "poster": "https://image.mux.com/sxY31L6Opl02RWPpm3Gro9XTe7fRHBjs92x93kiB1vpc/thumbnail.webp",
  "blurDataURL": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAJcklEQVR4AQCBAH7/AAAAAP8FAAD/HxoZ/z86Of9dWVf/dHFu/4B9e/+Afnv/d3Zy/2lpZf9bXFf/UVNO/01RS/9QVE7/V1tV/19kXf9lamP/Z2xm/2VqZP9hZV//W19Z/1daVf9WWVP/WVpV/11eWf9iYV3/ZWNg/2VjYP9iYF3/XltY/1lWVP9XU1H/AIEAfv8ABQAA/xQNDP8uKCf/TklH/21oZv+EgH7/kI2K/5COi/+HhoP/eXl1/2tsaP9iZF//XmFc/2FkX/9obGb/cHRu/3Z6dP94fHb/dnp0/3F1b/9sb2n/aGtl/2dpZP9pamb/bm5q/3Nybv92dHH/dnRx/3Rxbv9wbGr/a2hm/2llY/8AgQB+/wAeFxb/LSYm/0hBQf9pY2L/iIOB/6Cbmv+tqaf/rquo/6WjoP+Xl5P/ioqG/4CBff99f3r/f4J9/4aJhP+OkYz/lJeS/5aZlP+Ul5L/j5KN/4qMh/+GiIP/hYaC/4iIhP+MjIj/kZCN/5WTkP+Wk5D/lJCO/5CMiv+MiIb/iYWD/wCBAH7/AD41Nv9ORUX/aWFh/4uDg/+rpKP/xL28/9HMyv/Tz83/y8jF/728uP+wr6v/pqai/6Okn/+mp6L/rK6p/7S2sf+5vLf/u765/7m8tv+0trH/r7Cs/6usqP+qq6f/ra2p/7Kxrf+3trL/u7m2/725t/+7t7X/uLOy/7Svrv+yrav/AIEAfv8AXlRV/25kZf+KgYH/rKSk/87Gxv/o4OD/9vDv//nz8v/x7ev/5eHf/9fV0v/OzMn/ysrG/8zNyP/T1M//2tvX/9/h3P/h497/3+Db/9rb1v/U1dD/0NHM/9DPy//T0c7/2NbT/97b2P/i393/5ODe/+Pf3f/g29r/3djW/9vV1P8AgQB+/wB4bW//iX1//6abnP/Jv8D/6+Lj///+/v//////////////////////+fbz/+/t6v/r6ub/7e3p//Pz7//6+/b////7/////f/9/vr/+Pn1//Lz7//v7ur/7u3q//Hw7P/39fL//fr4/////P/////////+///9+///+vj//fj2/wCBAH7/AIl8fv+ZjY//t6yt/9vR0v//9fb//////////////////////////////////////////f////7//////////////////////////////////////////f////z/////////////////////////////////////////////////AIEAfv8AjYGD/56SlP+9sbP/4tfZ///9/v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgQB+/wCIfH7/mY2P/7itr//f1NX///r7//////////////////////////////////////////////////////////////////////////////////////////z////7/////v///////////////////////////////////////////wCBAH7/AHtwcf+MgoP/rKKj/9PKyv/68fH////////////////////////////////////+//z8+P/7/fj//v/7///////////////////////7//n/9Pjy/+/z7f/u8uz/8vTv//j69f////z/////////////////////////////////AIEAfv8Aa2Ji/310dP+dlZX/xb29/+zl5P///////////////////////////////P/z9e//6+7p/+nu5//s8ev/8Pbv//P58v/y+fH/7vXt/+fu5//g5+D/3OLb/9vh2v/e493/5Onj/+zx6v/z9/H/+Pz2//v++P/7/vj/+vz3//n79v8AgQB+/wBdVlX/b2lo/4+Kif+4srH/39vZ///7+f//////////////////////8fXv/+Po4v/b4dr/2eDY/9vj2//e59//4eri/+Dq4f/c5t3/1d/W/87Yz//K08r/ydLJ/8zVzP/S29L/2uLa/+Lp4f/n7ub/6vDp/+rx6f/q8On/6e/o/wCBAH7/AFNQTf9mYmD/h4SB/6+tqv/X1dL/9vby//////////////////j99//n7eb/2ODY/8/Y0P/M183/ztnQ/9He0//U4db/0+DW/8/c0v/I1sv/ws/E/73KwP+8yb7/v8zB/8bSyP/O2tD/1uHX/9vm3f/e6eD/3+ng/9/o3//e6N//AIEAfv8AUFBM/2NjX/+EhID/ra2p/9TW0f/09/L/////////////////9P30/+Ls4//T3tX/ytbM/8bUyf/I1sv/y9vP/83e0v/N3tH/ydrN/8PUx/+8zcH/t8m8/7fHu/+6yr7/wdHF/8nZzf/R4NT/1+ba/9ro3f/b6d7/2+ne/9ro3f8AgQB+/wBTVVD/Zmhj/4eKhP+ws63/2NzW//f99v/////////////////2//j/5PDm/9Ti1//K2c7/xtfL/8jZzP/L3tD/zeHT/83h0//J3tD/w9jK/73Sw/+5zb//uMy+/7zQwv/D1sj/y97R/9Pm2P/Z697/3e/i/97w4//e7+L/3e/i/wCBAH7/AFleWP9scWr/jZOM/7a8tf/e5d7//v/+//////////////////v//v/o+Oz/2Ond/87g0//K3tD/y+DS/8/k1v/S6Nn/0ujZ/87l1v/J4ND/w9rK/77Wxv++1cb/wtnJ/8nf0P/R59j/2u/g/+D15v/k+Or/5frr/+X56//l+ev/AIEAfv8AYGZf/3N5cv+Um5T/vcW9/+Xu5f///////////////////////////+7/8//e8OP/0+fZ/8/l1v/R59j/1Ozc/9fv3//X8OD/1O3d/8/o1//J4tL/xd7O/8Xezf/J4dH/0OjY/9jw4P/h+On/5/7v/+v/8v/s//T/7f/0/+z/8/8BgQB+/wBka2T/d353/5igmP/BysH/6fPq////////////////////////////8v/3/+H15//X7N3/0+na/9Tr3P/Y8OD/2/Tj/9v15P/Y8uH/0+3c/83o1v/J5NL/yePS/83n1v/U7t3/3fbl/+X+7v/s//T/8P/4//H/+f/x//n/8f/5/45PjkBdIjvWAAAAAElFTkSuQmCC"
}
`;
const TYPES_FILE_CONTENTS = `/// <reference types="next-video/video-types/global" />
`;
const DEFAULT_DIR = "videos";
const DEV_SCRIPT = "& npx next-video sync -w";
const gitIgnoreContents = (videosDir) => `
# next-video
${videosDir}/*
!${videosDir}/*.json
!${videosDir}/*.js
!${videosDir}/*.ts
public/_next-video
`;
async function preInitCheck(dir) {
  try {
    await (0, import_promises.stat)(dir);
    return false;
  } catch (err) {
    if (err.code === "ENOENT") {
      return true;
    }
    throw err;
  }
}
async function checkVersionManager() {
  try {
    await (0, import_promises.access)("package-lock.json");
    return "npm";
  } catch {
  }
  try {
    await (0, import_promises.access)("yarn.lock");
    return "yarn";
  } catch {
  }
  try {
    await (0, import_promises.access)("pnpm-lock.yaml");
    return "pnpm";
  } catch {
  }
  return void 0;
}
function execPromise(command2) {
  return new Promise((resolve, reject) => {
    (0, import_node_child_process.exec)(command2, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      return resolve(stdout);
    });
  });
}
async function createVideoDir(dir) {
  const fullPath = import_node_path.default.join(process.cwd(), dir);
  await (0, import_promises.mkdir)(fullPath, { recursive: true });
  await (0, import_promises.writeFile)(import_node_path.default.join(dir, "get-started.mp4.json"), GET_STARTED_CONTENTS);
  await (0, import_promises.appendFile)(".gitignore", gitIgnoreContents(dir));
  return;
}
async function createTSFile(filePath) {
  await (0, import_promises.writeFile)(filePath, TYPES_FILE_CONTENTS);
  return;
}
async function updateTSConfigFile(tsConfigPath) {
  const configContents = await (0, import_promises.readFile)(tsConfigPath, "utf-8");
  const updatedContents = (0, import_json_configs.updateTSConfigFileContent)(configContents);
  return (0, import_promises.writeFile)(tsConfigPath, updatedContents);
}
const command = "init [dir]";
const desc = "Initializes next-video in a project.";
function builder(yargs) {
  return yargs.options({
    dir: {
      alias: "d",
      describe: "The directory you want to initialize next-video with.",
      type: "string"
    },
    force: {
      alias: "f",
      describe: "Continue with initialization even if the chosen directory already exists.",
      type: "boolean",
      default: false
    },
    typescript: {
      alias: "ts",
      describe: "Initialize next-video for use with TypeScript.",
      type: "boolean",
      default: false
    },
    tsconfig: {
      describe: "Automatically update your tsconfig.json file to include the next-video types.",
      type: "boolean",
      default: false
    },
    devscript: {
      describe: `Automatically update your package.json to add the watch command to your dev script.`,
      type: "boolean",
      default: false
    }
  });
}
async function handler(argv) {
  let baseDir = argv.dir;
  let packageInstalled = false;
  let ts = argv.typescript;
  let updateTsConfig = argv.tsconfig;
  let updateDevScript = argv.devscript;
  let changes = [];
  try {
    packageInstalled = await (0, import_json_configs.checkPackageJsonForNextVideo)("./package.json");
  } catch (err) {
    if (err.code === "ENOENT") {
      import_logger.default.error(
        `Failed to find/read a local package.json. Double check that you're running this from the root of your project.`
      );
      return;
    }
    console.log(err);
  }
  if (!packageInstalled) {
    const install = await (0, import_prompts.confirm)({
      message: `It doesn't look like ${import_chalk.default.magenta.bold(
        "next-video"
      )} is installed in this project. Would you like to install it now?`,
      default: true
    });
    if (install) {
      const manager = await checkVersionManager();
      if (!manager) {
        import_logger.default.error("Failed to detect a package manager. Please install next-video manually and re-run this command.");
        import_logger.default.info("For example, in NPM: npm install --save-dev next-video");
        return;
      }
      import_logger.default.info("Detected package manager:", manager);
      import_logger.default.info("Installing next-video...");
      try {
        if (manager === "npm") {
          await execPromise("npm install next-video");
        } else if (manager === "yarn") {
          await execPromise("yarn add next-video");
        } else if (manager === "pnpm") {
          await execPromise("pnpm add next-video");
        }
        import_logger.default.info("Successfully installed next-video!");
      } catch (err) {
        import_logger.default.error("Failed to install next-video:", err);
      }
    } else {
      import_logger.default.info("Make sure to add next-video to your package.json manually");
    }
  }
  if (!baseDir) {
    baseDir = await (0, import_prompts.input)({ message: "What directory should next-video use for video files?", default: DEFAULT_DIR });
  }
  const shouldContinue = await preInitCheck(baseDir);
  if (!argv.force && !shouldContinue) {
    import_logger.default.warning("Directory already exists:", baseDir);
    import_logger.default.info("If you'd like to proceed anyway, re-run with --force");
    return;
  }
  await createVideoDir(baseDir);
  changes.push([import_logger.default.add, `Created ${baseDir} directory.`]);
  if (!ts) {
    ts = await (0, import_prompts.confirm)({ message: "Is this a TypeScript project?", default: true });
  }
  if (ts) {
    await createTSFile(import_node_path.default.join(process.cwd(), "video.d.ts"));
    changes.push([import_logger.default.add, `Created video.d.ts.`]);
  }
  if (ts && !updateTsConfig) {
    updateTsConfig = await (0, import_prompts.confirm)({ message: "Update tsconfig.json to include next-video types?", default: true });
  }
  if (updateTsConfig) {
    try {
      await updateTSConfigFile(import_node_path.default.join(process.cwd(), "tsconfig.json"));
      changes.push([import_logger.default.add, `Updated tsconfig.json to include next-video types.`]);
    } catch (err) {
      changes.push([import_logger.default.error, 'Failed to update tsconfig.json, please add "video.d.ts" to the include array']);
    }
  } else if (ts) {
    changes.push([import_logger.default.info, `Add ${import_chalk.default.underline("video.d.ts")} to the includes array in tsconfig.json.`]);
  }
  const cmd = await isCmd();
  if (!cmd && !updateDevScript) {
    updateDevScript = await (0, import_prompts.confirm)({
      message: `Update package.json to add the watch command to your dev script?`,
      default: true
    });
  }
  if (!cmd && updateDevScript) {
    try {
      const devScript = (await execPromise(`npm pkg get scripts.dev`))?.trim().slice(1, -1);
      if (devScript && !devScript.includes(DEV_SCRIPT)) {
        await execPromise(`npm pkg set scripts.dev='${devScript} ${DEV_SCRIPT}'`);
      }
      changes.push([import_logger.default.add, `Updated package.json to add the watch command to your dev script.`]);
    } catch (err) {
      changes.push([import_logger.default.error, `Failed to update package.json, please add "${DEV_SCRIPT}" to your dev script.`]);
    }
  }
  try {
    const update = await (0, import_next_config.default)("./", { folder: baseDir });
    if (update) {
      changes.push([import_logger.default.add, `Updated ${update.configPath} to include next-video.`]);
    }
  } catch (e) {
    if (e.error === "not_found") {
      changes.push([
        import_logger.default.error,
        "No next.config.js or next.config.mjs file found. Please add next-video to your config manually."
      ]);
    } else if (e.error === "already_added") {
      changes.push([import_logger.default.info, "It seems like next-video is already added to your Next Config"]);
    } else {
      changes.push([import_logger.default.error, "Failed to update next.config.js, please add next-video to your config manually."]);
    }
  }
  import_logger.default.success(`${import_chalk.default.magenta.bold("next-video")} initialized!`);
  changes.forEach(([loggerFn, change]) => loggerFn(change));
  import_logger.default.space();
  import_logger.default.info(`Why don't you try adding the component to a page?`);
  import_logger.default.space();
  import_logger.default.space(`${import_chalk.default.magenta("import")} Video ${import_chalk.default.magenta("from")} ${import_chalk.default.cyan("'next-video'")};
  ${import_chalk.default.magenta("import")} getStarted ${import_chalk.default.magenta("from")} ${import_chalk.default.cyan("'/videos/get-started.mp4'")};
  
  ${import_chalk.default.magenta("export default function")} Page() {
    ${import_chalk.default.magenta("return")} ${import_chalk.default.cyan("<")}Video ${import_chalk.default.cyan("src=")}{getStarted} ${import_chalk.default.cyan("/>")};
  }
  `);
  import_logger.default.space();
  import_logger.default.info(`NEXT STEP: Set up remote storage`);
  import_logger.default.info(import_chalk.default.magenta.bold("https://next-video.dev/docs#remote-storage-and-optimization"));
  import_logger.default.space();
}
async function isCmd() {
  if (import_node_os.default.platform() === "win32") {
    try {
      await execPromise(`ls`);
    } catch (err) {
      return true;
    }
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  builder,
  command,
  desc,
  handler
});
