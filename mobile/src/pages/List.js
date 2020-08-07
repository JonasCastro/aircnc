import React, {useState,useEffect} from 'react';
import {SafeAreaView,ScrollView, View,Image,StyleSheet,Text,AsyncStorage ,Alert} from 'react-native';
import logo from '../assets/logo.png'
import SpotList from '../components/Spots';
import socketio from 'socket.io-client';


export default function List(){
    const [techs,setTechs] = useState([]);
    useEffect(() =>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.10.246:3333',{
                query: { user_id }
            })
            console.log('aki ${booking.spot.company}')
           socket.on('booking_response', booking=>{
               Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REPROVADA'}`)
           })
        });
    },[]);
    useEffect(() =>{
        AsyncStorage.getItem('techs').then(StorageTechs => {
            const techsArray = StorageTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        });
    },[]);
    return( 
        <>
            
            <SafeAreaView style ={styles.container} >
                <SafeAreaView style={{ flex: 0, backgroundColor: '#bfbfbf',height: 35 }} />
                <Image style ={styles.logo} source={ logo } />
                <ScrollView
                showsVerticalScrollIndicator={false}>
                    {techs.map(tech => <SpotList key={tech} tech= {tech} /> )}
                </ScrollView>
                <SafeAreaView style={{ flex: 0,height: 10 }} />
            </SafeAreaView>
            
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    logo:{
        height: 32,
        resizeMode: "contain",
        alignSelf:'center',
        marginTop:30
       
    },
});