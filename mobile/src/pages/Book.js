import React,{useState} from 'react';
import {AsyncStorage,Alert,TouchableOpacity,KeyboardAvoidingView,SafeAreaView,Platform,StyleSheet,Text, View ,TextInput} from 'react-native';

import api from '../services/api'

export default function Book({navigation}){
    const [date,setDate] = useState('');
    const id = navigation.getParam('id');
    async  function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`,{
            date
        },{
           headers:{ user_id } 
        });
        Alert.alert('Solicitação de reserva enviada.');
        navigation.navigate('List');
    }
    function handleCancel(){
        navigation.navigate('List');
    }
    return (
    <KeyboardAvoidingView enabled={Platform.OS ==='ios'} behavior= "padding"  style ={styles.conteiner}>  
            <SafeAreaView style={{ flex: 0, backgroundColor: '#bfbfbf',height: 35 }} />
            <Text >{id}</Text>
            <View style ={styles.form}>
                <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                value={date}
                onChangeText={setDate}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={[styles.button,styles.cancelbutton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    conteiner:{
        flex:1,
        
    },
    form:{
        alignSelf :'stretch',
        paddingHorizontal:30,
        marginTop: 30,
    },
    label:{
        fontWeight :'bold',
        color: '#444',
        marginBottom: 8,
    },
    input:{
       borderWidth: 1,
       borderColor: '#ddd',
       paddingHorizontal: 20,
       fontSize:16,
       color:'#444',
       height:44,
       marginBottom:20,
       borderRadius:2,

    },
    button:{
        height: 44,
        backgroundColor: '#f05a5b',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 2,
    },
    cancelbutton:{
        backgroundColor: '#ccc',
        marginTop: 10,
   
    },
    buttonText:{
        color:'#FFF',
        fontWeight: "bold",
        fontSize:16,
    }
});