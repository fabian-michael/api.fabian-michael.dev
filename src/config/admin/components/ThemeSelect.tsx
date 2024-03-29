import clsx from "clsx";
import React, { FunctionComponent, useEffect } from "react";
import Select from "react-select";

type Theme = "light" | "dark" | 'system';
type OptionType = {
    value: Theme;
    label: string;
};

const options: OptionType[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' }
]

export const ThemeSelect: FunctionComponent = () => {
    const [theme, setTheme] = React.useState<Theme | null>(null);

    // initialize
    useEffect(() => {
        const themeFromLocalStorage = localStorage.getItem('theme') as Theme;
        if (themeFromLocalStorage) {
            setTheme(themeFromLocalStorage);
        } else {
            setTheme('system');
        }
    }, []);

    // update
    useEffect(() => {
        if (theme === null) {
            return;
        }

        if (theme === 'system') {
            const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const systemTheme = systemThemeMediaQuery.matches ? 'dark' : 'light';
            document.documentElement.dataset.theme = systemTheme;
        } else {
            document.documentElement.dataset.theme = theme;
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    // handle prefers-color-scheme change if theme is 'system'
    useEffect(() => {
        if (
            theme === null ||
            theme !== 'system'
        ) {
            return;
        };

        const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            const systemTheme = event.matches ? 'dark' : 'light';
            document.documentElement.dataset.theme = systemTheme;
        }
        systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            systemThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
        }
    }, [theme])

    if (theme === null) {
        return null;
    }

    return (
        <Select<OptionType>
            unstyled
            classNames={{
                container: (state) => {
                    return clsx('dropdown', {
                        'dropdown-open': true,//state.isFocused
                    });
                },
                control: () => {
                    return 'px-4 py-2 rounded-btn !bg-base-100 !border !border-solid !border-base-content !border-opacity-20 !my-0';
                },
                menu: () => {
                    return 'dropdown-content';
                },
                menuList: () => {
                    return 'rounded-btn my-2 py-1 !bg-base-100 !border !border-solid !border-base-content !border-opacity-20'
                },
                option: (state) => {
                    return clsx('bg-base-100 text-base-content px-4 py-2 !text-sm', {
                        'bg-base-300': state.isFocused,
                        'bg-primary text-primary-content': state.isSelected,
                    })
                },

            }}
            options={options}
            defaultValue={options.find(option => option.value === theme)}
            onChange={(option) => {
                setTheme(option?.value ?? 'system');
            }}
            isSearchable={false}
            getOptionLabel={option => option.label}
            menuPortalTarget={document.body}
        />
    )
}