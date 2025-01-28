import MapView, { Marker } from "react-native-maps";
import styles from "../style/Styles";
import * as Location from 'expo-location'
import { useEffect,  useState  } from "react";

let nextId = 0;

export default function Map(){
  const [markers, setMarkers] = useState([{id: -1, latitude: 64.308511, longitude: 25.904912}])
  const [location, setLocation] = useState({
    // this is the location if we don't get user location
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  useEffect(() => {
    (async() => {
      getUserLocation()
    })()
  }, [])

  const getUserLocation = async( ) => {
    let {status} = await Location.requestForegroundPermissionsAsync()
  
    try {
      if (status !== 'granted'){
        console.log('geolocation failed')
        return
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High})
      setLocation({...location, 'latitude': position.coords.latitude,'longitude': position.coords.longitude})
    } catch (error) {
      console.log(error)
    }
  }

  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate
    setMarkers([
      ...markers,
      {id: nextId++, latitude: coords.latitude, longitude: coords.longitude}
    ])
  }

  return(
    <MapView
      showsUserLocation={true}
      style={styles.map}
      region={location}
      onLongPress={showMarker}
    >
      {markers.map((item) => (
        <Marker
        key={item.id}
        coordinate={{latitude: item.latitude, longitude: item.longitude}}
        pinColor="#a87332"
        />
      ))}
      {/*
        <Marker
        title="Test marker"
        coordinate={{latitude: 64.308511, longitude: 25.904912}}
      />
      */}
    </MapView>
  )
}