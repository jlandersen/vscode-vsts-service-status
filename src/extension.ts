'use strict';

import * as vscode from 'vscode';

import {  VstsServiceStatus } from "./vstsservicestatus";

export function activate(context: vscode.ExtensionContext) {
    let serviceStatus = new VstsServiceStatus();
}

export function deactivate() {
}