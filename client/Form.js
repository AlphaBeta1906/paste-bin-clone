import m from "mithril"
import u from "umbrellajs"
import Swal from "sweetalert2"
import Prism from "prismjs"
import Lang from "./Lang"

const state = {
  title: "",
  language: "py",
  code: "",
  loading: false,
  unique_id: "",
  reset: function () {
    state.title = ""
    state.language = "python"
    state.code = ""
    u("#title").attr("val","")
    u("textarea").attr("val","")
    u("select").attr("val","python")
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
      m.route.set("/paste/:key", { key: state.unique_id })
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
      paste.html = Prism.highlight(paste.code, Prism.languages[paste.language], paste.language)
    }).catch(function (error) {
      paste.error = "paste not found"
      paste.code = error.code
      console.log(error)
    })
    return paste
  },
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
          style: "height: 250px;resize:vertical;",
          placeholder: "your code here...",
          required: true,
          disabled: state.loading,
          maxlength: "10000",
          oninput: function (e) {
            state.code = e.target.value
          },
          onkeydown: function (e) {
       		  const keyCode = e.keyCode || e.which
			  if (keyCode == 9) {
			    e.preventDefault()
			    const start = this.selectionStart
			    const end = this.selectionEnd
			    const text = $(this).val()
			    const selText = text.substring(start, end)
			    $(this).val(
			      text.substring(0, start) +
			      "\t" + selText.replace(/\n/g, "\n\t") +
			      text.substring(end)
			    )
			    this.selectionStart = this.selectionEnd = start + 1
          	}
          }
        }),
      m("button", { type: "submit", disabled: state.loading }, "create paste")

    )
  }
}

export { Form, Fetch }
