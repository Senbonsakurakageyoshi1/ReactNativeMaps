import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React, { useState } from 'react'
import AdressPickup from '../components/AdressPickup';
import { useNavigation } from '@react-navigation/native';

import CustomBtn from '../components/CustomBtn'
import {showError,showSuccess} from '../helper/helperFunction'

const ChooseLocation = (props) => {

  const navigation = useNavigation()

  const [state,setState]=useState({//pickupCords:{},
    destinationCords:{}})

  const {//pickupCords,
    destinationCords}=state

  const checkValid=()=>{
   

    if(Object.keys(destinationCords).length==0){
      showError('Please  enter your destination Location')
      return false
    }
    return true
  }


  const onDone=()=>{
    const isvalid=checkValid()

    if(isvalid){
      props.route.params.getCordinates({

        //pickupCords,
        destinationCords
      })
      showSuccess('Ginkaku')
      navigation.goBack()


    }

  }
  // const fetchAddressCords=(lat,lng)=>{
  //   setState({...state,pickupCords:{latitude:lat,longitude:lng}})

  // }

  const fetchDestinationCords=(lat,lng)=>{
    setState({...state,destinationCords:{latitude:lat,longitude:lng}})


  }
  return (
    <View style={styles.container}>
      <ScrollView  keyboardShouldPersistTaps="handled" style={{backgroundColor:'white',flex:1,padding:24}}>
      <View style={{marginBottom:16}}/>
      <AdressPickup  placeholderText="Enter destination Location"   fetchAddress={fetchDestinationCords} />
      <CustomBtn btnText='Done' btnStyle={{marginTop:24}} onPress={onDone}  />
      </ScrollView>
    </View>
  )
}

export default ChooseLocation

const styles = StyleSheet.create({
    container:{
        flex:1,

    }
});