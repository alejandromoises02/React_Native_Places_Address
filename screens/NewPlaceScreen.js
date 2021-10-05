import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView
} from "react-native";
import { useDispatch } from "react-redux";
import ImageSelector from "../components/ImageSelector";
import { COLORS } from "../constants";
import { addPlace } from "../store/places.actions";
import MapSelector from "../components/MapSelector"

const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState();
  const [location, setLocation] = useState();

  const handlerTitlteChange = (text) => setTitle(text);

  const dispatch = useDispatch();
  const handlerSave = () => {
    dispatch(addPlace(title, imageUri, location));
    navigation.navigate("Direcciones");
  };

  const handlePickImage = (uri) => {
    setImageUri(uri);
  };

  const handlePickLocation = (loc) => {
    setLocation(loc);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Titulo</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handlerTitlteChange}
        />

        <ImageSelector onImage={handlePickImage} />

        <MapSelector onLocation={handlePickLocation} />

        <Button
          title="Guadar Direccion"
          color={COLORS.MAROON}
          onPress={handlerSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});

export default NewPlaceScreen;
