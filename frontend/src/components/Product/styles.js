import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    ...theme.spreadThis, 
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
    card: {
        height: '100%'
    }
}));
