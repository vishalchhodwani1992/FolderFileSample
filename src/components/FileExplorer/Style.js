import { StyleSheet } from "react-native";

const Style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    add_bt_container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    folder_icon: {
        width: 44
    },
    body_container:{
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff'
    },
    search_container: {
        backgroundColor: '#E4E4E4',
        backgroundColor: 'white',
        marginBottom: 2,
        paddingBottom: 2,
        marginTop: 16,
        width: '100%',
        alignSelf: 'center',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: 20,
    },
    search_input_container: {
        backgroundColor: 'white',
        borderColor: "#E4E4E4",
        borderRadius: 6,
        borderWidth: 2,
        borderBottomWidth: 2.3,
    },
    search_input: {
        backgroundColor: 'white',
        elevation: 0,
    },
    count_text:{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#000'
    },
    flatlist:{
        paddingTop: 10,
        paddingBottom: 10,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 3,
        marginBottom: 3
    },
    content_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    folder_icon: {
        width: 40,
        marginRight: 16,
    },
    menu_icon: {
        width: 20,
        marginRight: 10,
    },
    folder_name: {
        color: "#222222",
        fontSize: 14,
        marginLeft: 10,
    },
    file_name: {
        color: "#222222",
        fontSize: 14,
        marginLeft: 10,
    },
    file_icon: {
        marginRight: 16,
        width: 36,
    },
    file_ext: {
        color: "#717171",
        fontSize: 12,
        marginLeft: 10,
    },
    not_found:{
        fontSize: 32,
        color: "#717171",
        alignSelf: 'center'
    }
});

export default Style;