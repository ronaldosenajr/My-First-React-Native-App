import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { images } from "@/constants";
import { FormField } from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signUpScheme } from "../schemes/login";
import { z } from "zod";
import { createUser } from "@/lib/appwrite";

export type SignUpForm = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] =
    useState<{ name: string | number; message: string }[]>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    try {
      signUpScheme.parse(form);
      setIsSubmitting(true);
      setErrors(undefined);
      const result = await createUser(form.email, form.password, form.username);

      // set result to global state

      router.replace("/home");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.map((e) => ({ name: e.path[0], message: e.message }))
        );
      } else {
        Alert.alert("Error", "Oops, something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full px-4 my-6 justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold font-psemibold mt-10">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            errorText={
              errors?.find((e) => e.name === "username")?.message || ""
            }
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            errorText={errors?.find((e) => e.name === "email")?.message || ""}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            errorText={
              errors?.find((e) => e.name === "password")?.message || ""
            }
          />
          <CustomButton
            title="Sign Up"
            handlePress={submitForm}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
