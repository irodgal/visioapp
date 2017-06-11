export class ExtendedError extends Error {

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    public statusCode: number;
}

export default ExtendedError;