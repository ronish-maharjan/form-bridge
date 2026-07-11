import { RateLimitExceededError } from "../errors/rate-limit-exceeded.error.js";

type Bucket = {total_tokens:number,last_updated:number}
class TokenBucket {
    readonly #bucketSize:number;
    readonly #fillRate:number;
    constructor({bucketSize,fillRate}:{bucketSize:number,fillRate:number}){
        this.#bucketSize = bucketSize;
        this.#fillRate = fillRate;
    
    }

    public create(){
        let latestTime = new Date().getTime();
        let bucket = {total_tokens:this.#bucketSize,last_updated:latestTime};
        return bucket;
    }

    public update(bucket:Bucket){
        let totalTokens = bucket.total_tokens;
        const lastUpdated = bucket.last_updated;
        const currentTime = new Date().getTime();
        const newTokens = Math.floor((currentTime - lastUpdated) * this.#fillRate);
        totalTokens = Math.min(this.#bucketSize,totalTokens + newTokens);
        if(totalTokens < 1){
            throw new RateLimitExceededError();
        }
        totalTokens -= 1;
        return {total_tokens:totalTokens,last_updated:currentTime};
    }
}


export {TokenBucket};
