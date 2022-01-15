import m from "mithril"
import $ from "jquery"
import { Nav, Footer, theme } from "./Nav"
import { Form } from "./Form"

const Home = {
  view: function () {
  	$("head").append(`<meta property="og:title" content="Paste bin clone app" />`)
  	$("head").append(`<meta property="og:url" content="https://pastebin-clone.netlify.app/#!/newpaste" />`)
    document.title = "New paste"
    return m(".container",
      m(Nav),
      m(Form),
      m(Footer)
    )
  }
}

export { Home, theme }
