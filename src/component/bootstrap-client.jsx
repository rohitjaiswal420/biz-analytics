"use client"

import { useEffect } from "react"
import $ from "jquery";

export default function BootstrapClient() {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap")
            .then(() => {
                console.log("Bootstrap JS loaded");
            })
            .catch((err) => console.error("Error loading Bootstrap:", err));
    }, []); // Ensure effect runs only once

    return null; // No UI elements needed
}