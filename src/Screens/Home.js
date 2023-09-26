import React, { useRef, useState,useEffect } from 'react';
import MapView,{Marker,AnimatedRegion} from 'react-native-maps';
import { StyleSheet, View,Text ,Dimensions, Platform,Image} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import ImagePath from '../constants/ImagePath';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { locationPermission ,getCurrentLocation} from '../helper/helperFunction';
//import { Scene } from 'three';


const screen = Dimensions.get('window');
const ASPECT_RATIO =  screen.width/screen.height;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA*ASPECT_RATIO;




export default function Home({navigation}) {

  const [state,setState] = useState({
    curLoc:{
      latitude:3.8381992,
      longitude: 11.4907126
      
    },
    destinationCords:{}, 
    isLoading:false,
    coordinate: new AnimatedRegion({latitude:3.8381992,
      longitude: 11.4907126,
      latitudeDelta:LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA

      })
  })
  const mapRef = useRef()
  const markerRef = useRef()
  const {curLoc,destinationCords,isLoading,coordinate} = state

  useEffect(()=>{

    getLiveLocation()
  },[])

  const getLiveLocation= async() =>{

      const locPermissionDenied = await locationPermission()
      if(locPermissionDenied){

        const {latitude,longitude} = await getCurrentLocation()
        animate(latitude,longitude);
        setState({...state,curLoc:{latitude,longitude}, coordinate: new AnimatedRegion({latitude:latitude,
          longitude: longitude,
          latitudeDelta:LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
    
          })})
      }
      

  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      getLiveLocation()
    },6000);

    return ()=>clearInterval(interval)
  })


  const onPressLocation=()=>{
    navigation.navigate('chooseLocation',{getCordinates:fetchValues})
    
  }

  const fetchValues =(data)=>{
    setState({
      ...state,
      
      destinationCords:{
        latitude:data.destinationCords.latitude,
        longitude:data.destinationCords.longitude,
      }
    })
  }

  const animate = (latitude,longitude)=>{const newCoordinate={latitude,longitude}; 
if(Platform.OS=='android'){
  if(markerRef.current){
    markerRef.current.animateMarkerToCoordinate(newCoordinate,7000);
  }else{
    coordinate.timing(newCoordinate).start();
  }
}


}

  const onCenter =()=>{
    mapRef.current.animateToRegion({
      latitude:curLoc.latitude,
          longitude: curLoc.longitude,
          latitudeDelta:LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
    
    })
  }
  return (
    <View style={styles.container}>
    <View style={{flex:1}}>
      <MapView  ref={mapRef} style={styles.map}  initialRegion={{
        // pickupCords
        ...curLoc,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA,

        }}>


 <Marker.Animated   ref={markerRef}  coordinate={coordinate} image={ImagePath.icCurLoc}/>
{Object.keys(destinationCords).length> 0 &&(<Marker coordinate={destinationCords} image={ImagePath.icGreenMarker}/>) }

{Object.keys(destinationCords).length> 0 &&
(<MapViewDirections
            origin={curLoc}
            
            destination={destinationCords}
            apikey="AIzaSyCmZ8NWN3DsTtIJ-BDDwZfimvZz2f2xpE8"
            strokeWidth={6}
            strokeColor='green'
            optimizeWaypoints={true}
            onReady={result => {mapRef.current.fitToCoordinates(result.coordinates,{edgePadding:{
              right:30,bottom:300,left:30,top:30
            }})}}
          
            
          />)}

</MapView>
<TouchableOpacity   style={{position:'absolute',bottom:0,right:0}} onPress={onCenter}>
  <Image  source={ImagePath.greenIndicator}/>
</TouchableOpacity>


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
