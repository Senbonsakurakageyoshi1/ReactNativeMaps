import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'
import AdressPickup from '../components/AdressPickup';
import { useNavigation } from '@react-navigation/native';

import CustomBtn from '../components/CustomBtn'


const ChooseLocation = ({}) => {

  const navigation = useNavigation()

  const onDone=()=>{
    navigation.goBack()
  }
  const fetchAddressCords=(lat,lng)=>{

  }

  const fetchDestinationCords=(lat,lng)=>{

  }
  return (
    <View style={styles.container}>
      <ScrollView  keyboardShouldPersistTaps="handled" style={{backgroundColor:'white',flex:1,padding:24}}>
      <AdressPickup  placeholderText="Enter Pickup Location"  fetchAddress={fetchAddressCords}  />
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