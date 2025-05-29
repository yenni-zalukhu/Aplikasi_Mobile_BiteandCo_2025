import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import { ArrowLeft2 } from "iconsax-react-native";
import COLORS from "../constants/color";
import { useRouter } from "expo-router";
import { Location } from "iconsax-react-native";

const HeaderTitleBackLocation = ({ title, textColor = "black" }) => {
  const route = useRouter();
  const handleBack = () => {
    route.back();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        padding : 20,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          backgroundColor: COLORS.BACKGROUND,
          borderRadius: 99,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 20,
        }}
        onPress={handleBack}
      >
        <ArrowLeft2 style={{ color: COLORS.TEXT }} size={20} />
      </TouchableOpacity>
      <View
        style={{ height: 20, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: textColor }}>{title}</Text>
      </View>
      <View style={{ position: "absolute", right: 20, top: 10 }}>
      <TouchableOpacity 
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: COLORS.BACKGROUNDDARKER,
          borderRadius: 99,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          }}>
          <Location style={{ color: COLORS.TEXT }} size={20} />
          <Text>Rumah</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default HeaderTitleBackLocation;

const styles = StyleSheet.create({});
