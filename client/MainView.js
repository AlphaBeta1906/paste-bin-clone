import m from "mithril"
import {Nav,Link,theme} from "./Nav"
import {Form} from "./Form"

var Footer = {
	view: function(){
		return 	m("footer",{style:"position:relative;bottom:0;"},
						m("hr"),
						m("p.font-thin","© Copyright 2021 alfarizi")
					)
	}
}


var Home = {
	view: function(){
		document.title = "New paste"
		return m(".container",
					m(Nav),
					m(Form),
					m(Footer)
				)
	},
}


export {Home,theme}
