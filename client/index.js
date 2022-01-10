import m from "mithril"
import $ from "jquery"
import { Home, theme } from "./MainView"
import { Paste } from "./Paste"

$("html").attr("data-theme", theme)
$(theme == "dark" ? "#light" : "#dark").attr("disabled", "disabled")
// m.route.prefix = ""
m.route(document.body, "/newpaste", {
  "/newpaste": Home,
  "/paste/:id": Paste
})
