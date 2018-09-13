"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { colors } from "./colors";
import { genPoint, genLineString } from "./geom";
const pkg = require("../package.json");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "congen" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  pkg.contributes.commands.forEach((cmd: any, ind: Number) => {
    let disposable = vscode.commands.registerTextEditorCommand(
      cmd.command,
      (editor, edit, args) => {
        let cmdAr = cmd.command.split(".");
        let name: string = cmdAr.pop();
        let typeName: string = cmdAr.pop();

        editor.edit(textEditorEdit => {
          let insertValue = "";
          if (typeName === "color") {
            insertValue = JSON.stringify(colors[name]);
          } else if (typeName === "geom") {
            if (name === "point") {
              insertValue = JSON.stringify(genPoint());
            } else if (name === "lineString") {
              insertValue = JSON.stringify(genLineString(10));
            }
          }
          textEditorEdit.insert(editor.selection.active, insertValue);
        });
      }
    );

    context.subscriptions.push(disposable);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
