import type { Access } from 'payload/config'

export const isPublished: Access = () => {
    return {
        or: [
            {
                _status: {
                    equals: 'published',
                },
            },
        ],
    }
}