import m from "mithril"
import $ from "jquery"
import hljs from "highlight.js"
import {Home,theme} from "./MainView"
import {Paste} from "./Paste"

$("html").attr("data-theme",theme)
//m.route.prefix("")
m.route(document.body,"/newpaste",{
	"/newpaste": Home,
	"/paste/:id": Paste
})

