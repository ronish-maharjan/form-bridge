import { IdVo } from "../../../shared/value-objects/id.vo.js"
import { ApiKeyVo } from "../value-objects/api-key.vo.js";
import { UrlVo } from "../value-objects/url.vo.js";

type ApiProps = {
    id:IdVo;
    userId:IdVo;
    apiKey:ApiKeyVo;
    url:UrlVo;
}

type CreateApiProps = ApiProps; 
type RestoreApiProps = ApiProps;
class Api {
    readonly #id:IdVo;
    readonly #url:UrlVo;
    readonly #apiKey:ApiKeyVo;
    readonly #userId:IdVo;

    private constructor(props:ApiProps){
        this.#url = props.url;
        this.#userId = props.userId;
        this.#apiKey = props.apiKey;
        this.#id = props.id;
    };

    static create(props:CreateApiProps){
            return new Api(props);
    };

    static restore(props:RestoreApiProps){
            return new Api(props);
    };

    public getId():string{
        return this.#id.getValue();
    };

    public getUrl():string{
        return this.#url.getValue();
    };

    public getApiKey():string{
        return this.#apiKey.getValue();
    };
    public getUserId():string{
        return this.#userId.getValue();
    };

}

export {Api};
