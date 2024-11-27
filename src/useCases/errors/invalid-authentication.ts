export class InvalidAuthenticationError extends Error {
    constructor() {
        super("Authentication is not valid");
    }
}