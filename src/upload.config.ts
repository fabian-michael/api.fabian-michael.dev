import type { Options as ExpressFileUploadOptions } from 'express-fileupload';

const UPLOAD_LIMIT = parseInt(process.env.UPLOAD_LIMIT ?? '1');

export const uploadConfig = (): ExpressFileUploadOptions => ({
    limits: {
        fileSize: UPLOAD_LIMIT * 1024 * 1024,
    }
})