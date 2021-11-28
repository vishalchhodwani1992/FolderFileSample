import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import Style from './Style';
import PropTypes from 'prop-types';
import { SafeAreaView } from "react-native";

const AddModal = (props) => {
    let { onModalClose, modalVisibleInfo, onFileFolderAdd } = props;

    let [fileFolderName, setFileFolderName] = useState("");

    function onAdd(){
        if(validate()){
            let obj = {};
            obj.name = fileFolderName;
            obj.type = modalVisibleInfo.type;
            if (obj.type === 'file'){
                let fileNameArr = fileFolderName.split(".");
                obj.ext = fileNameArr[fileNameArr.length - 1];
            }
            console.log("obj==", obj);
            onFileFolderAdd(obj);
        }
    }

    function validate() {
        return true;
    }

    function onChangeText(name){
        setFileFolderName(name);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleInfo.modalVisible}
            onRequestClose={onModalClose}
        >
            <SafeAreaView
                style={Style.modal_container}>
                <View style={Style.modal_body}>
                    <View style={Style.header_container}>
                        <Text style={Style.header_title}>{modalVisibleInfo.type === "folder" ? "Create a new folder" : "Create a new File"}</Text>
                    </View>
                    <View style={Style.input_container}>
                        <TextInput
                            style={Style.input}
                            onChangeText={onChangeText}
                            value={fileFolderName}
                            placeholder={modalVisibleInfo.type === 'folder' ? "Folder name" : "File name"}
                            keyboardType="default"
                            returnKeyType="done"
                        />
                    </View>
                    <View style={Style.bt_container}>
                        <TouchableOpacity onPress={() => onModalClose()} style={[Style.button, Style.negative_bt]}>
                            <Text style={Style.negative_bt_text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> onAdd()} style={[Style.button, Style.positive_bt]}>
                            <Text style={Style.positive_bt_text}>{modalVisibleInfo.type === 'folder' ? 'Create folder' : 'Create file' }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

AddModal.propTypes = {
    onModalClose: PropTypes.func,
    onFileFolderAdd: PropTypes.func,
    modalVisibleInfo: PropTypes.object,
}


export default AddModal;