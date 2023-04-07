import { Box, TextField } from "@mui/material";
import React from "react";

interface UserInputProps {
  onChange: (value: string) => void;
}

export const UserInput = ({ onChange }: UserInputProps) => {
  const [message, setMessage] = React.useState<string>("");

  return (
    <Box>
      <TextField
        label="User Input"
        onKeyDown={(ev) => {
          if (ev.key === "Enter" && ev.ctrlKey) {
            onChange(message);
          }
        }}
        onChange={(ev) => {
          setMessage(ev.target.value.toString());
        }}
        multiline
      />
    </Box>
  );
};
