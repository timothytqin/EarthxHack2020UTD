import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#00724e',
        },
        secondary: {
            main: '#c95100',
        },
    },
    typography: {
        useNextVariants: true,
        fontFamily: 'din-2014, sans-serif',
        button: {
            textTransform: 'capitalize',
            fontWeight: 600,
        },
        subtitle1: {
            color: '#666',
            lineHeight: '1.5',
        },
    },
    overrides: {
        MuiButton: {
            contained: {
                boxShadow: 'none',
            },
        },
        MuiCard: {
            root: {
                boxShadow: 'none',
            },
        },
        MuiCardMedia: {
            root: {
                height: '10rem',
            },
        },
        MuiCardActions: {
            root: {
                padding: '1rem',
                paddingTop: 0,
            },
        },
    },
    form: {
        textAlign: 'center',
    },
    image: {
        margin: '20px auto 20px auto',
    },
    pageTitle: {
        margin: '10px auto 10px auto',
    },
    textField: {
        margin: '10px auto 10px auto',
    },
    button: {
        marginTop: 20,
        position: 'relative',
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10,
    },
    progress: {
        position: 'absolute',
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4,
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20,
    },
    paper: {
        padding: 20,
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%',
            },
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle',
            },
            '& a': {
                color: '#00bcd4',
            },
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0',
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px',
        },
    },
});
