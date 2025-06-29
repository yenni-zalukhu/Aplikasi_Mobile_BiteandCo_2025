import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderTitleBack from '../components/HeaderTitleBack';
import COLORS from '../constants/color';
import config from '../constants/config';

const screenWidth = Dimensions.get('window').width;

const StatCard = ({ title, value, percentage, isPositive, loading }) => (
  <View style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    {loading ? (
      <ActivityIndicator size="small" color={COLORS.PRIMARY} />
    ) : (
      <>
        <Text style={styles.statValue}>{value}</Text>
        {percentage !== null && (
          <View style={styles.percentageContainer}>
            <Text style={[styles.percentageText, { color: isPositive ? COLORS.GREEN3 : '#dc3545' }]}>
              {isPositive ? '↑' : '↓'} {percentage}%
            </Text>
            <Text style={styles.comparedText}>vs last period</Text>
          </View>
        )}
      </>
    )}
  </View>
);

const SimpleChart = ({ data, labels, loading }) => {
  if (loading) {
    return (
      <View style={[styles.chartContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Loading chart data...</Text>
      </View>
    );
  }

  const maxValue = Math.max(...data, 1); // Ensure we don't divide by 0
  
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
                  { height: Math.max((value / maxValue) * 120, 2) }
                ]} 
              />
              <Text style={styles.barLabel}>{labels[index]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartValues}>
          <Text style={styles.chartValue}>{formatCurrency(maxValue)}</Text>
          <Text style={styles.chartValue}>{formatCurrency(maxValue * 0.75)}</Text>
          <Text style={styles.chartValue}>{formatCurrency(maxValue * 0.5)}</Text>
          <Text style={styles.chartValue}>{formatCurrency(maxValue * 0.25)}</Text>
          <Text style={styles.chartValue}>0</Text>
        </View>
      </View>
    </View>
  );
};

