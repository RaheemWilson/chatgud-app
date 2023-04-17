import {
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HomeScreen from "../screens/HomeScreen";
import { useAuth } from "../context/Auth";
import OnboardingScreen from "../screens/Auth/Onboarding";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import { Pressable } from "native-base";
import ViewCourses from "../screens/Courses/ViewCourses";
import DashboardScreen from "../screens/DashboardScreen";
import EditProfileScreen from "../screens/EditProfileSreen";
import BirdChat from "../screens/BirdChat";
import ProfileScreen from "../screens/ProfileScreen";
import CourseScreen from "../screens/Courses/Course";
import LevelCompletedScreen from "../screens/Courses/LevelCompletedScreen";
import QuizScreen from "../screens/Quiz/Quiz";
import ViewQuizzes from "../screens/Quiz/ViewQuizzes";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { userData } = useAuth();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {userData ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            title: "Edit Profile",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
    </Stack.Navigator>
  );
}



const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Overview"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewQuizzes"
        component={ViewQuizzes}
        options={{ headerShown: false }}
      />
      {/* 
      <Stack.Screen
        name="LevelCompleted"
        component={LevelCompletedScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
    </Stack.Navigator>
  );
};


const CourseStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewCourses"
        component={ViewCourses}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LevelCompleted"
        component={LevelCompletedScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
    </Stack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          // borderRadius: 50,
          // position: 'absolute'
          paddingTop: 10,
        },
      }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={({ navigation }) => ({
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            );
          },
        })}
      />
      <BottomTab.Screen
        name="Courses"
        component={CourseStack}
        options={{
          headerShown: false,
          title: "Courses",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="BirdChat"
        component={BirdChat}
        options={{
          title: "Bird Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={24}
              color={color}
            />
          ),
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              size={24}
              color={color}
            />
          ),
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </BottomTab.Navigator>
  );
}
