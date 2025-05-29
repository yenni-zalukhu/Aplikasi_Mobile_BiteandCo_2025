import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitleBack from "../components/HeaderTitleBack";
import utensil from "../../assets/images/utensil.png";
import COLORS from "../constants/color";
import { useRouter } from "expo-router";

const CardStatus = ({ date, total, nameOrder }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        gap: 20,
      }}
    >
      <View>
        <Text>{date}</Text>
        <Image source={utensil} style={{ width: 70, height: 70 }} />
      </View>
      <View style={{ marginTop: 10, flexDirection: "column", flex: 1 }}>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", flexShrink: 1 }}
          numberOfLines={1}
        >
          {nameOrder}
        </Text>
        <Text style={{ fontSize: 14, color: "gray" }}>{total}</Text>
        <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.GREEN4,
              paddingVertical: 5,
              paddingHorizontal: 30,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Lacak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.BLUE2,
              paddingVertical: 5,
              paddingHorizontal: 30,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => { router.push("buyer/DetailOrder")}}
          >
            <Text style={{ color: "white" }}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const StatusOrder = () => {
  return (
    <SafeAreaView>
      <HeaderTitleBack title="Status Order" />
      <CardStatus
        date="12/12/2023"
        total="Rp. 100.000"
        nameOrder="Rantangan Bu Sri - Kesawangan"
      />
    </SafeAreaView>
  );
};

export default StatusOrder;

const styles = StyleSheet.create({});
