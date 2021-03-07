import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    ...theme.spreadThis, 
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    gridItemLeft: {
        width: 100
    },
    placeOrderButton: {
        color: 'white',
        backgroundColor: 'black'
    },
    messageBox: {
        width: '100%'
    }
}));
