import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let createModuleCommand = vscode.commands.registerCommand('perfex-dev-tools.createModule', async () => {
        // Solicitar el nombre del módulo al usuario
        const moduleName = await vscode.window.showInputBox({ prompt: 'Enter Module Name' });
        if (!moduleName) {
            vscode.window.showErrorMessage('Module name is required');
            return;
        }

        const moduleDescription = 'Default module description';
        const moduleVersion = '1.0.0';
        const moduleRequires = '1.0.0';

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            const rootPath = workspaceFolders[0].uri.fsPath;
            const moduleDirPath = path.join(rootPath, 'modules', moduleName);

            // Crear el directorio del módulo
            if (!fs.existsSync(moduleDirPath)) {
                fs.mkdirSync(moduleDirPath);
            } else {
                vscode.window.showWarningMessage(`Module ${moduleName} already exists.`);
                return;
            }

            // Crear el archivo de inicialización del módulo con la cabecera y datos por defecto
            const initFilePath = path.join(moduleDirPath, `${moduleName}.php`);
            const initFileContent = `<?php

defined('BASEPATH') or exit('No direct script access allowed');

/*
Module Name: ${moduleName}
Description: ${moduleDescription}
Version: ${moduleVersion}
Requires at least: ${moduleRequires}
*/

// Your module initialization code goes here

/* Recommended Folder Structure
..
│   module.php
│   install.php
│
├───assets
│       main.css
│       main.js
│
├───config
│       module.php
│
├───controllers
│       Module.php
│
├───core
│       Module_init.php
│
├───helpers
│       module_helper.php
│
├───language
│   └───english
│           module_lang.php
│
├───libraries
│       Module_aeiou.php
│
├───migrations
│       101_version_101.php
│
├───models
│       Module_model.php
│
├───third_party
│       node.php
│
├───vendor
│
└───views
        activate.php
        module_management.php
*/

?>`;

            fs.writeFileSync(initFilePath, initFileContent);

            vscode.window.showInformationMessage(`Module ${moduleName} created successfully!`);
        }
    });

    context.subscriptions.push(createModuleCommand);
}

export function deactivate() {}
