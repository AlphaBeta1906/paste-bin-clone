import m from "mithril"
import $ from "jquery"
import Swal from "sweetalert2"
import hljs from "highlight.js"

var state = {
    title: "",
    language: "python",
    code: "",
    loading: false,
    unique_id: "",
    reset: function() {
        state.title = ""
        state.language = "python"
        state.code = ""
        $("#title").val("")
        $("textarea").val("")
        $("select").val("python")
        state.loading = false
    }
}

var url_test = "http://127.0.0.1:8000/api/v1/paste"
var url = "https://pastebincloneapi.pythonanywhere.com/api/v1/paste"
var Fetch = {
    post: function() {
        m.request({
            method: "POST",
            url: url,
            body: state,
        }).then(function(data) {
            console.log(data)
            console.log(data["unique_id"])
            state.unique_id = data["unique_id"]
            state.reset()
            Swal.fire(
                "Paste created",
                "",
                "success"
            )
            m.route.set("/paste/:id", { id: state.unique_id })
        }).catch(function(error) {
            console.log(error)
            state.reset()
        })
        console.log(state.loading)
    },
    _get: function(id) {
        var paste = {}
        m.request({
            method: "GET",
            url: url + "/" + id,
            cache: true
        }).then(function(data) {
            paste.title = data["title"]
            paste.language = data["language"]
            paste.code = data["code"]
            paste.date = data["date_created"]
            paste.code = hljs.highlight(paste.code, { language: paste.language }).value
        }).catch(function(error) {
            paste.error = "something went wrong"
            paste.code = error.code
        })
        return paste

    }
}

var Form = {
    view: function() {
        return m("form", {
                onsubmit: function(e) {
                    Fetch.post()
                    state.loading = true
                    e.preventDefault()
                }
            },
            m("label", { for: "title" }, "Title"),
            m("input#title", {
                type: "text",
                name: "title",
                placeholder: "title of your paste",
                required: true,
                disabled: state.loading,
                oninput: function(e) {
                    state.title = e.target.value
                }
            }),
            m("label", { for: "language" }, "Language"),
            m("select", {
                    name: "language",
                    onchange: function(e) {
                        state.language = e.target.value
                    }
                },
                m("option", { value: "python" }, "python"),
                m("option", { value: "java" }, "java"),
                m("option", { value: "cpp" }, "c++"),
                m("option", { value: "c" }, "c"),
                m("option", { value: "c#" }, "c#"),
                m("option", { value: "ruby" }, "ruby"),
                m("option", { value: "go" }, "go"),
                m("option", { value: "rust" }, "rust"),
                m("option", { value: "jsx" }, "jsx"),
                m("option", { value: "typescript" }, "typescript"),
            ),
            m("label", { for: "code" }, "Code"),
            m("textarea", {
                name: "code",
                style: "height: 250px",
                placeholder: "your code here...",
                required: true,
                disabled: state.loading,
                oninput: function(e) {
                    state.code = e.target.value
                }
            }),
            m("button", { type: "submit", disabled: state.loading }, "create paste"),

        )
    }
}

export { Form, Fetch }