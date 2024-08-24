import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, searchPosts, signOut } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobarProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="my-6 px-4">
              <View className="w-full justify-center items-center mb-12 px-4">
                <TouchableOpacity
                  className="w-full items-end mb-10"
                  onPress={logout}
                >
                  <Image
                    source={icons.logout}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                  <Image
                    source={{ uri: user?.avatar }}
                    className="w-[90%] h-[90%]"
                    resizeMode="cover"
                  />
                </View>
                <InfoBox
                  title={user?.username}
                  containerStyles={"mt-5"}
                  titleStyles={"text-lg"}
                />

                <View className="flex-row mt-5">
                  <InfoBox
                    title={posts.length || 0}
                    subTitle="Posts"
                    containerStyles={"mr-10"}
                    titleStyles={"text-xl"}
                  />
                  <InfoBox
                    title={"2.5k"}
                    subTitle="Followers"
                    titleStyles={"text-xl"}
                  />
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this search query."
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
