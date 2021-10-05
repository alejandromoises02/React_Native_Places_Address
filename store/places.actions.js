import * as FileSystem from "expo-file-system";
import { insertAddress } from "../db";
import { fetchAddresses } from "../db";
import { MAP } from "../constants";

export const ADD_PLACE = "ADD_PLACE";
export const LOAD_PLACES = "LOAD_PLACES";

export const addPlace = (title, image, location) => {

  return async (dispatch) => {
      
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${MAP.API_KEY}`
    );
    const resData = await response.json();
    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;
    try {
      FileSystem.moveAsync({
        from: image,
        to: Path
      });

      const result = await insertAddress(title, Path, "Address", 10.45, 20.9);

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: result.insertId,
          title,
          image: Path,
          address: address
        }
      });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const result = await fetchAddresses();
      dispatch({ type: LOAD_PLACES, places: result.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
