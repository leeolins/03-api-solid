export class LateCheckInCreationError extends Error {
    constructor() {
        super("Check-in can be completed within 20 minutes of creation");
    }
}