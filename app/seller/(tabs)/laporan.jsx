import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg from "react-native-svg";
import {
  VictoryChart,
  VictoryBar,
  VictoryLabel,
} from "victory-native";
import COLORS from "../../constants/color";

const laporan = () => {
  const [selected, setSelected] = useState("rantangan");
  return (
    <SafeAreaView>
      <View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={styles.title}>Laporan</Text>
        </View>

        {/* Selector */}
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              {
                backgroundColor:
                  selected === "rantangan" ? COLORS.PRIMARY : "white",
              },
            ]}
            onPress={() => setSelected("rantangan")}
          >
            <Text
              style={{
                color: selected === "rantangan" ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Rantangan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              {
                backgroundColor:
                  selected === "catering" ? COLORS.PRIMARY : "white",
              },
            ]}
            onPress={() => setSelected("catering")}
          >
            <Text
              style={{
                color: selected === "catering" ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Catering
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default laporan;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  selectorContainer: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: 20,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  selectorButton: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: "start",
    padding: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    width: "48%",
    padding: 20,
    borderRadius: 20,
  },
  cardNumber: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
  cardLabel: {
    fontSize: 20,
    color: "white",
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
