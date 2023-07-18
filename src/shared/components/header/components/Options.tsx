import { Box } from "@mui/material";
import Link from "next/link";

const OPTIONS_HEADER = [
  "capa",
  "cidade",
  "regional",
  "estadual",
  "nacional",
  "policial",
  "política",
  "economia",
];

export const Options = () => {
  return (
    <Box display="flex" gap={3}>
      {OPTIONS_HEADER.map((el) => (
        <Link
          key={el}
          href="/"
          className="uppercase font-black text-sm hover:text-secondary transition-colors dark:hover:text-primary"
        >
          {el}
        </Link>
      ))}
    </Box>
  );
};
