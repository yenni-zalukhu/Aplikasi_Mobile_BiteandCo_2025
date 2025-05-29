import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import google from "../../assets/images/google.png";
import { Image } from "react-native";

const BuyerIndex = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ backgroundColor: "#711330", height: "100%" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "start",
          padding: 30,
          height: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 64,
            marginTop: 20,
          }}
        >
          Halo!
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          Selamat datang di Bite&Co
        </Text>
        <TextInput
          placeholder="Email"
          style={{
            backgroundColor: "#f7f7f7",
            padding: 15,
            borderRadius: 10,
            width: "100%",
            marginVertical: 20,
          }}
        />
        <TextInput
          placeholder="Password"
          style={{
            backgroundColor: "#f7f7f7",
            padding: 15,
            borderRadius: 10,
            width: "100%",
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 16,
            marginTop: 20,
            textAlign: "start",
          }}
        >
          Lupa Password?
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFB800",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 20,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            // Handle button press
            router.push("/buyer/(tabs)");
          }}
        >
          <Text
            style={{
              color: "#711330",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Masuk
          </Text>
        </TouchableOpacity>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
        }}>
          <Text style={{ color: 'white', fontSize: 16}}>Atau</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
            <Image source={google} style={{ marginRight: 10, width: 20, height: 20 }} />
          <Text
            style={{ 
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BuyerIndex;

const styles = StyleSheet.create({});
