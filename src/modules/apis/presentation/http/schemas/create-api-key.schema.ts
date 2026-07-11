import z from "zod";

const CreateApiKeySchema = z.object({
    url:z.url({message:"Invalid url format."}),
});

export {CreateApiKeySchema};
