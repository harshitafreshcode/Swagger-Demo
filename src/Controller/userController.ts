import { Request, Response } from "express";
import { ErrorResponse, successResponse } from "../helpers/apiResponse";
import { FindAllUser, addUser } from "../model/user.model";

export const createUser = (req: Request, res: Response): any => {
    try {
        console.log('req body', req.body);

        let where: object = { email: req.body.email };
        let payloadRequest: object = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            status: req.body.status ?? 1,
        };
        addUser(where, payloadRequest, (err: any, data: any) => {
            if (err) {
                return ErrorResponse(res, err);
            } else {
                return successResponse(res, "User Added Successfully", data);
            }
        });
    } catch (e) {
        console.log(e);
        ErrorResponse(res, e);
    }
};


export const getAllUser = (req: Request, res: Response): any => {
    try {
        let where: object = { email: req.body.email };
        let payloadRequest: object = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            status: req.body.status ?? 1,
        };
        FindAllUser(where, payloadRequest, (err: any, data: any) => {
            if (err) {
                return ErrorResponse(res, err);
            } else {
                return successResponse(res, "User Added Successfully", data);
            }
        });
    } catch (e) {
        console.log(e);
        ErrorResponse(res, e);
    }
};
