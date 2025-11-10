import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import DashboardScreen from "../screens/DashboardScreen";
import RegistroFotoScreen from "../screens/RegistroFotoScreen";

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="Preview"
        component={
          /* ... */ DashboardScreen /* trocar depois pelo Preview real */
        }
      />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="RegistroFoto" component={RegistroFotoScreen} />
    </Stack.Navigator>
  );
}
