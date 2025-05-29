import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitleBack from "../components/HeaderTitleBack";
import pelanggan from "../../assets/images/pelanggan.png";

const pelangganDetails = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <HeaderTitleBack title="Nama Pelanggan" />

      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.contentRow}>
          <Image
            source={pelanggan}
            alt="pelanggan"
            style={styles.profileImage}
          />

          <View style={styles.textContainer}>
            <Text style={styles.name}>Nama Pelanggan</Text>
            <View style={styles.detailsTextContainer}>
              <Text style={styles.detailsText}>Layanan: Rantangan</Text>
              <Text style={styles.detailsText}>Periode: 1 Bulan</Text>
              <Text style={styles.detailsText}>
                Harga: Rp 600.000/Bulan
              </Text>
            </View>
          </View>
        </View>

        {/* Medical History Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Riwayat Medis / Aturan Makan</Text>
          <Text style={styles.medicalHistoryText}>
            Tolong hindari gula atau pemanis tambahan di semua makanan/minuman. Nasi merahnya jangan terlalu
            banyak, porsi kecil aja. Kalau bisa, ayamnya dipanggang tanpa bumbu
            manis.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.acceptButton]}>
            <Text style={styles.buttonText}>Terima</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.rejectButton]}>
            <Text style={styles.buttonText}>Tolak</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default pelangganDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#333',
  },
  detailsTextContainer: {
    flex: 1,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 5,
    flexWrap: "wrap",
    color: '#555',
  },
  sectionContainer: {
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  medicalHistoryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto', // Pushes buttons to bottom
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});