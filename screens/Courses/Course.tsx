import React from "react";
import { useAuth } from "../../context/Auth";
import { getCategoryTasks, getUserCategories } from "../../api/Category";
import { useQuery } from "@tanstack/react-query";
import { RootStackScreenProps } from "../../types";
import {
  Box,
  Text,
  Image,
  Heading,
  VStack,
  Progress,
  Button,
} from "native-base";

type Props = {};

const CourseScreen = ({ route }: RootStackScreenProps<"Course">) => {

  const { completed, categoryId } = route.params as any

  console.log(categoryId);
  const { data: categoryTasks, refetch: fetchCategoryTask } = useQuery(
    ["category-task"],
    () => getCategoryTasks(categoryId),
    {
      enabled: !!categoryId
    }
  );

  console.log(JSON.stringify(categoryTasks, null, 2));
  return <Text>Course</Text>;
};

export default CourseScreen;
