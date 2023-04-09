import { Box, TextField, TextFieldProps } from "@mui/material";
import React from "react";

type UserInputProps = {
  onChange: (value: string) => void;
  textFieldProps: TextFieldProps;
};

export const UserInput = ({ onChange, textFieldProps }: UserInputProps) => {
  const [message, setMessage] = React.useState<string>("");

  return (
    <TextField
      {...textFieldProps}
      // label="User Input"
      onKeyDown={(ev) => {
        if (ev.key === "Enter" && ev.ctrlKey) {
          onChange(message);
          setMessage("");
        }
      }}
      value={message}
      onChange={(ev) => {
        setMessage(ev.target.value.toString());
      }}
      multiline
    />
  );
};
