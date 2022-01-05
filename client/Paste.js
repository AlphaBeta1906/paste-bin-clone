import m from "mithril"
import ClipboardJS from "clipboard"
import {Nav} from "./Nav"
import {Fetch} from "./Form"


var url_test = "http://127.0.0.1:8000/api/v1/paste"
var url = "https://pastebincloneapi.pythonanywhere.com/api/v1/paste"
var paste = {}

var Code = {
	oninit : function(vnode){
		paste = Fetch._get(vnode.attrs.id)
	},
	view: function(){
		return m("pre",
				 paste.error?m("code",paste.error):m(`code.hljs language-${paste.language}`,{style:"min-height:250px;font-size:14pt"},m.trust(paste.code))
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
						m("",
							m("header",m("h3",paste.title)),
							m("button.btn",
								{
									style:"width:25%;",
									"data-clipboard-target":".hljs"
								},"copy"),						
							m(Code,{id:vnode.attrs.id}),
							m("footer",`created at : ${paste.date}`)
						)						
					)
				)
					
	}
}

export {Paste}
