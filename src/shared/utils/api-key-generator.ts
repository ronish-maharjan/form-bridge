import crypto from "crypto"

class ApiKeyGenerator {
    static readonly #prefix:string = "mb"
    private constructor(){}
    static generate(){
        const apiKey = `${this.#prefix}_${crypto.randomBytes(32).toString("hex")}`;
        return apiKey;
    }
}

export {ApiKeyGenerator}
