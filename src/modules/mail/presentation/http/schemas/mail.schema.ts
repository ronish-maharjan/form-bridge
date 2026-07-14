import z from "zod";


const MailSchema = z
  .object({})
  .catchall(z.unknown())
  .refine(
    (obj) => Object.keys(obj).length > 0,
    {
      message: "Request body cannot be empty",
    }
  );

export {MailSchema};
