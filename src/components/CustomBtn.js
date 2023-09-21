import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomBtn = ({onPress=()=>{},
btnStyle={},
btnText}) => {
    
  return (
    <TouchableOpacity
    
    activeOpacity={0.8}
    style={{...styles.buttonStyle,...btnStyle}}
    onPress={onPress}
    >
        <Text style={{...styles.btnTextStyle,...btnStyle}}>
        {btnText}
        </Text>    
    
    
   

    </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({

    buttonStyle:{
        height:46,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:4
    },

    btnTextStyle:{
        fontSize:16,
        color:'black',
    }
})