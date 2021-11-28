import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF6FF',
    },
    modal_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#000000aa',
    },
    modal_body: {
        width: '80%',
        backgroundColor: '#fff',
        borderColor: '#ABBACF',
        borderWidth: 1,
        borderRadius: 8,
        padding: 24,
    },
    header_container: {
        width: '100%',
    },
    header_body: {
        alignItems: 'center',
        alignItems: 'center',
    },
    header_title: {
        color: '#008392',
        fontSize: 16,
        lineHeight: 22,
    },
    input_container:{
        marginBottom: 12,
        marginTop: 24,
    },
    input: {
        backgroundColor: 'white',
        elevation: 0,
        borderColor: '#008392',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 16,
    },
    bt_container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 12,
    },
    button:{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 6,
    },
    negative_bt:{
        backgroundColor: '#fff'
    },
    positive_bt: {
        backgroundColor: '#008392',
        marginLeft: 16,
    },
    negative_bt_text: {
        color: '#222222'
    },
    positive_bt_text: {
        color: '#ffffff'
    }
});

export default Style;
