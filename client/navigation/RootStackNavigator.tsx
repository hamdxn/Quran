import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import SurahDetailScreen from "@/screens/SurahDetailScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { Surah } from "@/data/surahs";

export type RootStackParamList = {
  Main: undefined;
  SurahDetail: { surah: Surah };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurahDetail"
        component={SurahDetailScreen}
        options={({ route }) => ({
          headerTitle: route.params.surah.title,
          headerBackTitle: "Back",
        })}
      />
    </Stack.Navigator>
  );
}
