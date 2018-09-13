"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { colors } from "./colors";
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
        let name: string = cmd.command.split(".").pop();

        editor.edit(textEditorEdit => {
          textEditorEdit.insert(
            editor.selection.active,
            JSON.stringify(colors[name])
          );
        });
      }
    );

    context.subscriptions.push(disposable);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
