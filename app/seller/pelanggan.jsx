import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitleBack from "../components/HeaderTitleBack";
import profileBlack from "../../assets/images/profile-black.png";
import { useRouter } from "expo-router";

const Card = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => { router.push("seller/pelangganDetails")}}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10,
          gap: 10,
          flex: 1,
        }}
      >
        <Image
          source={profileBlack}
          style={{ width: 50, height: 50, borderRadius: 20 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Nama Pelanggan
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            Layanan : Rantangan
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>Periode : 1 Bulan</Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666",
              flexWrap: "wrap",
              flexShrink: 1,
            }}
          >
            Custom : Saya diabetes tolong di hindari gula
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const pelanggan = () => {
  return (
    <SafeAreaView>
      <HeaderTitleBack title="Pelanggan" />
      <View
        style={{
          padding: 20,
        }}
      >
        <Card />
      </View>
    </SafeAreaView>
  );
};

export default pelanggan;

const styles = StyleSheet.create({});
