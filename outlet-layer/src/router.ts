const router_section_id = "content";
import { Router } from "@vaadin/router";
window.addEventListener("load", () => {
    initRouter();
});

function initRouter() {

    const router = new Router(document.getElementById(router_section_id));

    router.setRoutes([
        {
            path: "/",
            component: "app-home",
            action: async () => {
                await import("./view/content/home");
            },
        },
        {
            path: "/mychannels",
            component: "my-channels",
            action: async () => {
                await import("./view/content/channels");
            },
        },
        //////
        {
            path: "/mychannel/(.*)",
            component: "my-channel",
            action: async () => {
                await import("./view/content/mychannel");
            },
        },
        /////// NOT Found Route
        {
            path: "(.*)",
            component: "not-found",
            action: async () => {
                await import("./view/content/not-found");
            },
        },
    ]);

}