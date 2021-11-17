'use strict';

// 例「javascript 使い方」でグーグル検索すると１位の記事が勝手に消されます
const e = document.querySelector('#rso > div:nth-child(1) > div');
e.parentElement.removeChild(e);
