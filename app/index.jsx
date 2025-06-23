import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for existing tokens
        const sellerToken = await AsyncStorage.getItem('sellerToken');
        const buyerToken = await AsyncStorage.getItem('buyerToken');

        // Redirect based on which token exists
        if (sellerToken) {
          router.replace("/seller/(tabs)");
        } else if (buyerToken) {
          router.replace("/buyer/(tabs)");
        }
        // If no tokens, do nothing (show the welcome screen)
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

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
          }}
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

export default Index;

const styles = StyleSheet.create({});