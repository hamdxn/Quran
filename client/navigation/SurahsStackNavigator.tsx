import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SurahsScreen from "@/screens/SurahsScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type SurahsStackParamList = {
  Surahs: undefined;
};

const Stack = createNativeStackNavigator<SurahsStackParamList>();

export default function SurahsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Surahs"
        component={SurahsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Al-Quran" />,
        }}
      />
    </Stack.Navigator>
  );
}
