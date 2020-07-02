// export const darkTheme = {
//     palette: {
//         type: 'dark', // Switching the dark mode on is a single property value change.
//     },
// };
export const englishLightTheme = {
    direction: 'ltr',
    palette: {
        type: 'light',
        secondary: {
            light: '#5f5fc4',
            main: '#1a73e8',
            dark: '#001064',
            contrastText: '#fff',
        },
    },

    overrides: {
        MuiPaper: {
            root: {
                // color: '#fff'

            }
        } , MuiTypography: {
            title: {
                lineHeight: '1.4em'
            },
            headline: {
                fontSize: '1rem'
            }
            , body1: {
                fontSize: '0.7rem'
            }
        },
    }
};
export const ArabiclightTheme = {
    direction: 'rtl',
    palette: {
        type: 'light',
        secondary: {
            light: '#5f5fc4',
            main: '#1a73e8',
            dark: '#001064',
            contrastText: '#fff',
        },
    },

    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['Almarai',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    overrides: {
        MuiButton: { // override the styles of all instances of this component
            root: { // Name of the rule
                fontFamily: ['Almarai',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Arial',
                    'sans-serif',
                ].join(','),
            },
        },
        MuiInputLabel: {
            root: {
                // right: 0,
                //  top: '-5px',
                //  left:'initial',
                // transformOrigin: 'top right !important',

            }
        },
        MuiInput: {
            input: {
                height: 30
            }
        },
        MuiCardContent:{
            root: {
                paddingLeft: '0px',
                paddingRight: '0px'
            }
        },
        MuiTypography: {
            title: {
                lineHeight: '1.4em'
            },
            headline: {
                fontSize: '1rem'
            }
            , body1: {
                fontSize: '0.7rem'
            }
        },
        MuiFormControlLabel: {
            root: {
                marginLeft: '0px'
            }
        },
        // MuiToolbar:{
        //     root:{
        //         button:{
        //         display:'none'
        //     }}
        // },
        Logout: {
            menuItem:
                { paddingRight: '1.2em' }

        }
    },
};
