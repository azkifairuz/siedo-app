export type AuthResponse  = {
    data: {
        uuid:string,
        token:string
    };
    message: string;
    statusCode: number;
}