let cnt = 1;

fetch('product.json')
.then(response => response.json())
.then(json => init(json))
.catch(error => {
	console.log('Error: ' + error)
});

window.onscroll = () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
		load();
	}
}

let categoryas = [];
let filteras = [];

let pickcategory = '';
let searched = '';

const category = document.querySelector('#pick_category');
const searchkey = document.querySelector('#search');
const filterit = document.querySelector('#filter_results');
const main = document.querySelector('#main');

function init (pd) {
	let item_type = category.value;
	let item_name = '';
	
	filteras= pd;
	result();
	
	filterit.onclick = filtering;
	
	function filtering (x) {
		x.preventDefault();
		cnt = 1;
		scrolling = true;
		
		categoryas = [];
		filteras = [];
		
		if (category.value === pickcategory && searchkey.value.trim() === searched) {
			return;
		} else {
			pickcategory = category.value;
			searched = searchkey.value.trim();
			
			if (category.value === 'All') {
				categoryas = pd;
				pickkey();
			} else {
				let lt = category.value.toLowerCase();
				for (let i = 0; i < pd.length; i++) {
					if (pd[i].type == lt) {
						categoryas.push(pd[i]);
					}
				}
				pickkey();
			}
		}
	}
}

function pickkey () {
	if (searchkey.value.trim() !== '') {
		let lowkey = searchkey.value.trim().toLowerCase();
		for (let i = 0; i < categoryas.length; i++) {
			if (categoryas[i].name.indexOf(lowkey) !== -1) {
				filteras.push(categoryas[i]);
			}
		}
	} else {
		filteras = categoryas;
	}
	
	result();
}

function result () {
	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}
	
	if (filteras.length === 0) {
		const res = document.createElement('div');
		res.className = 'res';
		res.innerHTML = 'No results!';
		main.appendChild(res);
	} else {
		console.log(filteras.length);
		load();
	}
}

function load () {
	for (let i = (cnt - 1) * 6; i < cnt * 6; i++) {
		if (i >= filteras.length) {
			break;
		}
		urlink(filteras[i]);
	}
	
	if ((cnt - 1) * 6 >= filteras.length) {
		cnt = filteras.length;
	} else {
		cnt = cnt + 1;
	}
}

function urlink(pd) {
	let link = `image/${pd.image}`;
	
	fetch(link)
	.then(response => response.blob())
	.then(blob => {
		showing(URL.createObjectURL(blob), pd.name, pd.price, pd.info);
	})
	.catch(error => {
		console.log('Error: ' + error);
	});
}

function showing (imageURL, productname, productprice, productinfo) {
	const div = document.createElement('div');
	const img = document.createElement('img');
	
	div.className = 'item_display';
	div.id = productname + '/' + productprice + '/' + productinfo;
	div.addEventListener('click', explanation);
	
	img.src = imageURL;
	img.alt = productname;
	img.className = 'newitem';
	
	main.appendChild(div);
	div.appendChild(img);
}

function explanation (x) {
	let targetID = x.target.parentNode.id;
	let detaillist = targetID.split('/');
	
	if (targetID.indexOf('explain-') === -1) {
		x.target.parentNode.id = 'explain-' + targetID;
		
		const detail = document.createElement('div');
		detail.className = 'item_detail';
		let str = '<br>이름: &nbsp;' + detaillist[0] + '<br><br>가격: &nbsp;' + detaillist[1] + ' 원<br><br>설명: &nbsp;' + detaillist[2];
		detail.innerHTML = str;
		document.getElementById(x.target.parentNode.id).appendChild(detail);
	} else {
		x.target.parentNode.id = targetID.substring(8);
		let chk = document.getElementById(x.target.parentNode.id);
		chk.removeChild(chk.childNodes[1]);
	}
}