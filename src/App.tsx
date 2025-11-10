/**
 * Componente principal do InjecTrack
 */

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { RegisterInjectionScreen } from "./screens/RegisterInjectionScreen";
import { COLORS } from "./utils/constants";
import { OnboardingData } from "./types";
import { getUserData, setAuthToken, setUserData } from "./utils/storage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack de autenticação
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Onboarding"
      component={() => (
        <OnboardingScreen navigation={{}} onComplete={() => {}} />
      )}
    />
  </Stack.Navigator>
);

// Stack principal
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ title: "Dashboard" }}
    />
    <Stack.Screen
      name="RegisterInjection"
      component={RegisterInjectionScreen}
      options={{ title: "Registrar Injeção" }}
    />
  </Stack.Navigator>
);

// Tabs principais
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={MainStack}
      options={{ title: "Início" }}
    />
    {/* Adicionar outras tabs aqui */}
  </Tab.Navigator>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = async (data: OnboardingData) => {
    try {
      // Mock: Em produção, faria chamada à API para criar usuário
      await setAuthToken("mock_token");
      await setUserData(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao completar onboarding:", error);
    }
  };

  if (isLoading) {
    return null; // Ou um componente de loading
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {isAuthenticated ? (
        <MainTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth">
            {() => (
              <OnboardingScreen
                navigation={{}}
                onComplete={handleOnboardingComplete}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
