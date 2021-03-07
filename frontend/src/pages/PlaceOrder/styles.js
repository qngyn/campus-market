import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    ...theme.spreadThis, 
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
}));
