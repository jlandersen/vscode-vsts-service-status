import { open } from "openurl";

export class VstsOpenWebCommandHandler {
    public handle(): void {
        open("https://www.visualstudio.com/team-services/support/");
    }
}