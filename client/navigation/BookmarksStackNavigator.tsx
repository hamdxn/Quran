import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookmarksScreen from "@/screens/BookmarksScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type BookmarksStackParamList = {
  BookmarksList: undefined;
};

const Stack = createNativeStackNavigator<BookmarksStackParamList>();

export default function BookmarksStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="BookmarksList"
        component={BookmarksScreen}
        options={{
          headerTitle: "Bookmarks",
        }}
      />
    </Stack.Navigator>
  );
}
