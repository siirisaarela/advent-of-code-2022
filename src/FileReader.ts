const { promises: fsPromises } = require('fs');

export interface IReadFiles {
 readFile: (filename: string) => Promise<any>
}

export class TextFileReader implements IReadFiles {
 readonly fileRoot: string

 constructor(fileRoot: string) {
  this.fileRoot = fileRoot
 }

  async readFile(filename: string): Promise<any> {
   try {
     const contents = await fsPromises.readFile(`${this.fileRoot}/${filename}`, 'utf-8');
     const arr = contents.split(/\r?\n/);
     return arr;
   } catch (error) {
     console.log("Error reading file: ", error);
   }
 }
}