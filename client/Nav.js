import m from "mithril"
import $ from "jquery"


var theme = localStorage.getItem("theme") === null ? "ligth" : localStorage.getItem("theme")
		
var Link = {
	view: function(vnode){
		return m(m.route.Link,{href:vnode.attrs.link,class:" text-sm"},vnode.attrs.text)
	}
}

var Nav = {
	view: function(){
		return m("nav",
			m("ul",
				m("li",m("h3","Logo"))
			),
			m("ul",
				document.title==="New paste"?m(""):m("li",m(Link,{link : "/home",text : "New paste"})),
				m("li",
					m("label",{for:"check"}),
					m("input",{
						id: "check",
						type: "checkbox",
						role: "switch",
						oninput: function(){
							$("html").attr("data-theme",this.checked?"dark":"light")
							localStorage.setItem("theme",this.checked?"dark":"light")
						},
						checked: $("html").attr("data-theme") == "light"?false:true
					})
				)
			)
		)
	}
}

export {Nav,Link,theme}
