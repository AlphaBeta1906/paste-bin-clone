import m from "mithril"
import ClipboardJS from "clipboard"
import { Nav, Footer } from "./Nav"
import { Fetch } from "./Form"

let paste = {}

const Code = {
  oninit: function (vnode) {
    paste = Fetch._get(vnode.attrs.id)
  },
  view: function () {
    return m("pre",
				 paste.error
        ? m("code", paste.error)
        : m(`code.hljs language-${paste.language}`,
				 	{
            style: {
				 	"min-height": "250px",
				 	"font-size": "12pt"
				   }
		   }, m.trust(paste.code))
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
            : m("button.btn fas fa-copy",
              {
                style: "width:25%;",
                "data-clipboard-target": ".hljs"
              }, "copy"),
          m(Code, { id: vnode.attrs.id }),
          m("footer", `created at : ${paste.date ? paste.date : "unknown"}`)
        )
      ),
      m(Footer)
    )
  }
}

export { Paste }
