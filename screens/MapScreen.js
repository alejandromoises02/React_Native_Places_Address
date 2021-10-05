import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState();
  const initialRegion = {
    latitude: 37.4219023,
    longitude: -122.0839984,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const handlerSelectedLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.container}
      onPress={handlerSelectedLocation}
    >
      {markerCoordinates && (
        <Marker title="Ubicacion seleccionada" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MapScreen;
