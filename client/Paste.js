import m from "mithril"
import ClipboardJS from "clipboard"
import { Nav, Footer } from "./Nav"
import { Fetch } from "./Form"

let paste = {}
var raw = false

const Code = {
  oninit: function (vnode) {
    paste = Fetch._get(vnode.attrs.id)
  },
  view: function () {
    return m("pre",
				 paste.error
        ? m("code", paste.error)
        : m(`code`,
				 	{
            style: {
				 	"min-height": "250px",
				 	"font-size": "12pt"
				   },
			class:raw?"" :`hljs language-${paste.language}`,
			id: "paste"
		   }, raw?paste.code:m.trust(paste.html))
    )
  }
}

const Paste = {
  view: function (vnode) {
    new ClipboardJS(".btn")
    document.title = paste.title ? paste.title : paste.error ? "paste not found" : "Paste bin clone"
    return 	m(".container",
      m(Nav),
      m("article",
        m("",
          m("header", paste.title ? m("h3", paste.title) : m("span", { "aria-busy": "true", style: { padding: "15px" } },"loading")),
          paste.error
            ? m("")
            : m("button.btn",
              {
                style: "width:25%;",
                "data-clipboard-target": "#paste"
              }, "copy",m("i.fas fa-copy",{style:"padding-left:15px"})),
              m("a",{
              	onclick: function(){
              		raw = raw?false:true
              	},
              	style:"cursor:pointer"
              },"Raw"),
          m(Code, { id: vnode.attrs.id }),
          m("footer", `created at : ${paste.date ? paste.date : "unknown"}`)
        )
      ),
      m(Footer)
    )
  }
}

export { Paste }
