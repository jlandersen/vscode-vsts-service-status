"use strict";

import fetch from "node-fetch";

export interface VstsServiceStatusResponse {
    status: string,
    message: string,
    title: string
}

export class VstsServiceStatusQuery {
    public getStatus(): Promise<VstsServiceStatusResponse> {
        return fetch("https://www.visualstudio.com/wp-json/vscom/v1/service-status").then(res => {
            return res.json<VstsServiceStatusResponse>();
        });
    }
}