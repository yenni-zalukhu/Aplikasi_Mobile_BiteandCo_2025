import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/color';

const screenWidth = Dimensions.get("window").width;

const StatCard = ({ title, value, percentage, isPositive }) => (
  <View style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <View style={styles.percentageContainer}>
      <Text style={[styles.percentageText, { color: isPositive ? COLORS.GREEN3 : '#dc3545' }]}>
        {isPositive ? '↑' : '↓'} {percentage}%
      </Text>
      <Text style={styles.comparedText}>vs last month</Text>
    </View>
  </View>
);

const SimpleChart = () => {
  const data = [150, 220, 180, 240, 300, 250, 280];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxValue = Math.max(...data);
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Revenue Overview</Text>
      <View style={styles.chart}>
        <View style={styles.chartBars}>
          {data.map((value, index) => (
            <View key={index} style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  { height: (value / maxValue) * 120 }
                ]} 
              />
              <Text style={styles.barLabel}>{labels[index]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartValues}>
          <Text style={styles.chartValue}>300k</Text>
          <Text style={styles.chartValue}>200k</Text>
          <Text style={styles.chartValue}>100k</Text>
          <Text style={styles.chartValue}>0</Text>
        </View>
      </View>
    </View>
  );
};

const Laporan = () => {
  const [timeRange, setTimeRange] = useState("week"); // week, month, year

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Laporan Statistik</Text>
        <View style={styles.timeRangeContainer}>
          <TouchableOpacity
            style={[
              styles.timeRangeButton,
              timeRange === "week" && styles.activeTimeRange,
            ]}
            onPress={() => setTimeRange("week")}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === "week" && styles.activeTimeRangeText,
            ]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeRangeButton,
              timeRange === "month" && styles.activeTimeRange,
            ]}
            onPress={() => setTimeRange("month")}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === "month" && styles.activeTimeRangeText,
            ]}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeRangeButton,
              timeRange === "year" && styles.activeTimeRange,
            ]}
            onPress={() => setTimeRange("year")}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === "year" && styles.activeTimeRangeText,
            ]}>Year</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <SimpleChart />

        <View style={styles.statsGrid}>
          <StatCard
            title="Total Revenue"
            value="Rp 1,620,000"
            percentage="12.5"
            isPositive={true}
          />
          <StatCard
            title="Total Orders"
            value="48"
            percentage="8.3"
            isPositive={true}
          />
          <StatCard
            title="Average Order"
            value="Rp 33,750"
            percentage="2.1"
            isPositive={false}
          />
          <StatCard
            title="New Customers"
            value="15"
            percentage="15.8"
            isPositive={true}
          />
        </View>

        <View style={styles.topItemsContainer}>
          <Text style={styles.sectionTitle}>Top Items</Text>
          {[
            { name: "Nasi Rendang", orders: 12, revenue: "Rp 420,000" },
            { name: "Nasi Ayam", orders: 10, revenue: "Rp 350,000" },
            { name: "Nasi Ikan", orders: 8, revenue: "Rp 280,000" },
          ].map((item, index) => (
            <View key={index} style={styles.topItemRow}>
              <View style={styles.topItemLeft}>
                <Text style={styles.itemRank}>#{index + 1}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View style={styles.topItemRight}>
                <Text style={styles.itemOrders}>{item.orders} orders</Text>
                <Text style={styles.itemRevenue}>{item.revenue}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Laporan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  timeRangeContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTimeRange: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timeRangeText: {
    fontSize: 14,
    color: "#666",
  },
  activeTimeRangeText: {
    color: COLORS.GREEN3,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    height: 160,
    alignItems: "flex-end",
  },
  chartBars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 140,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    backgroundColor: COLORS.GREEN3,
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: "#666",
  },
  chartValues: {
    justifyContent: "space-between",
    height: 140,
    paddingLeft: 8,
  },
  chartValue: {
    fontSize: 12,
    color: "#666",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 16,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  comparedText: {
    fontSize: 12,
    color: "#666",
  },
  topItemsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  topItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  topItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemRank: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.GREEN3,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
  },
  topItemRight: {
    alignItems: "flex-end",
  },
  itemOrders: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  itemRevenue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.GREEN3,
  },
});
