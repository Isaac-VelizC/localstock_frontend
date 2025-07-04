import { SidebarContext } from "@/context/SidebarContext"
import { useContext } from "react"

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar debe usarse dentro de un SidebarProvider");
    }
    return context;
};