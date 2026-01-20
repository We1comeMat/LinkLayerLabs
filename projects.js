// Add your projects here - each project will automatically appear on the site
const projects = [
    {
        title: "GlowLink",
        description: "ESP32-based automotive LED controller for dual WS2811 underglow strips. Receives vehicle data wirelessly via ESP-NOW for dynamic lighting effects",
        images: ["images/GlowLink_PCB_Front.png", "images/GlowLink_PCB_Back.png"],
        model: "models/GlowLink.glb",
        tags: ["ESP32", "WS2811", "ESP-NOW", "Automotive", "OBD-II"],
        projectPage: "glowlink.html"
    },
    {
        title: "CANcast",
        description: "OBD-II CAN bus reader that broadcasts vehicle data over ESP-NOW. Plugs into your truck's OBD-II port and wirelessly transmits CAN frames for LED controllers, HUDs, and other peripherals",
        images: ["images/CANcast_init.png"],
        tags: ["ESP32", "CAN Bus", "OBD-II", "ESP-NOW", "Automotive"],
        projectPage: "cancast.html"
    }
];
