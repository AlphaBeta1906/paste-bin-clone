import m from "mithril"
import {Nav,Link,Footer,theme} from "./Nav"
import {Form} from "./Form"


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
