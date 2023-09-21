import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { TextInput } from 'react-native-gesture-handler'

const AdressPickup = ({placeholderText,fetchAddress}) => {

    const onPressAddress=(data,details)=>{ 
        const lat=details.geometry.location.lat
        const lng=details.geometry.location.lng
            fetchAddress(lat,lng)}
  return (
    <View>
      <GooglePlacesAutocomplete
      placeholder={placeholderText}
      onPress={onPressAddress}
      fetchDetails={true}
      query={{
        key: "AIzaSyCmZ8NWN3DsTtIJ-BDDwZfimvZz2f2xpE8",
        language: 'en',
      }}

      styles={{
        textInputContainer: styles.containerStyle,
        TextInput:styles.textInputStyle
      }}
    />
    </View>
  )
}

export default AdressPickup

const styles = StyleSheet.create({containerStyle:{
    backgroundColor:'white'
,
textInputStyle:{height:48,
coloe:'black',
fontSize:16,
backgroundColor:'gray'}}})