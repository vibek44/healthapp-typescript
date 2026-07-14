import type { Request,Response,NextFunction } from "express"
import z from "zod"
const errorHandler = (error:unknown, _req:Request, res:Response, next:NextFunction) => {
    if(error instanceof z.ZodError){
        res.status(400).send({error:error.issues})
    }
    else if(error instanceof Error){
       res.status(400).send({error})
    }
    else{
        next(error)
    }
}

export default errorHandler