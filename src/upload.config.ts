import type { Options as ExpressFileUploadOptions } from 'express-fileupload';

export const uploadConfig = (): ExpressFileUploadOptions => ({
    limits: {
        fileSize: 10000000,
    }
})