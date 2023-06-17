import { Box, styled } from "@ignite-ui/react";

export const IntervalBox = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: " column",
});

export const intervalContainer = styled("div", {
  border: "1px solid $gray600",
  borderRadius: "$md",
  marginBottom: "",
});

export const IntervalItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: " $3 $4 ",
  "& + &": {
    borderTop: "1px    solid $gray600",
  },
});

export const  IntervalDay = styled("div", {
    display: "flex",
    alignItems: "center",
    gap: '$3'
} )


export const  IntervalInputs = styled("div", {
    display: "flex",
    alignItems: "center",
    gap: '$2'
} )