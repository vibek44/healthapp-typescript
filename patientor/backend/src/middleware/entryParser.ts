import { NewEntrySchema } from '../types.ts'
import { type Request, type Response, type NextFunction } from 'express'

export const newEntryParser = ( req:Request, _res:Response, next:NextFunction ) => {
    try {
        NewEntrySchema.parse(req.body)

    } catch (error:unknown) {
        next(error)
    }
    
}