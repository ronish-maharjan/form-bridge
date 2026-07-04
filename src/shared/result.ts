type Ok<D> = {ok:true,data:D};
type Fail<E> = {ok:false,error:E};

type Result<D,E> = Ok<D>|Fail<E>;

const ok= <D,E=never>(data:D):Result<D,E>=>{
    return {ok:true,data};
}

const fail= <E,D=never>(error:E):Result<D,E>=>{
    return {ok:false,error};
}

export {Result, ok, fail}
