import * as codeRunner from "./codeRunner";
import * as info from "./info";
import { createCodeFile, removeCodeFile } from "./fileHandlers";
import { spawn } from "child_process";

const runCode = async ({ language = "", code = "", input = "" }) => {
  const timeout = 30;

  if (code == "") {
    throw {
            status: 400,
            error: "No Code found to execute."
        }
  }

  if (!codeRunner.supportedLanguages.includes(language)) {
      throw {
        status: 400,
        error:
          "Language currently not supported. Supported languages are " +
          codeRunner.supportedLanguages.join(", "),
      };
  }

  const { jobID } = await createCodeFile(language, code);
  const {
    compileCodeCommand,
    compilationArgs,
    executeCodeCommand,
    executionArgs,
    outputExt,
  } = codeRunner.commandMap(jobID, language);

  if (compileCodeCommand) {
    await new Promise((resolve, reject) => {
      const compileCode = spawn(compileCodeCommand, compilationArgs || []);
      compileCode.stderr.on("data", (error) => {
        reject({
          status: 200,
          output: "",
          error: error.toString(),
          language,
        });
      });
      compileCode.on("exit", () => {
        resolve({
          code: 500,
          output: null,
        });
      });
    });
  }

  const result = await new Promise((resolve, reject) => {
    const executeCode = spawn(executeCodeCommand, executionArgs || []);
    let output = "",
      error = "";

    const timer = setTimeout(async () => {
      executeCode.kill("SIGHUP");

      await removeCodeFile(jobID, language, <string>outputExt);

      reject({
        status: 408,
        error: `CodeX API Timed Out. Your code took too long to execute, over ${timeout} seconds. Make sure you are sending input as payload if your code expects an input.`,
      });
    }, timeout * 1000);

    if (input !== "") {
      input.split("\n").forEach((line) => {
        executeCode.stdin.write(`${line}\n`);
      });
      executeCode.stdin.end();
    }

    executeCode.stdin.on("error", (err) => {
      console.log("stdin err", err);
    });

    executeCode.stdout.on("data", (data) => {
      output += data.toString();
    });

    executeCode.stderr.on("data", (data) => {
      error += data.toString();
    });

    executeCode.on("exit", (err) => {
      clearTimeout(timer);
      resolve({ output, error });
    });
  });

  await removeCodeFile(jobID, language, <string>outputExt);

  return {
    result,
    language,
    info: await info.getInfo(language),
  };
};

export { codeRunner, info, runCode };
