import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitleBack from "../components/HeaderTitleBack";
import COLORS from "../constants/color";
import { useRouter } from "expo-router";

const Success = () => {
    const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#711330",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
          marginTop: 20,
        }}
      >
        Selamat!
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          marginTop: 20,
          textAlign: "center",
          paddingHorizontal: 20,
        }}
      >
        Anda telah berhasil mendaftar sebagai penjual di Bite&Co. Silakan tunggu
        konfirmasi dari tim kami. Jika ada pertanyaan, silakan hubungi kami di
        [info@biteandco.com]
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#FFB800",
          paddingVertical: 15,
          borderRadius: 5,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
        onPress={() => {
          // Handle button press
          router.push("/");
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Kembali ke Beranda
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Detail = ({ setScreenNow }) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [showBankModal, setShowBankModal] = useState(false);

  const banks = [
    { id: 1, name: "BCA" },
    { id: 2, name: "Mandiri" },
    { id: 3, name: "BRI" },
    { id: 4, name: "BNI" },
  ];

  return (
    <>
      <HeaderTitleBack title="Detail Usaha" textColor="white" />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: COLORS.TEXT, fontWeight: "bold" }}>
            Nama Outlet
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Masukkan nama outlet"
            placeholderTextColor="gray"
          />
          <Text
            style={{ color: COLORS.TEXT, fontWeight: "bold", marginTop: 10 }}
          >
            Nomor telepon outlet
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Contoh: 081234567890"
            placeholderTextColor="gray"
          />
          <Text
            style={{ color: COLORS.TEXT, fontWeight: "bold", marginTop: 10 }}
          >
            Email outlet
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Contoh: myresto@gmail.com"
            placeholderTextColor="gray"
          />
          <Text
            style={{ color: COLORS.TEXT, fontWeight: "bold", marginTop: 10 }}
          >
            Masukan pajak restoran/PB1 yang berlaku (opsional)
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Contoh: 11"
            placeholderTextColor="gray"
          />

          {/* Bank Selection */}
          <Text
            style={{ color: COLORS.TEXT, fontWeight: "bold", marginTop: 10 }}
          >
            Pilih Bank
          </Text>
          <TouchableOpacity
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
              justifyContent: "center",
            }}
            onPress={() => setShowBankModal(true)}
          >
            <Text style={{ color: selectedBank ? "black" : "gray" }}>
              {selectedBank || "Pilih bank Anda"}
            </Text>
          </TouchableOpacity>

          <Text
            style={{ color: COLORS.TEXT, fontWeight: "bold", marginTop: 10 }}
          >
            Nomor Rekening Bank
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Contoh: 1234567890"
            placeholderTextColor="gray"
          />
        </View>

        {/* Bank Selection Modal */}
        <Modal
          visible={showBankModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowBankModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowBankModal(false)}>
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
          </TouchableWithoutFeedback>

          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {banks.map((bank) => (
              <TouchableOpacity
                key={bank.id}
                style={{
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
                onPress={() => {
                  setSelectedBank(bank.name);
                  setShowBankModal(false);
                }}
              >
                <Text style={{ fontSize: 16 }}>{bank.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <TouchableOpacity
          style={{
            backgroundColor: "#FFB800",
            paddingVertical: 15,
            borderRadius: 5,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            // Handle button press
            setScreenNow("success");
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Lanjut
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Identitas = ({ setScreenNow }) => {
  return (
    <>
      <HeaderTitleBack title="Siapkan Identitas Anda" textColor="white" />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#f7f7f7",
            padding: 15,
            borderRadius: 10,
            width: "100%",
            marginVertical: 20,
            flexDirection: "column",
            gap: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                borderColor: COLORS.TEXTSECONDARY,
                borderWidth: 1,
                borderRadius: 99,
                width: 40,
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                1
              </Text>
            </View>
            <Text>Ambil Foto e-KTP</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                borderColor: COLORS.TEXTSECONDARY,
                borderWidth: 1,
                borderRadius: 99,
                width: 40,
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                2
              </Text>
            </View>
            <Text>Ambil Foto Selfie</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#FFB800",
            paddingVertical: 15,
            borderRadius: 5,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
          onPress={() => {
            setScreenNow("detail");
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Lanjut
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const DetailUsaha = () => {
  const [screenNow, setScreenNow] = useState("identitas");

  return (
    <SafeAreaView style={{ backgroundColor: "#711330", height: "100%" }}>
      {screenNow === "identitas" ? (
        <Identitas setScreenNow={setScreenNow} />
      ) : null}
      {screenNow === "detail" ? <Detail setScreenNow={setScreenNow} /> : null}
      {screenNow === "success" ? <Success /> : null}
    </SafeAreaView>
  );
};

export default DetailUsaha;

const styles = StyleSheet.create({});
