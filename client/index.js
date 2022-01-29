import m from "mithril"
import u from "umbrellajs"
import { Home, theme } from "./MainView"
import { Paste } from "./Paste"
import { Nav,Footer} from "./Nav"
import { Form } from "./Form"

u("html").attr("data-theme", theme)
u(theme == "dark" ? "#light" : "#dark").attr("disabled", "disabled")

const Wrapper = {
	view: function(vnode){
		return m(".container",
			m(Nav),
      		m("",vnode.children),
      		m(Footer)
		)
	}
}

m.route(document.body, "/", {
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
