import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type FormFieldProps = {
  value: string;
  placeholder?: string;
  errorText?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: "email-address" | "default" | "numeric" | "phone-pad";
};

export const SearchInput: React.FC<FormFieldProps> = ({
  value,
  handleChangeText,
  keyboardType,
  placeholder,
}) => {
  return (
    <View
      className="border-2 border-black-200
                   w-full h-16 px-4 bg-black-100 
                   rounded-2xl focus:border-secondary 
                   items-center flex-row space-x-4"
    >
      <TextInput
        className="text-base mt-0.5 text-white font-pregular flex-1"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
