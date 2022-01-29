import m from "mithril"
import u from "umbrellajs"

const theme = localStorage.getItem("theme") === null ? "ligth" : localStorage.getItem("theme")

const Link = {
  view: function (vnode) {
    return m(m.route.Link, { href: vnode.attrs.link, class: " text-sm" }, vnode.attrs.text)
  }
}

const Nav = {
  view: function () {
    return m("nav",
      m("ul",
        m("li", m("h3", "Logo"))
      ),
      m("ul",
        m("li", m(Link, { link: "/", text: "Home" })),
        m("li", m(Link, { link: "/newpaste", text: "New paste" })),
        m("li",
          m("label", { for: "check" }),
          m("i.fas fa-sun", { style: "padding-right:2px" }),
          m("input", {
            id: "check",
            type: "checkbox",
            role: "switch",
            oninput: function () {
              u("html").attr("data-theme", this.checked ? "dark" : "light")
              u(this.checked ? "#light" : "#dark").attr("disabled", "disabled")
              u(this.checked ? "#dark" : "#light").attr("disabled",false)
              localStorage.setItem("theme", this.checked ? "dark" : "light")
            },
            checked: u("html").attr("data-theme") != "light"
          }),
          m("i.fas fa-moon")
        )
      )
    )
  }
}

const Footer = {
  view: function () {
    return 	m("footer", { style: "position:relative;bottom:0;" },
      m("hr"),
      m("p.font-thin", "© Copyright 2021 alfarizi")
    )
  }
}

export { Nav, Link, Footer, theme }
