import m from "mithril"
import { Nav, Footer, theme } from "./Nav"
import { Form } from "./Form"

const Home = {
  view: function () {
    document.title = "New paste"
    return m(".container",
      m(Nav),
      m(Form),
      m(Footer)
    )
  }
}

export { Home, theme }
