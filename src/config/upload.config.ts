import type { Options as ExpressFileUploadOptions } from 'express-fileupload';
import { UPLOAD_LIMIT } from './env.private';

export const uploadConfig = (): ExpressFileUploadOptions => ({
    limits: {
        fileSize: UPLOAD_LIMIT * 1024 * 1024,
    }
})