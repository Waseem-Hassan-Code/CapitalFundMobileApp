import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
// import ImagePicker from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker';


const NewComplaint = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera roll is required!');
      }
    })();
  }, []);
  
  const selectImage = async() => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result.assets[0].uri);
    setImage(result.assets[0].uri)
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      console.log('nnnnnn');
    }
     
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Title:", title);
    console.log("Details:", details);
    // Reset fields if needed
    setTitle("");
    setDetails("");
    setImage(null);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={styles.content}>
        {/* <Text style={styles.heading}>Add Complaint</Text> */}
        {image!=null ?
           
           <Image
           style={{height:100,width:100,alignSelf:'center',borderRadius:10}}
           source={{
             uri: image,
           }}
         />
         
        
        :null}
        
        <Pressable onPress={selectImage}>
          <Text style={styles.chooseImageText}>Choose Image</Text>
        </Pressable>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Details"
          style={[styles.input, styles.detailsInput]}
          multiline
          numberOfLines={4}
          value={details}
          onChangeText={setDetails}
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
        <Button
          title="Back To Home"
          onPress={() => navigation.navigate("UserHome")}
          style={styles.backButton}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  chooseImageText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  detailsInput: {
    height: 140,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 22,
    width: "100%",
  },
  backButton: {
    marginTop: 40,
    width: "100%",
    bottom: 20,
  },
});

export default NewComplaint;
