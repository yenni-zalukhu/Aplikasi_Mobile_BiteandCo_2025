import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Dimensions,
  Platform,
  LayoutAnimation,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import HeaderTitleBack from "../../components/HeaderTitleBack";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/color";
import notif from "../../../assets/images/notif.png";
import pin from "../../../assets/images/pin.png";
import pelanggan from "../../../assets/images/pelanggan.png";
import menu from "../../../assets/images/menu.png";
import jadwal from "../../../assets/images/jadwal.png";
import laporan from "../../../assets/images/laporanmenu.png";
import riwayat from "../../../assets/images/riwayat.png";
import gizi from "../../../assets/images/gizipro.png";
import biteeco from "../../../assets/images/biteeco.png";
import ulasan from "../../../assets/images/ulasan.png";
import bantuan from "../../../assets/images/bantuan.png";
import { useRouter } from "expo-router";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MenuItem = ({ icon, label }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        width: "22%",
        marginVertical: 10,
      }}
      onPress={() => {
        label === "Pelanggan" ? router.push("seller/pelanggan") : null;
        label === "Menu" ? router.push("seller/menu") : null;
        label === "Jadwal" ? router.push("seller/JadwalPengantaran") : null;
        label === "";
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 99,
          width: 45,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={icon} style={{ width: 24, height: 24 }} />
      </View>
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 14,
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const MenuSection = ({ expanded }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingHorizontal: 10,
      }}
    >
      <MenuItem icon={riwayat} label="Riwayat" />
      <MenuItem icon={gizi} label="GiziPro" />
      <MenuItem icon={biteeco} label="Bite Eco" />
      <MenuItem icon={ulasan} label="Ulasan" />
    </View>
  );
};

const ExpandableMenu = () => {
  const [expanded, setExpanded] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.PRIMARY,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <SafeAreaView>
          {/* Header Section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Profile Name
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Image source={notif} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>

          {/* Restaurant Info */}
          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 20,
              marginHorizontal: 20,
              padding: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Rumah Rasa
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Image
                source={pin}
                style={{ width: 16, height: 16, tintColor: "white" }}
              />
              <Text style={{ color: "white", fontSize: 14, marginLeft: 8 }}>
                Jl. Sutomo Medan No 12
              </Text>
            </View>
          </View>

          {/* Main Menu */}
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                paddingHorizontal: 10,
              }}
            >
              <MenuItem icon={pelanggan} label="Pelanggan" />
              <MenuItem icon={menu} label="Menu" />
              <MenuItem icon={jadwal} label="Jadwal" />
              <MenuItem icon={laporan} label="Laporan" />
            </View>

            {/* Expandable Section */}
            {expanded && <MenuSection />}
          </View>
        </SafeAreaView>
        {/* Expand Button */}
        <TouchableOpacity
          onPress={toggleExpand}
          style={{
            alignSelf: "center",
            padding: 8,
            marginTop: -30,
          }}
        >
          <Animated.View style={{ transform: [{ rotate }] }}>
            <View
              style={{
                width: 100,
                height: 5,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#D9D9D9",
            height: 141,
            paddingHorizontal: 10,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 30
              }}
            >
              <Text>Berlangganan</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold"}}>35</Text>
            </View>
            <View style={{ backgroundColor: "#D9D9D9", width: 1, height: "100%"}} />
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text>Pendapatan Bulan Ini</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold"}}>Rp 1.500.000</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ExpandableMenu;
