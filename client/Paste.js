import m from "mithril"
import ClipboardJS from "clipboard"
import moment from "moment"
import { Nav, Footer } from "./Nav"
import { Fetch } from "./Form"
import Lang from "./Lang"

let paste = {}
let raw = false

const Code = {
  view: function (vnode) {
    return m("pre",
				 paste.error
        ? m("code", paste.error)
        : m("code",
				 	{
            style: {
				 	"min-height": "250px",
				 	"font-size": "12pt"
				   },
            class: raw ? "" : `hljs language-${paste.language}`,
            id: "paste"
		   }, raw ? paste.code : m.trust(paste.html))
    )
  }
}

const Paste = {
 get_key: function(object, value) {
	  return Object.keys(object).find(key => object[key] === value);
  },
  oninit: function (vnode) {
    paste = Fetch._get(vnode.attrs.id)
    console.log(paste)
  },
  view: function (vnode) {
    new ClipboardJS(".btn")
    document.title = paste.title ? `Pastebin clone| ${paste.title}` : paste.error ? "paste not found" : "Paste bin clone"
	var date = new Date(paste.date)
    return 	m(".container",
     !paste.title?m(".dot"):
      m("article",
        m("",
          m("header", 
          			m("h3", paste.code != 404 ? paste.title : "paste not found"),
          			m("p",`Language : ${paste.language}`),
          		),
          paste.error? m("")
            : m("button.btn d-inline",
              {
                style: "width:25%;",
                "data-clipboard-target": "#paste"
              }, "copy", m("i.fas fa-copy", { style: "padding-left:15px" })),
          		m("a.d-inline ps-3", {
              		onclick: function () {
              			raw = !raw
              		},
              		style: "cursor:pointer"
          		}, "Raw"),
          		m("a.d-inline ps-3",{
          			href: `https://pastebincloneapi.pythonanywhere.com/api/v1/paste/download/${vnode.attrs.id}`,
          			download: ""
          		},"Download"),
          m(Code, { paste: paste }),
          m("footer", `created at : ${paste.date ? moment(date).format("D MMM, YYYY") : "unknown"}`)
        )
      ),
    )
  }
}

export { Paste }
