/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useLayoutEffect, useState, useRef, useMemo } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View, Image, ScrollView, UIManager, LayoutAnimation } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import Style from './Style';
import Images from '../../helper/Images';
import ActionSheet from 'react-native-actionsheet'
import AddModal from '../Modals/AddFileFolder/AddModal';



function FileExplorer(props) {

    const { navigation, route } = props;

    const params = route.params;
    let pathObjProp = useMemo(() => params.pathObj, [params]);

    const [pathObj, setPathObj] = useState(pathObjProp);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [folderList, setFolderList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState({});
    const [selectedItemAction, setSelectedItemAction] = useState({});
    const actionRef = useRef();
    const fileActionRef = useRef();
    const folderActionRef = useRef();


    const setAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 250,
            update: {
                type: LayoutAnimation.Types.easeIn,
                springDamping: 0.7,
            },
        });
        LayoutAnimation.configureNext({
            duration: 500,
            create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
            delete: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
        });
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, [])

    useEffect(() => {

        if (pathObj) {
            let filesFolders = pathObj[pathObj.path];
            let mfolderList = filesFolders.filter((item) => item.type === "folder");
            let mFileList = filesFolders.filter((item) => item.type === "file");
            setFolderList(mfolderList);
            setFileList(mFileList);
        }
    }, [pathObj])

    useLayoutEffect(() => {

        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: '#000',
            headerTitle: props => <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, color: "#000", fontWeight: 'bold' }}>{pathObj.name}</Text>
            </View>,
            headerRight: () => <TouchableOpacity style={Style.add_bt_container} activeOpacity={0.6} onPress={() => actionRef.current.show()}>
                <Image resizeMode="contain" source={Images.plusIc} style={Style.folder_icon} />
            </TouchableOpacity>
        });

    }, [navigation, pathObj])

    function redirect(item) {
        console.log("item==", pathObj, item);
        navigation.dispatch(
            CommonActions.navigate({
                name: 'FileExplorer',
                key: (new Date().valueOf()).toString(),
                params: { backPath: item.path, pathObj: item }
            })
        );
    }

    function onSearch(keyword) {
        setSearchKeyword(keyword);
    }

    function onAction(index) {
        switch (index) {
            case 0: //create file
                setAddModalVisible({ modalVisible: true, type: "file" });
                break;
            case 1: //create file
                setAddModalVisible({ modalVisible: true, type: "folder" });
                break;
            case 2: //create file
                break;

            default:
                break;
        }
        console.log("type");
    }

    function onFileFolderAction(type, index){

        switch (index) {
            case 0: // Delete
                let tempPathObj = JSON.parse(JSON.stringify(pathObj));
                let fileFolders = tempPathObj[tempPathObj.path];
                let index = -1;
                fileFolders.find((item, i)=> {
                    if (item.name == selectedItemAction.name && item.type === selectedItemAction.type){
                        index = i;
                    }
                })
                fileFolders.splice(index, 1);
                tempPathObj[tempPathObj.path] = fileFolders;
                setAnimation();
                setPathObj(tempPathObj);
                break;

            case 1: // Duplicate
            case 2: // Rename
                alert("Not Done");
            default:
                break;
        }
    }

    function onModalClose() {
        setAddModalVisible({ modalVisible: false, type: "" });
    }

    function onFileFolderAdd(fileFolderInfo) {
        fileFolderInfo = checkDuplicacy(fileFolderInfo, 1);
        fileFolderInfo.path = pathObj.path + "/" + fileFolderInfo.name;
        fileFolderInfo[fileFolderInfo.path] = [];
        let tempPathObj = JSON.parse(JSON.stringify(pathObj));
        let fileFolders = tempPathObj[tempPathObj.path];
        fileFolders.push(fileFolderInfo);
        tempPathObj[tempPathObj.path] = fileFolders;
        setAnimation();
        setPathObj(tempPathObj);
        setAddModalVisible({ modalVisible: false, type: "" });
    }


    function checkDuplicacy(fileFolderInfo, copyCount){
        let fileFolders = pathObj[pathObj.path];
        let duplicate = fileFolders.find((item, i) => item.name == fileFolderInfo.name && item.type === fileFolderInfo.type)

        if (!duplicate) {
            return fileFolderInfo;
        } else{
            let nameCopy;
            if (fileFolderInfo.type === 'file'){
                nameCopy = fileFolderInfo.name.split(".").reverse().slice(1).reverse().join("");
            } else{
                nameCopy = fileFolderInfo.name
            }
            fileFolderInfo.name = nameCopy + " Copy(" + copyCount +")";
            if (fileFolderInfo.type === 'file') {
                fileFolderInfo.name = fileFolderInfo.name + "." + fileFolderInfo.ext;
            } else{
                let oldPath = fileFolderInfo.path;
                fileFolderInfo.path = fileFolderInfo.path.split("/").reverse().slice(1).reverse().join("/");
                if (fileFolderInfo.path == "") fileFolderInfo.path = fileFolderInfo.path + "/" + fileFolderInfo.name;
                let mPathObjArr = fileFolderInfo[oldPath];
                delete fileFolderInfo[oldPath];
                fileFolderInfo[fileFolderInfo.path] = mPathObjArr;
            }
            copyCount++;
            return checkDuplicacy(fileFolderInfo, copyCount);
        }
    }

    return (
        <SafeAreaView scro style={Style.body_container}>
            <SearchBar
                containerStyle={Style.search_container}
                inputContainerStyle={Style.search_input_container}
                inputStyle={Style.search_input}
                searchIcon={true}
                lightTheme={true}
                placeholder={"Search..."}
                onChangeText={(keyword) => onSearch(keyword)}
                value={searchKeyword}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    {
                        folderList.length > 0 &&
                        <React.Fragment>
                            <Text style={Style.count_text}>{folderList.length + (folderList.length > 1 ? " folders" : " folder")}</Text>
                            {
                                folderList.map((item, index) => <TouchableOpacity onPress={() => redirect(item)} key={index} style={Style.row}>
                                    <View style={Style.content_row}>
                                        <Image resizeMode="contain" source={Images.folderIc} style={Style.folder_icon} />
                                        <Text style={Style.folder_name}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedItemAction(item);
                                        folderActionRef.current.show()
                                    }}>
                                        <Image resizeMode="contain" source={Images.menuIc} style={Style.menu_icon} />
                                    </TouchableOpacity>
                                </TouchableOpacity>)
                            }
                        </React.Fragment>
                    }
                    {
                        fileList.length > 0 &&
                        <React.Fragment>
                            <Text style={Style.count_text}>{fileList.length + (fileList.length > 1 ? " files" : " file")}</Text>
                            {
                                fileList.map((item, index) => <View key={index} style={Style.row}>
                                    <View style={Style.content_row}>
                                        <Image resizeMode="contain" source={item.ext === 'txt' || item.ext === 'doc' ? Images.docIc : (item.ext === 'pdf' ? Images.pdfIc : (item.ext === 'ppt' ? Images.pptIc : Images.noFileIc))} style={Style.file_icon} />
                                        <View>
                                            <Text style={Style.file_name}>{item.name}</Text>
                                            <Text style={Style.file_ext}>{item.ext.toUpperCase()}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={()=> {
                                        setSelectedItemAction(item);
                                        fileActionRef.current.show()
                                    }}>
                                        <Image resizeMode="contain" source={Images.menuIc} style={Style.menu_icon} />
                                    </TouchableOpacity>
                                </View>)
                            }
                        </React.Fragment>
                    }
                </View>
                {
                    fileList.length === 0 && folderList.length === 0 &&
                    <Text style={Style.not_found}>Not found</Text>
                }
            </ScrollView>

            <ActionSheet
                ref={actionRef}
                options={['New File', 'New Folder', 'Cancel']}
                cancelButtonIndex={2}
                onPress={(index) => onAction(index)}
            />
            <ActionSheet
                ref={folderActionRef}
                options={['Delete Folder', 'Duplicate Folder', 'Rename Folder', 'Cancel']}
                cancelButtonIndex={3}
                destructiveButtonIndex={0}
                onPress={(index) => onFileFolderAction('folder', index)}
            />
            <ActionSheet
                ref={fileActionRef}
                options={['Delete File', 'Duplicate File', 'Rename File', 'Cancel']}
                cancelButtonIndex={3}
                destructiveButtonIndex={0}
                onPress={(index) => onFileFolderAction('file', index)}
            />
            {
                addModalVisible.modalVisible &&
                <AddModal
                    modalVisibleInfo={addModalVisible}
                    onModalClose={onModalClose}
                    onFileFolderAdd={onFileFolderAdd}
                />
            }
        </SafeAreaView>
    );
}



export default FileExplorer;