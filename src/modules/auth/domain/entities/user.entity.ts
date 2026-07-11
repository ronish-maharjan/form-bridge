import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";

type CreateUserProps = {
    id:IdVo;
    email:EmailVo;
    hashedPassword:string;
}

type UserProps ={
    id:IdVo;
    email:EmailVo;
    hashedPassword:string;
}

type RestoreUserProps = {
    id:IdVo;
    email:EmailVo;
    hashedPassword:string;
}

class User {
    readonly #id:IdVo;
    #email:EmailVo;
    #hashedPassword:string;

    private constructor(props:UserProps){
        this.#id = props.id;
        this.#email = props.email;
        this.#hashedPassword = props.hashedPassword;
    }

    public static create(props:CreateUserProps):User{
        return new User(props);
    }

    public static restore(props:RestoreUserProps):User{
        return new User(props);
    }

    // getters

    public getId():string{
        return this.#id.getValue();
    }

    public getEmail():string{
        return this.#email.getValue();
    }

    public getHashedPassword():string{
        return this.#hashedPassword
    }

}

export {User};
