import React from "react";
import { StyleSheet, Text, View } from "react-native";

const InfoBox = ({ title, containerStyles, titleStyles, subTitle }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text
        className={`text-sm text-gray-100 text-center font-pregular ${titleStyles}`}
      >
        {subTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default InfoBox;
