export class TheSameDayCheckinError extends Error {
    constructor() {
        super("Maximum checkin reached");
    }
}