import { Response } from "express";

function setCookie(
    res: Response,
    key: string,
    value: string,
    maxAge: number
) {
    res.cookie(key, value, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge,
        path: "/",
    });
}

export { setCookie };
