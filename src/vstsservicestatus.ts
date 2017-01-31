"use strict";

import { ServiceStatusBar } from "./servicestatusbar";
import { VstsServiceStatusQuery, VstsServiceStatusResponse } from "./servicestatusquery";

export class VstsServiceStatus {
    private updateIntervalInSeconds = 45;
    private statusBar: ServiceStatusBar;
    private serviceStatusQuery: VstsServiceStatusQuery;
    private intervalTimer: NodeJS.Timer;

    constructor() {
        this.serviceStatusQuery = new VstsServiceStatusQuery();
        this.statusBar = new ServiceStatusBar();
        this.statusBar.displayLoading();

        this.beginUpdateStatus();
    }

    private beginUpdateStatus(): void {
        this.tryCancelPeriodicStatusUpdate();
        this.updateStatus();
    }

    private tryStartPeriodicStatusUpdate(): void {
        if (!this.intervalTimer) {
            this.intervalTimer = setInterval(() => this.updateStatus(), this.updateIntervalInSeconds * 1000);
        }
    }

    private tryCancelPeriodicStatusUpdate(): void {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    }

    private updateStatus(): void {
        this.serviceStatusQuery.getStatus().then(res => {
            let message = `${res.status.toUpperCase()} ${res.message}`;
            switch (res.status.toLowerCase()) {
                case "maintenance":
                    this.statusBar.displayWarning(message);
                    break;
                case "available":
                    this.statusBar.displayOk(message);
                    break;
                default:
                    this.statusBar.displayError(message);
            }

            this.tryStartPeriodicStatusUpdate();
        });
    }

    public dispose(): void {
        this.statusBar.dispose();
    }
}