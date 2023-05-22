import { commandMap } from "./codeRunner";
import util from "util";
const exec = util.promisify(require("child_process").exec);

const getInfo = async (language:string) => {
  const { compilerInfoCommand } = commandMap("", language);

  const { stdout } = await exec(compilerInfoCommand);

  return stdout;
};

export { getInfo };
