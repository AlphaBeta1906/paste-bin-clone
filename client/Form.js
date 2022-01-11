import m from "mithril"
import $ from "jquery"
import Swal from "sweetalert2"
import hljs from "highlight.js"
import Lang from "./Lang"

const state = {
  title: "",
  language: "python",
  code: "",
  loading: false,
  unique_id: "",
  reset: function () {
    state.title = ""
    state.language = "python"
    state.code = ""
    $("#title").val("")
    $("textarea").val("")
    $("select").val("python")
    state.loading = false
  }
}

// const url_test = "http://127.0.0.1:8000/api/v1/paste"
const url = "https://pastebincloneapi.pythonanywhere.com/api/v1/paste"
const Fetch = {
  post: function () {
    m.request({
      method: "POST",
      url: url,
      body: state,
      timeout: 30000
    }).then(function (data) {
      state.unique_id = data.unique_id
      state.reset()
      Swal.fire(
			  "Paste created",
			  "",
			  "success"
      )
      m.route.set("/paste/:id", { id: state.unique_id })
    }).catch(function (error) {
    	state.reset()
    })
  },
  _get: function (id) {
  		const paste = {}
    m.request({
      method: "GET",
      url: url + "/" + id,
      cache: true,
      timeout: 30000
    }).then(function (data) {
      paste.title = data.title
      paste.language = data.language
      paste.code = data.code
      paste.date = data.date_created.split("T")[0]
      paste.html = hljs.highlight(paste.code, { language: paste.language }).value
    }).catch(function (error) {
      paste.error = "paste not found"
      paste.code = error.code
    })
    return paste
  }
}

const Form = {
  option: function () {
    const arr = []
    for (const [key, value] of Object.entries(Lang)) {
      arr.push({ value: value, key: key })
    }
    return arr
  },
  view: function () {
    return m("form",
      {
        onsubmit: function (e) {
          Fetch.post()
          state.loading = true
          e.preventDefault()
        }
      },
      m("label", { for: "title" }, "Title"),
      m("input#title",
        {
          type: "text",
          name: "title",
          placeholder: "title of your paste",
          required: true,
          disabled: state.loading,
          oninput: function (e) {
            state.title = e.target.value
          }
        }),
      m("label", { for: "language" }, "Language"),
      m("select",
        {
          name: "language",
          onchange: function (e) {
            state.language = e.target.value
          }
        },
        Form.option().map(function (data) {
          return m("option", { value: data.value }, data.key)
        })
      ),
      m("label", { for: "code" }, "Code"),
      m("textarea",
        {
          name: "code",
          style: "height: 250px",
          placeholder: "your code here...",
          required: true,
          disabled: state.loading,
          maxlength: "10000",
          oninput: function (e) {
            state.code = e.target.value
          }
        }),
      m("button", { type: "submit", disabled: state.loading }, "create paste")

    )
  }
}

export { Form, Fetch }
