import { Request, Response } from "express";
import { ErrorResponse, successResponse, successResponseWithCount } from "../helpers/apiResponse";
import { FindAllUser, addUser, deleteUser, splitVidoes, updateUser } from "../model/user.model";
const fs = require('fs');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export const createVideos = async (req: Request, res: Response) => {
    try {

        const inputFilePath = 'src/inputFile/v1.mp4';
        const outputDirectory = 'src/clip/';
        const numClips = 2; // Number of clips to create
        const clipDuration = 30; // Duration of each clip in seconds


        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }

        const promises = [];

        for (let i = 0; i < numClips; i++) {

            const clipOutputPath = `${outputDirectory}clip_${i + 1}.mp4`;
            const startTime = i * clipDuration;

            await ffmpeg()
                .input(inputFilePath)
                .setStartTime(startTime)
                .setDuration(clipDuration)
                .output(clipOutputPath)
                .on('end', () => {
                    console.log(`Clip ${i + 1} cutting process finished.`);
                    // return successResponse(res, "Video Created Successfully", []);

                })
                .on('error', (err: any) => {

                    console.error(`Error cutting clip ${i + 1}:`, err);
                    return successResponse(res, "Video Created Successfully", err);
                })
                .run();
        }


        return successResponse(res, "Video Created Successfully", []);



        // ffmpeg()
        //     .input(inputFilePath)
        //     .setStartTime(startTime)
        //     .setDuration(duration)
        //     .output(outputFilePath)
        //     .on('end', () => {
        //         console.log('Video cutting process finished.');
        // return successResponse(res, "Video Created Successfully", []);

        //     })
        //     .on('error', (err: any) => {
        //         console.error('Error cutting video:', err);
        // return successResponse(res, "Video Created Successfully", err);

        //     })
        //     .run();


        // splitVidoes(where, payloadRequest, (err: any, data: any) => {
        //     if (err) {
        //         return ErrorResponse(res, err);
        //     } else {
        //     }
        // });
    } catch (e) {
        console.log(e);
        ErrorResponse(res, e);
    }
};

export const getVideosInfo = async (req: Request, res: Response) => {
    try {

        const inputFilePath = 'src/inputFile/v1.mp4';
        // const outputDirectory = 'src/clip/';
        // const numClips = 2; // Number of clips to create
        // const clipDuration = 30; // Duration of each clip in seconds


        // if (!fs.existsSync(outputDirectory)) {
        //     fs.mkdirSync(outputDirectory);
        // }

        await ffmpeg.ffprobe(inputFilePath, (err: any, metadata: any) => {
            if (err) {
                console.error('Error getting clip details:', err);
            } else {
                console.log('Clip details:', metadata);
                return successResponse(res, "Video Created Successfully", metadata.format.duration);
            }
        });






        // ffmpeg()
        //     .input(inputFilePath)
        //     .setStartTime(startTime)
        //     .setDuration(duration)
        //     .output(outputFilePath)
        //     .on('end', () => {
        //         console.log('Video cutting process finished.');
        // return successResponse(res, "Video Created Successfully", []);

        //     })
        //     .on('error', (err: any) => {
        //         console.error('Error cutting video:', err);
        // return successResponse(res, "Video Created Successfully", err);

        //     })
        //     .run();


        // splitVidoes(where, payloadRequest, (err: any, data: any) => {
        //     if (err) {
        //         return ErrorResponse(res, err);
        //     } else {
        //     }
        // });
    } catch (e) {
        console.log(e);
        ErrorResponse(res, e);
    }
};


function isBlank(value: any) {
    let result = value === undefined || value === null || value.trim() === '';
    console.log(result, 'result');
    if (result) {
        return true;
    }
    return result
}
export const createUser = (req: Request, res: Response): any => {
    try {

        let where: object = { email: req.body.email };
        let payloadRequest: object = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            status: req.body.status ?? 1,
            role_id: req.body.role_id
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
        let where: object = { id: req.body?.id };

        FindAllUser(where, (err: any, data: any, count: number) => {
            if (err) {
                return ErrorResponse(res, err);
            } else {
                return successResponseWithCount(res, "Get All User Successfully.", data, count);
            }
        });
    } catch (e) {
        console.log(e);
        ErrorResponse(res, e);
    }
};

export const removeUser = (req: Request, res: Response): any => {
    try {
        console.log('123');
        console.log(req.params.id, 'req.query.id');
        let where: object = { id: req.params.id };
        deleteUser(where, (err: any, data: any) => {
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

export const editUser = (req: Request, res: Response): any => {
    try {
        function isBlank(value: any) {
            return value === undefined || value === null || value === '';
        }

        let where: object = { id: req.params.id };
        console.log(isBlank(req.body?.last_name.trim()), 'req.body?.first_name');
        let payloadRequest: object = {
            first_name: req.body?.first_name,
            last_name: isBlank(req.body?.last_name.trim()),
            password: req.body?.password,
            email: req.body?.email,
            phone: req.body?.phone,
            status: req.body?.status ?? 1,
            role_id: req.body?.role_id
        };
        updateUser(where, payloadRequest, (err: any, data: any) => {
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

