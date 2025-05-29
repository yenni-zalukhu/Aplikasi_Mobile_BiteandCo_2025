import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitleBack from "../components/HeaderTitleBack";
import banner2 from "../../assets/images/banner2.png";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import starSolid from "../../assets/images/starSolid.png";
import COLORS from "../constants/color";
import menuImage from "../../assets/images/menuImage.png";

const ListMenu = () => {
  return (
    <View style={{ backgroundColor: "white", padding: 20, borderRadius: 20, marginHorizontal: 30, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#E5E5E5", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3.84, elevation: 5 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: "bold"}}>Paket Catering A</Text>
        <Text style={{ fontSize: 10 }}>Ayam, nasi, sayur bayem</Text>
        <Text style={{ fontSize: 10 }}>Rp 10.000</Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", gap: 5 }}>
        <Image
          source={menuImage}
          style={{ width: 100, height: 100, borderRadius: 10 }}
          resizeMode="cover"
        />
        <TouchableOpacity style={{ borderWidth: 1, borderColor: "#E5E5E5", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, marginTop: -20, backgroundColor: "white"}}>
          <Text>Tambah</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CateringDetail = () => {
  return (
    <>
      <Image
        source={banner2}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <SafeAreaView style={styles.container}>
        <HeaderTitleBack />
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 30,
            marginVertical: 20,
            paddingHorizontal: 15,
            paddingVertical: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#E5E5E5",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.05,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 14 }}>Catering Bu Susi - Kesawangan</Text>
            <Text style={{ fontSize: 10, paddingTop: 15 }}>
              Rantangan, Catering
            </Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: "#E5E5E5", borderRadius: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.GREEN3,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 2,
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Text style={{color: "white", fontSize: 10}}>4.7</Text>
              <Image
                source={starSolid}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 2,
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Text style={{color: "black", fontSize: 10}}>1K Rating</Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginHorizontal: 30, marginBottom: 10 }}>Promo</Text>
          <ListMenu />
          <ListMenu />
          <ListMenu />
          <ListMenu />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "200",
  },
  container: {
    flex: 1,
    position: "relative", // This ensures SafeAreaView stays on top
  },
});

export default CateringDetail;
