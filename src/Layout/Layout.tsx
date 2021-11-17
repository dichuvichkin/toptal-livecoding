import {Box} from "@mui/material";
import {PropsWithChildren} from "react";

export function Layout({children}: PropsWithChildren<unknown>) {
    return (
        <Box sx={{padding: '24px 0'}}>
            {children}
        </Box>
    )
}
