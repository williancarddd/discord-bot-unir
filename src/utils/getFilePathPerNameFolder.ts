import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { promisify } from "util";
const globPromise = promisify(glob);

export async function getFilePathPerNameFolder(nameFolder: string): Promise<string[]> {
  //test with glob
  const fileNames =  await globPromise(`./src/${nameFolder}/**/*.{ts,js}`, { ignore: "**/node_modules/**" });
  //transforma in absoltue path
  const filePaths = fileNames.map(fileName => path.resolve(fileName));
  return filePaths;
}

