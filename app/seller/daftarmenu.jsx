import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight2, ArrowLeft2 } from "iconsax-react-native";
import COLORS from "../constants/color";
import { useRouter } from "expo-router";

const HeaderTitleBackCustom = ({
  title,
  textColor = "black",
  state = "kategori",
  setState,
}) => {
  const route = useRouter();
  const handleBack = () => {
    if (state === "kategori") {
      route.back();
    }
    if (state === "menu") {
      setState("kategori");
    }
    if (state === "tambahMenu") {
      setState("menu");
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        padding: 20,
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
          top: 20,
          left: 20,
        }}
        onPress={handleBack}
      >
        <ArrowLeft2 style={{ color: COLORS.TEXT }} size={20} />
      </TouchableOpacity>
      <View
        style={{ height: 50, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: textColor }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const Dropdown = ({ selectedOption, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const options = ["Rantangan", "Catering"];

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(0);
    }
  }, [visible]);

  const handleSelect = (option) => {
    onSelect(option);
    closeModal();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.GREEN3,
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderRadius: 99,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
          {selectedOption}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible}
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.bottomModalContent, { transform: [{ translateY }] }]}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                selectedOption === option && styles.selectedOption,
              ]}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Modal>
    </View>
  );
};

const ScreenTambahMenu = ({ state, setState }) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;

    // Logic to add the new category
    setNewCategoryName("");
    setShowAddCategoryModal(false);
  };

  return (
    <SafeAreaView>
      <HeaderTitleBackCustom
        title="Tambah Menu"
        state={state}
        setState={setState}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Detail menu
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Foto
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Upload foto mu biar pelanggan lebih tertarik
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 20,
            borderColor: COLORS.TEXTSECONDARY,
            width: 100,
            height: 100,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: COLORS.GREEN3,
              borderRadius: 99,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
              }}
            >
              +
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Nama
        </Text>
        <View>
          <TextInput style={styles.input} placeholder="Cth: Puding" />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Deskripsi
        </Text>
        <View>
          <TextInput
            multiline
            numberOfLines={4} // Sets minimum number of lines (Android)
            height={100}
            style={styles.input}
            // onChangeText={(text) => setValue(text)}
            placeholder="Type your multiline text here..."
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Harga
        </Text>
        <View>
          <TextInput style={styles.input} placeholder="Cth: 10000" />
        </View>
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: COLORS.GREEN3,
            paddingVertical: 10,
            borderRadius: 12,
            alignItems: "center",
          }}
          onPress={() => {
            // Logic to save the menu
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Simpan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const DaftarKetegori = ({ nama, amount, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{nama}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View
          style={{
            backgroundColor: COLORS.GREEN3,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 99,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {amount}
          </Text>
        </View>
        <ArrowRight2 size="36" color="black" />
      </View>
    </TouchableOpacity>
  );
};

const MenuItem = ({ item }) => {
  return (
    <View style={styles.menuItemContainer}>
      <Text style={styles.menuItemName}>{item.name}</Text>
      <Text style={styles.menuItemDescription}>{item.deskripsi}</Text>
      <Text style={styles.menuItemPrice}>{item.harga}</Text>
    </View>
  );
};

const ScreenKategori = ({
  KategoriList,
  setKategoriList,
  setSelectedCategory,
  state,
  setState,
}) => {
  const [selectedOption, setSelectedOption] = useState("Rantangan");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;

    const newCategory = {
      id: KategoriList.length + 1,
      name: newCategoryName,
      items: [],
    };

    setKategoriList([...KategoriList, newCategory]);
    setNewCategoryName("");
    setShowAddCategoryModal(false);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setState("menu");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View>
        <HeaderTitleBackCustom title="Menu" state={state} setState={setState} />
        <Dropdown
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />
        {KategoriList.map((item) => (
          <DaftarKetegori
            key={item.id}
            nama={item.name}
            amount={item.items.length}
            onPress={() => handleCategoryPress(item)}
          />
        ))}
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: COLORS.GREEN3,
            borderRadius: 99,
            width: "90%",
            alignItems: "center",
          }}
          onPress={() => setShowAddCategoryModal(true)}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Tambah Kategori
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Category Modal */}
      <Modal
        transparent={true}
        visible={showAddCategoryModal}
        animationType="fade"
        onRequestClose={() => setShowAddCategoryModal(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setShowAddCategoryModal(false)}
        >
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.centerModalContent}>
          <Text style={styles.modalTitle}>Tambah Kategori Baru</Text>

          <TextInput
            style={styles.input}
            placeholder="Nama Kategori"
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            autoFocus={true}
          />

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowAddCategoryModal(false)}
            >
              <Text style={styles.buttonText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.addButton]}
              onPress={handleAddCategory}
            >
              <Text style={styles.buttonText}>Tambah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const ScreenMenu = ({ selectedCategory, state, setState }) => {
  const [selectedOption, setSelectedOption] = useState("Rantangan");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1 }}>
        <HeaderTitleBackCustom
          title={selectedCategory.name}
          state={state}
          setState={setState}
          onBackPress={() => setState("kategori")}
        />
        <FlatList
          data={selectedCategory.items}
          renderItem={({ item }) => <MenuItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.menuList}
        />
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: COLORS.GREEN3,
            borderRadius: 99,
            width: "90%",
            alignItems: "center",
          }}
          onPress={() => setState("tambahMenu")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Tambah Menu
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Daftarmenu = () => {
  const [state, setState] = useState("kategori");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [KategoriList, setKategoriList] = useState([
    {
      id: 1,
      name: "Paket Nasi",
      items: [
        {
          id: 1,
          name: "Nasi Putih",
          deskripsi: "Nasi putih polos tanpa lauk",
          harga: "Rp 10.000",
        },
        {
          id: 2,
          name: "Nasi Goreng",
          deskripsi: "Nasi goreng dengan bumbu spesial",
          harga: "Rp 12.000",
        },
        {
          id: 3,
          name: "Nasi Kuning",
          deskripsi: "Nasi kuning dengan bumbu rempah",
          harga: "Rp 15.000",
        },
      ],
    },
    {
      id: 2,
      name: "Paket Lauk",
      items: [
        {
          id: 1,
          name: "Ayam Goreng",
          deskripsi: "Ayam goreng crispy dengan sambal",
          harga: "Rp 20.000",
        },
        {
          id: 2,
          name: "Ikan Bakar",
          deskripsi: "Ikan bakar dengan bumbu khas",
          harga: "Rp 25.000",
        },
        {
          id: 3,
          name: "Tahu Tempe",
          deskripsi: "Tahu dan tempe goreng crispy",
          harga: "Rp 15.000",
        },
      ],
    },
    {
      id: 3,
      name: "Paket Sayur",
      items: [
        {
          id: 1,
          name: "Sayur Asem",
          deskripsi: "Sayur asem segar dan pedas",
          harga: "Rp 10.000",
        },
        {
          id: 2,
          name: "Capcay",
          deskripsi: "Capcay sayuran dengan saus tiram",
          harga: "Rp 12.000",
        },
        {
          id: 3,
          name: "Urap Sayur",
          deskripsi: "Sayur urap dengan kelapa parut",
          harga: "Rp 15.000",
        },
      ],
    },
  ]);

  return (
    <>
      {state === "kategori" ? (
        <ScreenKategori
          KategoriList={KategoriList}
          setKategoriList={setKategoriList}
          setSelectedCategory={setSelectedCategory}
          setState={setState}
          state={state}
        />
      ) : null}
      {state === "menu" ? (
        <ScreenMenu
          selectedCategory={selectedCategory}
          setState={setState}
          state={state}
        />
      ) : null}
      {state === "tambahMenu" ? (
        <ScreenTambahMenu state={state} setState={setState} />
      ) : null}
    </>
  );
};

export default Daftarmenu;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomModalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centerModalContent: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedOption: {
    backgroundColor: COLORS.GREEN3,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  addButton: {
    backgroundColor: COLORS.GREEN3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  menuItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.GREEN3,
  },
  menuList: {
    paddingBottom: 20,
  },
});
