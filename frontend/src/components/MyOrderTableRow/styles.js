import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    ...theme.spreadThis,
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    image: {
        width: '100%',
        height: '100%',
    },
}));
