import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitleBackLocation from "../components/HeaderTitleBackLocation";
import COLORS from "../constants/color";
import storeIcon from "../../assets/images/store.png";

const CateringList = () => {
  const StoreList = ({ StoreName, Rating, Distance, Logo }) => {
    return (
      <TouchableOpacity style={styles.storeItem}>
        <Image source={Logo} style={{ width: 89, height: 89 }} />
        <Text style={{ fontSize: 16, textAlign: "center" }}>{StoreName}</Text>
        <View style={styles.storeInfo}>
          <Text style={styles.rating}>⭐ {Rating}</Text>
          <Text style={styles.distance}>{Distance} km</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const stores = [
    {
      id: 1,
      StoreName: "Rantangan Bu Sri - Kesawangan",
      Logo: storeIcon,
      Rating: "4.5",
      Distance: "10",
    },
    {
      id: 2,
      StoreName: "Rantangan Bu Sri - Kesawangan",
      Logo: storeIcon,
      Rating: "4.5",
      Distance: "10",
    },
    {
      id: 3,
      StoreName: "Rantangan Bu Sri - Kesawangan",
      Logo: storeIcon,
      Rating: "4.5",
      Distance: "10",
    },
    {
      id: 4,
      StoreName: "Rantangan Bu Sri - Kesawangan",
      Logo: storeIcon,
      Rating: "4.5",
      Distance: "10",
    },
    {
      id: 5,
      StoreName: "Rantangan Bu Sri - Kesawangan",
      Logo: storeIcon,
      Rating: "4.5",
      Distance: "10",
    },
    {
      id: 6,
      StoreName: "Rantangan Bu Sri - Kesawangan",
      Logo: storeIcon,
      Rating: "4.5",
      Distance: "10",
    },
  ];

  return (
    <SafeAreaView>
      <HeaderTitleBackLocation title="Catering" />

      <View style={{ padding: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: COLORS.BACKGROUNDDARKER,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "white",
          }}
          placeholder="Temukan Catering ..."
        />
      </View>

      <View style={styles.storeGrid}>
        {stores.map((store) => (
          <StoreList
            key={store.id}
            StoreName={store.StoreName}
            Logo={store.Logo}
            Rating={store.Rating}
            Distance={store.Distance}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CateringList;

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    header: {
      backgroundColor: COLORS.PRIMARY,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    bannerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
    },
    bannerImage: {
      width: "90%",
      aspectRatio: 16 / 9,
      resizeMode: "contain",
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginTop: 10,
    },
    searchInput: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: COLORS.TEXTSECONDARY,
      width: "100%",
    },
    categories: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
      marginVertical: 20,
      paddingHorizontal: 20,
    },
    storeSection: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 16,
      marginBottom: 10,
    },
    divider: {
      height: 1,
      width: "100%",
      backgroundColor: COLORS.TEXTSECONDARY,
      marginBottom: 10,
    },
    storeGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    storeItem: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: "center",
      width: "48%",
    },
    storeInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 5,
    },
    rating: {
      fontSize: 14,
      color: COLORS.GRAY,
    },
    distance: {
      fontSize: 14,
      color: COLORS.GRAY,
    },
  });
