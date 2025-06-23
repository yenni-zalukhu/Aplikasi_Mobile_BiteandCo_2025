import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import COLORS from '../constants/color';
import HeaderTitleBack from '../components/HeaderTitleBack';
import { useToast } from '../components/ToastProvider';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(113, 19, 48, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: COLORS.PRIMARY,
  },
};

const MetricCard = ({ title, value, subtitle, icon, color = COLORS.PRIMARY, onPress }) => (
  <TouchableOpacity style={[styles.metricCard, { borderLeftColor: color }]} onPress={onPress}>
    <View style={styles.metricContent}>
      <View style={styles.metricText}>
        <Text style={styles.metricTitle}>{title}</Text>
        <Text style={[styles.metricValue, { color }]}>{value}</Text>
        {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
      </View>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
    </View>
  </TouchableOpacity>
);

const ChartCard = ({ title, children, onRefresh }) => (
  <View style={styles.chartCard}>
    <View style={styles.chartHeader}>
      <Text style={styles.chartTitle}>{title}</Text>
      {onRefresh && (
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <MaterialIcons name="refresh" size={20} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      )}
    </View>
    {children}
  </View>
);

const AnalyticsDashboard = () => {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d
  
  // Analytics data state
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    activeUsers: 0,
    errorRate: 0,
    avgResponseTime: 0,
    crashRate: 0,
    userRetention: 0,
  });
  
  const [orderTrends, setOrderTrends] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  
  const [performanceData, setPerformanceData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  
  const [errorDistribution, setErrorDistribution] = useState([]);
  
  const [userEngagement, setUserEngagement] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  // Load analytics data
  const loadAnalyticsData = useCallback(async (showLoader = true) => {
    const startTime = performance.now();
    
    if (showLoader) setLoading(true);
    setRefreshing(!showLoader);

    try {
      // Load cached analytics data
      const cachedData = await AsyncStorage.getItem('analyticsData');
      let analyticsData = cachedData ? JSON.parse(cachedData) : null;
      
      // Generate mock data for demonstration (replace with real API calls)
      if (!analyticsData || Date.now() - analyticsData.timestamp > 300000) { // 5 minutes cache
        analyticsData = await generateMockAnalyticsData();
        await AsyncStorage.setItem('analyticsData', JSON.stringify({
          ...analyticsData,
          timestamp: Date.now(),
        }));
      }
      
      // Update metrics (removed performanceStats dependency)
      setMetrics({
        totalOrders: analyticsData.totalOrders,
        totalRevenue: analyticsData.totalRevenue,
        avgOrderValue: analyticsData.totalRevenue / Math.max(analyticsData.totalOrders, 1),
        activeUsers: analyticsData.activeUsers,
        errorRate: 0, // Default value since performanceStats is removed
        avgResponseTime: Math.floor(Math.random() * 200) + 100, // Mock value
        crashRate: 0, // Default value since performanceStats is removed
        userRetention: analyticsData.userRetention,
      });
      
      // Update charts data
      setOrderTrends(analyticsData.orderTrends);
      setPerformanceData(analyticsData.performanceData);
      setErrorDistribution(analyticsData.errorDistribution);
      setUserEngagement(analyticsData.userEngagement);
      
    } catch (error) {
      console.error('Error loading analytics data:', error);
      showToast('Gagal memuat data analytics', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [timeRange, showToast]);

  // Generate mock analytics data
  const generateMockAnalyticsData = async () => {
    const now = new Date();
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    
    const labels = [];
    const orderData = [];
    const performanceData = [];
    const engagementData = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' }));
      
      // Mock order data with some variation
      orderData.push(Math.floor(Math.random() * 50) + 20);
      
      // Mock performance data (response times in ms)
      performanceData.push(Math.floor(Math.random() * 200) + 100);
      
      // Mock engagement data (session duration in minutes)
      engagementData.push(Math.floor(Math.random() * 30) + 10);
    }
    
    return {
      totalOrders: orderData.reduce((sum, val) => sum + val, 0),
      totalRevenue: orderData.reduce((sum, val) => sum + val * (Math.random() * 50000 + 25000), 0),
      activeUsers: Math.floor(Math.random() * 1000) + 500,
      userRetention: Math.floor(Math.random() * 30) + 60,
      orderTrends: {
        labels,
        datasets: [{ data: orderData }],
      },
      performanceData: {
        labels,
        datasets: [{ data: performanceData }],
      },
      userEngagement: {
        labels,
        datasets: [{ data: engagementData }],
      },
      errorDistribution: [
        {
          name: 'Network',
          population: Math.floor(Math.random() * 15) + 5,
          color: '#ff6b6b',
          legendFontColor: '#333',
          legendFontSize: 12,
        },
        {
          name: 'Authentication',
          population: Math.floor(Math.random() * 10) + 2,
          color: '#4ecdc4',
          legendFontColor: '#333',
          legendFontSize: 12,
        },
        {
          name: 'Validation',
          population: Math.floor(Math.random() * 8) + 1,
          color: '#45b7d1',
          legendFontColor: '#333',
          legendFontSize: 12,
        },
        {
          name: 'Server',
          population: Math.floor(Math.random() * 5) + 1,
          color: '#f9ca24',
          legendFontColor: '#333',
          legendFontSize: 12,
        },
      ],
    };
  };

  // Handle refresh
  const handleRefresh = useCallback(() => {
    loadAnalyticsData(false);
  }, [loadAnalyticsData]);

  // Load data on component mount
  useFocusEffect(
    useCallback(() => {
      loadAnalyticsData();
    }, [loadAnalyticsData])
  );

  // Time range buttons
  const TimeRangeSelector = () => (
    <View style={styles.timeRangeSelector}>
      {['7d', '30d', '90d'].map((range) => (
        <TouchableOpacity
          key={range}
          style={[
            styles.timeRangeButton,
            timeRange === range && styles.timeRangeButtonActive,
          ]}
          onPress={() => setTimeRange(range)}
        >
          <Text
            style={[
              styles.timeRangeText,
              timeRange === range && styles.timeRangeTextActive,
            ]}
          >
            {range.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderTitleBack title="Analytics Dashboard" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text style={styles.loadingText}>Memuat data analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitleBack title="Analytics Dashboard" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <TimeRangeSelector />
        
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Total Pesanan"
            value={metrics.totalOrders.toLocaleString()}
            subtitle={`${timeRange.toUpperCase()}`}
            icon="shopping-cart"
            color="#4CAF50"
          />
          <MetricCard
            title="Total Pendapatan"
            value={`Rp ${(metrics.totalRevenue / 1000000).toFixed(1)}M`}
            subtitle={`${timeRange.toUpperCase()}`}
            icon="attach-money"
            color="#2196F3"
          />
          <MetricCard
            title="Nilai Rata-rata"
            value={`Rp ${(metrics.avgOrderValue / 1000).toFixed(0)}K`}
            subtitle="Per pesanan"
            icon="trending-up"
            color="#FF9800"
          />
          <MetricCard
            title="Pengguna Aktif"
            value={metrics.activeUsers.toLocaleString()}
            subtitle="Pengguna unik"
            icon="people"
            color="#9C27B0"
          />
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Error Rate"
            value={`${metrics.errorRate.toFixed(1)}%`}
            subtitle="Tingkat kesalahan"
            icon="error-outline"
            color={metrics.errorRate > 5 ? "#F44336" : "#4CAF50"}
          />
          <MetricCard
            title="Waktu Respon"
            value={`${metrics.avgResponseTime.toFixed(0)}ms`}
            subtitle="Rata-rata API"
            icon="speed"
            color={metrics.avgResponseTime > 1000 ? "#F44336" : "#4CAF50"}
          />
          <MetricCard
            title="Crash Rate"
            value={metrics.crashRate.toString()}
            subtitle="Total crash"
            icon="warning"
            color={metrics.crashRate > 0 ? "#F44336" : "#4CAF50"}
          />
          <MetricCard
            title="Retensi User"
            value={`${metrics.userRetention.toFixed(0)}%`}
            subtitle="30 hari"
            icon="refresh"
            color="#607D8B"
          />
        </View>

        {/* Order Trends Chart */}
        <ChartCard title="Tren Pesanan" onRefresh={handleRefresh}>
          {orderTrends.datasets[0].data.length > 0 ? (
            <LineChart
              data={orderTrends}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>Tidak ada data tersedia</Text>
          )}
        </ChartCard>

        {/* Performance Chart */}
        <ChartCard title="Performa Aplikasi (ms)" onRefresh={handleRefresh}>
          {performanceData.datasets[0].data.length > 0 ? (
            <BarChart
              data={performanceData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>Tidak ada data tersedia</Text>
          )}
        </ChartCard>

        {/* Error Distribution */}
        <ChartCard title="Distribusi Error" onRefresh={handleRefresh}>
          {errorDistribution.length > 0 ? (
            <PieChart
              data={errorDistribution}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>Tidak ada error</Text>
          )}
        </ChartCard>

        {/* User Engagement */}
        <ChartCard title="Engagement Pengguna (menit)" onRefresh={handleRefresh}>
          {userEngagement.datasets[0].data.length > 0 ? (
            <LineChart
              data={userEngagement}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>Tidak ada data tersedia</Text>
          )}
        </ChartCard>

        {/* Performance Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Performance Insights</Text>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <FontAwesome5 name="chart-line" size={16} color="#4CAF50" />
              <Text style={styles.insightText}>
                Pesanan meningkat {((Math.random() * 20) + 5).toFixed(1)}% minggu ini
              </Text>
            </View>
            <View style={styles.insightItem}>
              <FontAwesome5 name="clock" size={16} color="#FF9800" />
              <Text style={styles.insightText}>
                Waktu respon rata-rata {metrics.avgResponseTime < 500 ? 'sangat baik' : 'perlu diperbaiki'}
              </Text>
            </View>
            <View style={styles.insightItem}>
              <FontAwesome5 name="users" size={16} color="#2196F3" />
              <Text style={styles.insightText}>
                Retensi pengguna {metrics.userRetention > 70 ? 'tinggi' : 'perlu ditingkatkan'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeRangeButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  timeRangeTextActive: {
    color: '#fff',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricText: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 10,
    color: '#999',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    padding: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    paddingVertical: 40,
  },
  insightsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
});

export default AnalyticsDashboard;
