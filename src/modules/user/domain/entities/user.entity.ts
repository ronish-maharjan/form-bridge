import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { fail, ok, Result } from "../../../../shared/result.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";  


type UserProps ={
    id:IdVo;
    email:EmailVo;
    hashedPassword:string;
    inboxMail:EmailVo|null;
    createdAt:Date;
    updatedAt:Date;
}

type CreateUserProps  = {
    id:IdVo;
    email:EmailVo;
    hashedPassword:string;
    inboxMail:EmailVo|null;
    createdAt:Date;
    updatedAt:Date;
}

type RestoreUserProps = {
    id:IdVo;
    email:EmailVo;
    hashedPassword:string;
    inboxMail:EmailVo|null;
    createdAt:Date;
    updatedAt:Date;
}

class User {
    readonly #id:IdVo;
    #email:EmailVo;
    #inboxMail:EmailVo|null;
    readonly #createdAt:Date;
    readonly #updatedAt:Date;
    #hashedPassword:string;

    private constructor(props:UserProps){
        this.#id = props.id;
        this.#email = props.email;
        this.#hashedPassword = props.hashedPassword;
        this.#createdAt = props.createdAt;
        this.#updatedAt = props.updatedAt;
        this.#inboxMail = props.inboxMail;
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
     
    public getInboxMail():string|null{
        if(!this.#inboxMail){
            return null;
        }
        return this.#inboxMail.getValue();
    }

    public getCreatedAt():Date{
        return this.#createdAt;
    }

    public getUpdatedAt():Date{
        return this.#updatedAt;
    }

    // setter / change the entity properties
    public changePassword(newHashedPassword:string):Result<void,ValidationError>{
        this.#hashedPassword =newHashedPassword; 
        return ok(undefined);
    }

    public changeEmail(newEmail:EmailVo):Result<void,ValidationError>{
        if(newEmail.getValue()===this.#email.getValue()){
            return fail(new ValidationError({message:"New email is same as current one"}));
        }
        this.#email = newEmail;
        return ok(undefined);
    }

    public changeInboxMail(newInboxMail:EmailVo):Result<void,ValidationError>{
        if(newInboxMail.getValue()===this.#inboxMail?.getValue()){
            return fail(new ValidationError({message:"New email is same as current one"}));
        }
        this.#inboxMail = newInboxMail;
        return ok(undefined);
    }

}

export {User};
