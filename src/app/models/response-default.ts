export class ResponseDefault<T> {
    code: number;
    mensagem: string;
    body: T;

    constructor(code: number, mensagem: string, body?: T) {
        this.code = code;
        this.mensagem = mensagem;
        this.body = body;
    }

}