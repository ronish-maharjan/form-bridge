import { v4 as uuidV4} from "uuid"; 

class IdGenerator{

    private constructor(){}
    static generate(){
        return uuidV4();
    }
}

export {IdGenerator};

