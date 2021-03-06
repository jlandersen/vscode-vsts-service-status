"use strict";

import { window, StatusBarItem, StatusBarAlignment, Disposable } from "vscode"

export class ServiceStatusBar {
    private statusBarItem: StatusBarItem;

    public displayOk(message: string) {
        this.displayStatusBarItem(message, "octicon-check", "extension.openVstsServiceStatusPage");
    }

    public displayLoading(): void {
        this.displayStatusBarItem("Fetching status", "octicon-pulse", "extension.openVstsServiceStatusPage");
    }

    public displayWarning(message: string): void {
        this.displayStatusBarItem(message, "octicon-alert", "extension.openVstsServiceStatusPage");
    }

    public displayError(message: string): void {
        this.displayStatusBarItem(message, "octicon-zap", "extension.openVstsServiceStatusPage");
    }
    public hideStatusBarItem() {
        if (this.statusBarItem) {
            this.statusBarItem.hide();
        }
    }

    public dispose(): void {
        this.statusBarItem.dispose();
    }

    private displayStatusBarItem(tooltip: string, icon: string, command: string): void {
        if (!this.statusBarItem) {
            this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        this.statusBarItem.text = `VSTS: $(icon ${icon})`;
        this.statusBarItem.tooltip = tooltip;
        this.statusBarItem.command = command;
        this.statusBarItem.show();
    }
}
