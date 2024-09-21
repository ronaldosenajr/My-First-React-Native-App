import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { images } from "@/constants";
import { FormField } from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { signInScheme } from "../schemes/login";
import { z } from "zod";

export type SignInForm = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [form, setForm] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] =
    useState<{ name: string | number; message: string }[]>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    try {
      signInScheme.parse(form);
      console.log(form);
      setErrors(undefined);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.map((e) => ({ name: e.path[0], message: e.message }))
        );
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6 justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold font-psemibold mt-10">
            Log in to Aora
          </Text>
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
            title="Sign In"
            handlePress={submitForm}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
