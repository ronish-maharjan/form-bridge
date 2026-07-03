type UserShape = {
    id:string,
    email:string,
    inboxMail:string,
    isVerified:boolean,
    password:string,
    createdAt:Date,
    updatedAt:Date
} 

type UserProps = {
    id:string,
    email:string,
    password:string,
}

type CreateUserProps = Pick<UserProps,"id"|"email"|"password" >

class User{
    readonly #id:string;
    readonly #email:string;
    readonly #password:string;

    private constructor(userProps:UserProps){
        this.#id = userProps.id;
        this.#email = userProps.email;
        this.#password = userProps.password;
    }

    static create(props:CreateUserProps):User{
        return new User({id:props.id,email:props.email, password:props.password});
    }

    //getters

    public getId():string{
        return this.#id;
    }

    public getemail():string{
        return this.#email;
    }

    public getPassword():string{
        return this.#password;
    }

}

export {User};
