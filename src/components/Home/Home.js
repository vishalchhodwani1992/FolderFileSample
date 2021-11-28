/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Style from './Style';
const storage = require('../../Config/storage.json');



function Home({ navigation, route}) {

    function redirect(path){
        navigation.navigate(path, { backPath: storage.path, pathObj: storage});
    }

    return (
        <SafeAreaView style={Style.container}>
            <TouchableOpacity style={Style.button_container} onPress={() => redirect("FileExplorer")}>
                <Text style={Style.text}>File Explorer</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}



export default Home;