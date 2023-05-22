import { v4 as uuid } from "uuid";
import { join } from "path";
import fs from "fs";

if (!fs.existsSync(join(process.cwd(), "codes"))) {
  fs.mkdirSync(join(process.cwd(), "codes"));
}

if (!fs.existsSync(join(process.cwd(), "outputs"))) {
  fs.mkdirSync(join(process.cwd(), "outputs"));
}

const createCodeFile = async (language: string, code: string) => {
  const jobID = uuid();
  const fileName = `${jobID}.${language}`;
  const filePath = join(process.cwd(), `codes/${fileName}`);

  await fs.writeFileSync(filePath, code?.toString());

  return {
    fileName,
    filePath,
    jobID,
  };
};

const removeCodeFile = async (
  uuid: string,
  lang: string,
  outputExt: string
) => {
  const codeFile = join(process.cwd(), `codes/${uuid}.${lang}`),
    outputFile = join(process.cwd(), `outputs/${uuid}.${outputExt}`);

  await fs.unlinkSync(codeFile);

  if (outputExt) await fs.unlinkSync(outputFile);
};

export { createCodeFile, removeCodeFile };
