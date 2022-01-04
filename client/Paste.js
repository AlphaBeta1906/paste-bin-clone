import m from "mithril"
import ClipboardJS from "clipboard"
import hljs from "highlight.js"
import {Nav} from "./Nav"
import {Footer} from "./MainView"

var url_test = "http://127.0.0.1:8000/api/v1/paste"
var url = "https://pastebincloneapi.pythonanywhere.com/api/v1/paste"
var paste = {
	title: "",
	language: "",
	code: "",
	date: ""
}

var Code = {
	oninit : function(vnode){
		m.request({
			method: "GET",
			url: url+"/"+vnode.attrs.id,
			cache:true
		}).then(function(data){
			paste.title = data["title"]
			paste.language = data["language"]
			paste.code = data["code"]
			paste.date = data["date_created"]
			console.log(data)
			console.log(paste.language)
			paste.code = hljs.highlight(paste.code, {language: paste.language}).value
		}).catch(function(error){
			console.log(error)
		})
	},
	view: function(){
		return m("pre",
					m(`code.hljs language-${paste.language}`,{style:"min-height:250px;font-size:14pt"},m.trust(paste.code))
				)
	}
}

var Paste = {
	view: function(vnode){
		new ClipboardJS(".btn")
		document.title = paste.title
		return 	m(".container",
					m(Nav),
					m("article",
						m("header",m("h3",paste.title)),
						m("button.btn",
							{
								style:"width:25%;",
								"data-clipboard-target":".hljs"
							},"copy"),						
						m(Code,{id:vnode.attrs.id}),
						m("footer",m("p",`created at : ${paste.date.split("T")[0]}`))
					)
				)
					
	}
}

export {Paste}
