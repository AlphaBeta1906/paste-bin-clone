import m from "mithril"
import moment from "moment"
import { theme } from "./Nav"
import Lang from "./Lang"

var state = {
	pastes: [],
	complete: false,
	loading: false,
	page: 1
}



const Home = {
	get_key: function(object, value) {
	  return Object.keys(object).find(key => object[key] === value);
	},
	fetch: function(){
		m.request({
	  		method: "GET",
	  		url: `https://pastebincloneapi.pythonanywhere.com/api/v1/pastes?page=${state.page}`,
	  		timeout: 30000
	  	}).then(function(data){
	  		state.pastes = state.pastes.concat(data.pastes)	
	  		state.loading = false
	  	}).catch(function(error){
	  		state.complete = true
	  		state.loading = false
	  	})
	},
	oninit: function(){
		document.title = "Home"
		Home.fetch()
	},
	view: function(){
		return state.pastes.length <= 0? m(".dot"):
			   m(".row",
					state.pastes.map(function(paste){
						var date = new Date(paste.date_created.split("T")[0])
						return m("article",
									m(m.route.Link,{href: `/paste/${paste.unique_id}`,style: "font-size:1.5rem"},paste.title),
									m("p",`Language : ${paste.language} `),
								  m("footer",moment(date).format("D MMM, YYYY"))
								)
					}),state.loading?m(".dot")
						:
						state.complete?m("span"):
						m("button",{
							onclick: function(){
								state.loading = true
								state.page += 1
								if(!state.complete){
									Home.fetch()
								}
							}							
						},"load more")
				)
	}
}

export { Home, theme }
