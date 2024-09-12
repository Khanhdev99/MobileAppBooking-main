import React, { useState } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerComponent = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateString, setDateString] = useState("Chọn ngày!");

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
      onDateChange(date);
      setDateString(date.toString().slice(0, 15));
    }
    setShowDatePicker(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
          padding: 7,
          borderRadius: 5,
        }}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ fontSize: 20 }}>{dateString}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={handleDateChange}
          backgroundColor="#60d4f7"
        />
      )}
    </View>
  );
};

export default DatePickerComponent;