const formatCurrency = (amount) => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
};

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const Laporan = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reportData, setReportData] = useState({
    revenue: { current: 0, previous: 0 },
    orders: { current: 0, previous: 0 },
    averageOrder: { current: 0, previous: 0 },
    customers: { current: 0, previous: 0 },
    chartData: [],
    chartLabels: [],
    topItems: [],
  });

  useEffect(() => {
    fetchReportData();
  }, [timeRange]);

  const fetchReportData = async () => {
    try {
      if (!refreshing) setLoading(true);
      
      const token = await AsyncStorage.getItem('sellerToken');
      if (!token) {
        Alert.alert('Error', 'Please login first');
        return;
      }

      // Get seller ID from token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const sellerId = payload.sellerId;

      const [ordersResponse, menuResponse] = await Promise.all([
        fetch(`${config.API_URL}/seller/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(`${config.API_URL}/seller/menu`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
      ]);

      if (!ordersResponse.ok || !menuResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const ordersData = await ordersResponse.json();
      const menuData = await menuResponse.json();

      // Process the data based on time range
      const processedData = processReportData(ordersData.orders || [], menuData.menu || [], timeRange);
      setReportData(processedData);

    } catch (error) {
      console.error('Error fetching report data:', error);
      Alert.alert('Error', 'Failed to load report data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const processReportData = (orders, menuItems, period) => {
    const now = new Date();
    let startDate, endDate, previousStartDate, previousEndDate, labels;

    // Define date ranges based on period
    switch (period) {
      case 'week':
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        startDate = new Date(weekStart.setHours(0, 0, 0, 0));
        endDate = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
        endDate.setHours(23, 59, 59, 999);
        
        previousEndDate = new Date(startDate.getTime() - 1);
        previousStartDate = new Date(previousEndDate.getTime() - 6 * 24 * 60 * 60 * 1000);
        
        labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        break;
        
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        previousEndDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
        
        // Get weeks in month
        labels = [];
        const weeksInMonth = Math.ceil((endDate.getDate() + startDate.getDay()) / 7);
        for (let i = 1; i <= weeksInMonth; i++) {
          labels.push(`W${i}`);
        }
        break;
        
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        previousEndDate = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
        
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        break;
    }

    // Filter orders for current and previous periods
    const currentOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt || order.orderDate);
      return orderDate >= startDate && orderDate <= endDate && order.status === 'completed';
    });

    const previousOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt || order.orderDate);
      return orderDate >= previousStartDate && orderDate <= previousEndDate && order.status === 'completed';
    });

    // Calculate metrics
    const currentRevenue = currentOrders.reduce((sum, order) => sum + (parseFloat(order.totalAmount) || 0), 0);
    const previousRevenue = previousOrders.reduce((sum, order) => sum + (parseFloat(order.totalAmount) || 0), 0);
    
    const currentOrderCount = currentOrders.length;
    const previousOrderCount = previousOrders.length;
    
    const currentAvgOrder = currentOrderCount > 0 ? currentRevenue / currentOrderCount : 0;
    const previousAvgOrder = previousOrderCount > 0 ? previousRevenue / previousOrderCount : 0;
    
    // Get unique customers
    const currentCustomers = new Set(currentOrders.map(order => order.buyerId || order.customerId)).size;
    const previousCustomers = new Set(previousOrders.map(order => order.buyerId || order.customerId)).size;

    // Generate chart data
    const chartData = labels.map((label, index) => {
      let dayRevenue = 0;
      
      if (period === 'week') {
        const dayOrders = currentOrders.filter(order => {
          const orderDate = new Date(order.createdAt || order.orderDate);
          return orderDate.getDay() === index;
        });
        dayRevenue = dayOrders.reduce((sum, order) => sum + (parseFloat(order.totalAmount) || 0), 0);
      } else if (period === 'month') {
        const weekStart = index * 7 + 1;
        const weekEnd = Math.min((index + 1) * 7, endDate.getDate());
        const weekOrders = currentOrders.filter(order => {
          const orderDate = new Date(order.createdAt || order.orderDate);
          const dayOfMonth = orderDate.getDate();
          return dayOfMonth >= weekStart && dayOfMonth <= weekEnd;
        });
        dayRevenue = weekOrders.reduce((sum, order) => sum + (parseFloat(order.totalAmount) || 0), 0);
      } else if (period === 'year') {
        const monthOrders = currentOrders.filter(order => {
          const orderDate = new Date(order.createdAt || order.orderDate);
          return orderDate.getMonth() === index;
        });
        dayRevenue = monthOrders.reduce((sum, order) => sum + (parseFloat(order.totalAmount) || 0), 0);
      }
      
      return dayRevenue;
    });

    // Calculate top items
    const itemCounts = {};
    const itemRevenue = {};
    
    currentOrders.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          const itemName = item.name || item.menuName || 'Unknown Item';
          const quantity = parseInt(item.quantity) || 1;
          const price = parseFloat(item.price) || 0;
          
          itemCounts[itemName] = (itemCounts[itemName] || 0) + quantity;
          itemRevenue[itemName] = (itemRevenue[itemName] || 0) + (price * quantity);
        });
      }
    });

    const topItems = Object.keys(itemCounts)
      .map(itemName => ({
        name: itemName,
        orders: itemCounts[itemName],
        revenue: itemRevenue[itemName],
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Calculate percentage changes
    const revenueChange = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    const ordersChange = previousOrderCount > 0 ? ((currentOrderCount - previousOrderCount) / previousOrderCount) * 100 : 0;
    const avgOrderChange = previousAvgOrder > 0 ? ((currentAvgOrder - previousAvgOrder) / previousAvgOrder) * 100 : 0;
    const customersChange = previousCustomers > 0 ? ((currentCustomers - previousCustomers) / previousCustomers) * 100 : 0;

    return {
      revenue: { 
        current: currentRevenue, 
        previous: previousRevenue, 
        change: revenueChange 
      },
      orders: { 
        current: currentOrderCount, 
        previous: previousOrderCount, 
        change: ordersChange 
      },
      averageOrder: { 
        current: currentAvgOrder, 
        previous: previousAvgOrder, 
        change: avgOrderChange 
      },
      customers: { 
        current: currentCustomers, 
        previous: previousCustomers, 
        change: customersChange 
      },
      chartData,
      chartLabels: labels,
      topItems,
    };
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchReportData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitleBack title="Laporan Statistik" />
      
      <View style={styles.header}>
        <View style={styles.timeRangeContainer}>
          <TouchableOpacity
            style={[
              styles.timeRangeButton,
              timeRange === 'week' && styles.activeTimeRange,
            ]}
            onPress={() => setTimeRange('week')}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === 'week' && styles.activeTimeRangeText,
            ]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeRangeButton,
              timeRange === 'month' && styles.activeTimeRange,
            ]}
            onPress={() => setTimeRange('month')}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === 'month' && styles.activeTimeRangeText,
            ]}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeRangeButton,
              timeRange === 'year' && styles.activeTimeRange,
            ]}
            onPress={() => setTimeRange('year')}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === 'year' && styles.activeTimeRangeText,
            ]}>Year</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SimpleChart 
          data={reportData.chartData} 
          labels={reportData.chartLabels} 
          loading={loading}
        />

        <View style={styles.statsGrid}>
          <StatCard
            title="Total Revenue"
            value={loading ? "Loading..." : formatRupiah(reportData.revenue.current)}
            percentage={loading ? null : Math.abs(reportData.revenue.change).toFixed(1)}
            isPositive={reportData.revenue.change >= 0}
            loading={loading}
          />
          <StatCard
            title="Total Orders"
            value={loading ? "Loading..." : reportData.orders.current.toString()}
            percentage={loading ? null : Math.abs(reportData.orders.change).toFixed(1)}
            isPositive={reportData.orders.change >= 0}
            loading={loading}
          />
          <StatCard
            title="Average Order"
            value={loading ? "Loading..." : formatRupiah(reportData.averageOrder.current)}
            percentage={loading ? null : Math.abs(reportData.averageOrder.change).toFixed(1)}
            isPositive={reportData.averageOrder.change >= 0}
            loading={loading}
          />
          <StatCard
            title="Customers"
            value={loading ? "Loading..." : reportData.customers.current.toString()}
            percentage={loading ? null : Math.abs(reportData.customers.change).toFixed(1)}
            isPositive={reportData.customers.change >= 0}
            loading={loading}
          />
        </View>

        <View style={styles.topItemsContainer}>
          <Text style={styles.sectionTitle}>Top Items</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.PRIMARY} />
              <Text style={styles.loadingText}>Loading top items...</Text>
            </View>
          ) : reportData.topItems.length > 0 ? (
            reportData.topItems.map((item, index) => (
              <View key={index} style={styles.topItemRow}>
                <View style={styles.topItemLeft}>
                  <Text style={styles.itemRank}>#{index + 1}</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <View style={styles.topItemRight}>
                  <Text style={styles.itemOrders}>{item.orders} orders</Text>
                  <Text style={styles.itemRevenue}>{formatRupiah(item.revenue)}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No sales data available</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Laporan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTimeRange: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTimeRangeText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  chartContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  chart: {
    height: 150,
    flexDirection: 'row',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    backgroundColor: COLORS.PRIMARY,
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  chartValues: {
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  chartValue: {
    fontSize: 10,
    color: '#666',
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: (screenWidth - 56) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  comparedText: {
    fontSize: 10,
    color: '#999',
  },
  topItemsContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  topItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    width: 30,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  topItemRight: {
    alignItems: 'flex-end',
  },
  itemOrders: {
    fontSize: 14,
    color: '#666',
  },
  itemRevenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
