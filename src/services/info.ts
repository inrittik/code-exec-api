import { commandMap } from "./codeRunner";
import util from "util";
const exec = util.promisify(require("child_process").exec);

const getVersion = async (language:string) => {
  const { compilerInfoCommand } = commandMap("", language);

  const { stdout } = await exec(compilerInfoCommand);

  return stdout;
};

export { getVersion };
