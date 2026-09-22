import z from "zod";
export const unknownEndPoint = (_req, res) => {
    res.status(404).send({ error: "Unknown endpoint, page not found 404!" });
};
export const errorHandler = (error, _req, res, next) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else if (error instanceof Error) {
        res.status(400).send({ error: error.message });
    }
    else {
        next(error);
    }
};
