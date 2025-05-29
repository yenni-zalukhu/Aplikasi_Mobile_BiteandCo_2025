import { Image, Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/color";
import banner1 from "../../../assets/images/banner1.png";
import recycle from "../../../assets/images/recycle.png";
import storeIcon from "../../../assets/images/store.png";
import { useRouter } from "expo-router";

const CircleButton = ({ icon, onPress, text }) => {
  const router = useRouter();
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {router.push("buyer/CateringList")}}
        style={{
          backgroundColor: COLORS.PRIMARY,
          padding: 10,
          borderRadius: 99,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={icon} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          marginTop: 5,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const StoreList = ({ StoreName, Rating, Distance, Logo }) => {
  return (
    <TouchableOpacity style={styles.storeItem}>
      <Image source={Logo} style={{ width: 89, height: 89 }} />
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        {StoreName}
      </Text>
      <View style={styles.storeInfo}>
        <Text style={styles.rating}>⭐ {Rating}</Text>
        <Text style={styles.distance}>{Distance} km</Text>
      </View>
    </TouchableOpacity>
  );
};

const ExpandableMenu = () => {
  const stores = [
    { id: 1, StoreName: "Rantangan Bu Sri - Kesawangan", Logo: storeIcon, Rating: "4.5", Distance: "10" },
    { id: 2, StoreName: "Rantangan Bu Sri - Kesawangan", Logo: storeIcon, Rating: "4.5", Distance: "10" },
    { id: 3, StoreName: "Rantangan Bu Sri - Kesawangan", Logo: storeIcon, Rating: "4.5", Distance: "10" },
    { id: 4, StoreName: "Rantangan Bu Sri - Kesawangan", Logo: storeIcon, Rating: "4.5", Distance: "10" },
    { id: 5, StoreName: "Rantangan Bu Sri - Kesawangan", Logo: storeIcon, Rating: "4.5", Distance: "10" },
    { id: 6, StoreName: "Rantangan Bu Sri - Kesawangan", Logo: storeIcon, Rating: "4.5", Distance: "10" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.bannerContainer}>
          <Image
            source={banner1}
            style={styles.bannerImage}
          />
        </View>
      </SafeAreaView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Mau mam apa hari ini?"
        />
      </View>

      <View style={styles.categories}>
        <CircleButton icon={recycle} text={"Catering"} />
        <CircleButton icon={recycle} text={"Rantangan"} />
        <CircleButton icon={recycle} text={"Gizi Pro"} />
        <CircleButton icon={recycle} text={"Food Waste"} />
      </View>

      <View style={styles.storeSection}>
        <Text style={styles.sectionTitle}>Rekomendasi Rantangan</Text>
        <View style={styles.divider} />
        
        <View style={styles.storeGrid}>
          {stores.map(store => (
            <StoreList
              key={store.id}
              StoreName={store.StoreName}
              Logo={store.Logo}
              Rating={store.Rating}
              Distance={store.Distance}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

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

export default ExpandableMenu;