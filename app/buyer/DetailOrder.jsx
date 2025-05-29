import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderTitleBack from "../components/HeaderTitleBack";
import starYellow from "../../assets/images/starYellow.png";
import starGrey from "../../assets/images/starGrey.png";
import store from "../../assets/images/store.png";

const DetailOrder = () => {
  const [rating, setRating] = useState(4);
  const [maxRating, setMaxRating] = useState(5); // Maximum number of stars

  return (
    <SafeAreaView>
      <HeaderTitleBack title="Detail Order" />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20 }}>Bagaimana makanan mu?</Text>
        <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
          {[...Array(maxRating)].map((_, index) => {
            // index starts from 0, but rating starts from 1
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => setRating(index + 1)}
              >
                <Image
                  source={index < rating ? starYellow : starGrey}
                  style={{ width: 48, height: 48 }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={store} style={{ width: 100, height: 100 }} />
          <View style={{ flexDirection: "column", gap: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Rantangan Bu Sri - Kesawangan
            </Text>
            <Text style={{ fontSize: 16 }}>Order ID : AB123456</Text>
            <Text style={{ fontSize: 16 }}>10 Januari 2025, 09:00</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Detail Pembelian
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Rantangan Paket A</Text>
          <Text style={{ fontSize: 16 }}>Rp. 50.000</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Rantangan Paket A</Text>
          <Text style={{ fontSize: 16 }}>Rp. 50.000</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({});
