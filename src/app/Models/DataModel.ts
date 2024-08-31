export class DataModel {
    serialNumber: number;
    name: string;
    email: string;
    password: string;
    expiryDate?: Date;
    uploadLink?: string;

    constructor() {
        this.serialNumber = 0;
        this.name = '';
        this.email = '';
        this.password = '';
    }
}


