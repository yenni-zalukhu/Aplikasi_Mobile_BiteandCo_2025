import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import logo from "../assets/images/logo.png";
import { useRouter } from "expo-router";
import { Redirect } from 'expo-router';

const index = () => {
  const router = useRouter();
  return <Redirect href="/buyer/CateringDetail" />;
  return (
    <SafeAreaView style={{ backgroundColor: "#711330", height: "100%" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Image source={logo} alt="logo" style={{ width: 193, height: 253 }} />
        <Text
          style={{
            color: "white",
            fontSize: 24,
            marginTop: 20,
          }}
        >
          Setiap Gigitan, Setiap Moment
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFB800",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 20,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            
            router.push("/started");
          }
        }
        >
          <Text
            style={{
              color: "#711330",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Mulai
          </Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
