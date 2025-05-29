import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="started" options={{ headerShown: false }} />
      <Stack.Screen name="seller/SellerIndex" options={{ headerShown: false }} />
      <Stack.Screen name="seller/DetailUsaha" options={{ headerShown: false }} />
      <Stack.Screen name="seller/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="seller/pelanggan" options={{ headerShown: false }} />
      <Stack.Screen name="seller/pelangganDetails" options={{ headerShown: false }} />
      <Stack.Screen name="seller/menu" options={{ headerShown: false }} />
      <Stack.Screen name="seller/daftarmenu" options={{ headerShown: false }} />
      <Stack.Screen name="seller/JadwalPengantaran" options={{ headerShown: false }} />
      <Stack.Screen name="seller/DetailPengantaran" options={{ headerShown: false }} />
      <Stack.Screen name="seller/Pengantaran" options={{ headerShown: false }} />
      <Stack.Screen name="buyer/BuyerIndex" options={{ headerShown: false }} />
      <Stack.Screen name="buyer/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="buyer/CateringList" options={{ headerShown: false }} />
      <Stack.Screen name="buyer/StatusOrder" options={{ headerShown: false }} />
      <Stack.Screen name="buyer/DetailOrder" options={{ headerShown: false }} />
      <Stack.Screen name="buyer/CateringDetail" options={{ headerShown: false }} />
    </Stack>
  );
}
