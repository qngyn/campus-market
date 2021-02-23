import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    ...theme.spreadThis, 
    formControl: {
        minWidth: 80,
        height: 45
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    }
}));
