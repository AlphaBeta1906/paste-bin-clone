import m from "mithril"
import $ from "jquery"
import { Home, theme } from "./MainView"
import { Paste } from "./Paste"
import { Nav,Footer} from "./Nav"
import { Form } from "./Form"

$("html").attr("data-theme", theme)
$(theme == "dark" ? "#light" : "#dark").attr("disabled", "disabled")

const Wrapper = {
	view: function(vnode){
		return m(".container",
			m(Nav),
      		m("",vnode.children),
      		m(Footer)
		)
	}
}

m.route(document.body, "/newpaste", {
  "/": {
  	view: function(){
  		return m(Wrapper,m(Home))
  	}
  },
  "/newpaste": {
  	view: function(){
  		return m(Wrapper,m(Form))
  	}
  },
  "/paste/:key": {
  	view: function(vnode){
  		return m(Wrapper,m(Paste,{id:vnode.attrs.key}))
  	}
  }
})
