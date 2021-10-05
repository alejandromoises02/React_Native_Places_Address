import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import * as Location from "expo-location";
import { COLORS } from '../constants';
import MapPreview from "../components/MapPreview";

const MapSelector = (props) => {
  const navigation = useNavigation();
  const [latlong, setLatlong] = useState();

  const verifyPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos Insuficientes",
        "La aplicacion necesita permisos para uso de locacion",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const handlerTakeLocation = async () => {
    const isLocationOk = await verifyPermissions();
    if (!isLocationOk) return;

    let location = await Location.getCurrentPositionAsync({
      timeout: 5000
    });
    setLatlong({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    props.onLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  return (
    <View style={styles.container}>
        <MapPreview location={latlong} style={styles.preview}>
          <Text>Aun no se ha cargado una locacion</Text>
        </MapPreview>
      <Button
        title="Obtener Locacion"
        color={COLORS.LIGTH_PINK}
        onPress={handlerTakeLocation}
      />
      <Button
        title="Elegir en Mapa"
        color={COLORS.BLUSH}
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.BLUSH,
    borderWidth: 1
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default MapSelector;
