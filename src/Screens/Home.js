import React, { useRef, useState } from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, View,Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import ImagePath from '../constants/ImagePath';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Home({navigation}) {

  const [state,setState] = useState({
    pickupCords:{
      latitude:3.834027,
      longitude: 11.506229,
      latitudeDelta:0.0922,longitudeDelta:0.021
    },
    droplocationCords:{
      latitude: 3.824874, 
      longitude:11.504672,
      latitudeDelta:0.0922,longitudeDelta:0.021
    }
  })
  const mapRef = useRef()
  const {pickupCords,droplocationCords} = state
  const onPressLocation=()=>{
    navigation.navigate('chooseLocation')
    
  }
  
  return (
    <View style={styles.container}>
    <View style={{flex:1}}>
      <MapView  ref={mapRef} style={styles.map}  initialRegion={pickupCords}>


 <Marker coordinate={pickupCords} image={ImagePath.icCurLoc}/>
<Marker coordinate={droplocationCords} image={ImagePath.icGreenMarker}/> 


<MapViewDirections
            origin={pickupCords}
            
            destination={droplocationCords}
            apikey="AIzaSyCmZ8NWN3DsTtIJ-BDDwZfimvZz2f2xpE8"
            strokeWidth={8}
            strokeColor='green'
            optimizeWaypoints={true}
            onReady={result => {mapRef.current.fitToCoordinates(result.coordinates,{edgePadding:{
              right:30,bottom:300,left:30,top:30
            }})}}
          
            
          />

</MapView>


</View>
<View style={styles.bottomCard}>

  <Text>Where are you going..?</Text>
  <TouchableOpacity  style={styles.inputStyle} onPress={onPressLocation}>
    <Text>Choose your location</Text>
  </TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomCard:{
    backgroundColor:'white',
    width:'100',
    padding:30,
    borderTopEndRadius:24,
    borderTopStartRadius:24
  },
  inputStyle:{
    backgroundColor:'white',
    borderRadius:4,
    borderWidth:1,
    alignItems:'center',
    height:48,
    justifyContent:'center',
    marginTop:16


  }
});
