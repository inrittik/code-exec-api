import { join } from "path";

interface ICommand {
    executeCodeCommand: string;
    executionArgs?: string[];
    compilerInfoCommand?: string;
    compileCodeCommand?: string;
    compilationArgs?: string[];
    outputExt?: string;
}

const commandMap = (jobID: string, language: string): ICommand => {
    if (language === 'java') {
        return {
            executeCodeCommand: "java",
            executionArgs: [join(process.cwd(), `codes/${jobID}.java`)],
            compilerInfoCommand: "java --version",
        };
    }
    else if (language === 'cpp') {
        return {
            compileCodeCommand: "g++",
            compilationArgs: [
                join(process.cwd(), `codes/${jobID}.cpp`),
                "-o",
                join(process.cwd(), `outputs/${jobID}.out`),
            ],
            executeCodeCommand: join(process.cwd(), `outputs/${jobID}.out`),
            outputExt: "out",
            compilerInfoCommand: "g++ --version",
        };
    }
    else if (language === 'py') {
        return {
            executeCodeCommand: "python3",
            executionArgs: [join(process.cwd(), `codes/${jobID}.py`)],
            compilerInfoCommand: "python3 --version",
        };
    }
    else if (language === 'c') {
        return {
            compileCodeCommand: "gcc",
            compilationArgs: [
                join(process.cwd(), `codes/${jobID}.c`),
                "-o",
                join(process.cwd(), `outputs/${jobID}.out`),
            ],
            executeCodeCommand: join(process.cwd(), `outputs/${jobID}.out`),
            outputExt: "out",
            compilerInfoCommand: "gcc --version",
        };
    }
    else if (language === 'js') {
        return {
            executeCodeCommand: "node",
            executionArgs: [join(process.cwd(), `codes/${jobID}.js`)],
            compilerInfoCommand: "node --version",
        };
    }
    else if (language === 'go') {
        return {
            executeCodeCommand: "go",
            executionArgs: ["run", join(process.cwd(), `codes/${jobID}.go`)],
            compilerInfoCommand: "go version",
        };
    }
    else if (language === 'cs') { 
        return {
        compileCodeCommand: "mcs",
        compilationArgs: [
            `-out:${join(process.cwd(), `outputs/${jobID}`)}.exe`,
            `${join(process.cwd(), `codes/${jobID}.cs`)}`,
        ],
        executeCodeCommand: "mono",
        executionArgs: [`${join(process.cwd(), `outputs/${jobID}`)}.exe`],
        outputExt: "exe",
        compilerInfoCommand: "mcs --version",
        };
    }
    else {
        return {
          compileCodeCommand: "gcc",
          compilationArgs: [
            join(process.cwd(), `codes/${jobID}.c`),
            "-o",
            join(process.cwd(), `outputs/${jobID}.out`),
          ],
          executeCodeCommand: join(process.cwd(), `outputs/${jobID}.out`),
          outputExt: "out",
          compilerInfoCommand: "gcc --version",
        };
    }
};

const supportedLanguages = ["java", "cpp", "py", "c", "js", "go", "cs"];

export { commandMap, supportedLanguages, ICommand };
