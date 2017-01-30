'use strict';

import * as vscode from 'vscode';

import {  VstsServiceStatus } from "./vstsservicestatus";
import { VstsOpenWebCommandHandler } from "./vstsopenwebcommandhandler";

export function activate(context: vscode.ExtensionContext) {
    let serviceStatus = new VstsServiceStatus();
    let openWebCommandHandler = new VstsOpenWebCommandHandler();

    context.subscriptions.push(
        vscode.commands.registerCommand("extension.openVstsServiceStatusPage", () => openWebCommandHandler.handle())
    );
}

export function deactivate() {
}