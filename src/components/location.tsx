import { LocationOn } from "@mui/icons-material";
import { Typography } from "@mui/material";

export const Location = ({ location }: { location: string }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <LocationOn />
      <Typography>{location}</Typography>
    </div>
  );
};
