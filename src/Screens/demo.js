import React, { useRef, useState } from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

export default function App() {

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
  return (
    <View style={styles.container}>
      <MapView  ref={mapRef} style={styles.map}  initialRegion={pickupCords}>


 <Marker coordinate={pickupCords}/>
<Marker coordinate={droplocationCords}/> 


<MapViewDirections
            origin={pickupCords}
            
            destination={droplocationCords}
            apikey="AIzaSyCmZ8NWN3DsTtIJ-BDDwZfimvZz2f2xpE8"
            strokeWidth={3}
            strokeColor='hotpink'
            optimizeWaypoints={true}
            onReady={result => {mapRef.current.fitToCoordinates(result.coordinates,{edgePadding:{
              right:30,bottom:300,left:30,top:30
            }})}}
          
            
          />

</MapView>
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
});
