'use strict';

// tutorial1
// 例「javascript 使い方」でグーグル検索すると１位の記事が勝手に消されます
// const e = document.querySelector("#rso > div:nth-child(1) > div");
// e.parentElement.removeChild(e);

// tutorial2
// 任意のURLを検索結果に表示しないようにする
const TARGET_DOMAINS = ['techacademy.jp', 'sejuku.net'];
const googleTargetDOM = Array.from(document.querySelectorAll('#rso > div'));

const removeTargetDom = (targetDeleteDomains, targetDOM) => {
  // 取得したNodeListはArray.form()で配列化して配列として扱えるようにする
  targetDOM.map((dom) => {
    const DOMofIncludingUrl = dom.querySelector('div > cite');
    if (DOMofIncludingUrl === null || DOMofIncludingUrl === undefined) return;
    // innerTextの中身 'https://developer.mozilla.org › API' のようになっており小さい空白部分をsplitさせる
    const searchedUrlText = DOMofIncludingUrl.innerText.split(' ')[0],
      domainRegex = /(?:https?:\/\/www.|https?:\/\/)([^\/]+)/,
      searchedUrlDomain = domainRegex.test(searchedUrlText)
        ? searchedUrlText.match(domainRegex)[1]
        : '';
    // findIndexはマッチしない場合の返り値が -1 となる
    const hasDomain = targetDeleteDomains.findIndex(
      (domain) => searchedUrlDomain === domain,
    );
    if (hasDomain > -1) dom.parentElement.removeChild(dom);
  });
};

removeTargetDom(TARGET_DOMAINS, googleTargetDOM);
