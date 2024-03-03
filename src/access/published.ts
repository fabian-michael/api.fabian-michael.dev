import type { Access } from 'payload/config'

export const published: Access = () => {
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