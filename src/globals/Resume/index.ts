import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload/types";
import { verifyUser } from "../../access/verifyUser";
import { FrontendUsers } from "../../collections/FrontendUsers";

export const Resume: GlobalConfig = {
    access: {
        read: verifyUser({
            allowedUserCollections: [FrontendUsers.slug]
        }),
    },
    slug: 'resume',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'contact',
                    label: 'Contact',
                    fields: [
                        {
                            name: 'avatar',
                            label: 'Avatar',
                            type: 'upload',
                            relationTo: 'media',
                        },
                        {
                            name: 'address',
                            label: 'Address',
                            type: 'text',
                        },
                        {
                            name: 'phone',
                            label: 'Phone',
                            type: 'text',
                        },
                        {
                            name: 'email',
                            label: 'Email',
                            type: 'text',
                        }
                    ]
                },
                {
                    name: 'about',
                    label: 'About',
                    fields: [
                        {
                            name: 'job_title',
                            label: 'Job Title',
                            type: 'text',
                        },
                        {
                            name: 'profile',
                            label: 'Profile',
                            type: 'richText',
                        },
                        lexicalHTML('profile', {
                            name: 'profile_html',
                        }),
                    ]
                },
                {
                    name: 'experience',
                    label: 'Experience',
                    fields: [
                        {
                            name: 'entries',
                            label: 'Entries',
                            type: 'array',
                            minRows: 1,
                            admin: {
                                components: {
                                    RowLabel: ({ data }) => {
                                        return `${data.company} (${data.job_title})`;
                                    }
                                }
                            },
                            fields: [
                                {
                                    name: 'company',
                                    label: 'Company',
                                    type: 'text',
                                },
                                {
                                    name: 'job_title',
                                    label: 'Job Title',
                                    type: 'text',
                                },
                                {
                                    name: 'is_current_job',
                                    label: 'Is Current Job',
                                    type: 'checkbox',
                                },
                                {
                                    name: 'start_date',
                                    label: 'Start Date',
                                    type: 'date',
                                    admin: {
                                        date: {
                                            pickerAppearance: 'monthOnly',
                                            displayFormat: 'MMMM yyyy',
                                        },
                                    }
                                },
                                {
                                    name: 'end_date',
                                    label: 'End Date',
                                    type: 'date',
                                    admin: {
                                        date: {
                                            pickerAppearance: 'monthOnly',
                                            displayFormat: 'MMMM yyyy',
                                        },
                                        condition: (_, siblingData) => {
                                            console.log({ siblingData });
                                            return !siblingData.is_current_job;
                                        },
                                    }
                                },
                                {
                                    name: 'description',
                                    label: 'Description',
                                    type: 'richText',
                                },
                                lexicalHTML('description', {
                                    name: 'description_html',
                                })
                            ]
                        }
                    ]
                },
                {
                    name: 'education',
                    label: 'Education',
                    fields: [
                        {
                            name: 'entries',
                            label: 'Entries',
                            type: 'array',
                            minRows: 1,
                            admin: {
                                components: {
                                    RowLabel: ({ data }) => {
                                        return `${data.institution} (${data.title})`;
                                    }
                                }
                            },
                            fields: [
                                {
                                    name: 'institution',
                                    label: 'Institution',
                                    type: 'text',
                                },
                                {
                                    name: 'title',
                                    label: 'Title',
                                    type: 'text',
                                },
                                {
                                    name: 'start_date',
                                    label: 'Start Date',
                                    type: 'date',
                                    admin: {
                                        date: {
                                            pickerAppearance: 'monthOnly',
                                            displayFormat: 'MMMM yyyy',
                                        },
                                    }
                                },
                                {
                                    name: 'end_date',
                                    label: 'End Date',
                                    type: 'date',
                                    admin: {
                                        date: {
                                            pickerAppearance: 'monthOnly',
                                            displayFormat: 'MMMM yyyy',
                                        },
                                    }
                                },
                                {
                                    name: 'description',
                                    label: 'Description',
                                    type: 'richText',
                                },
                                lexicalHTML('description', {
                                    name: 'description_html',
                                })
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}