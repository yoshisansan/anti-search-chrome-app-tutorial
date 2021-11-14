'use strict'

// tutorial2
// 任意のURLを検索結果に表示しないようにする
const getSaveData = () => new Promise(resolve => {
  chrome.storage.sync.get(null, resolve);
});
// const TARGET_DOMAINS = ['techacademy.jp','sejuku.net'];
const googleTargetDOM = Array.from(document.querySelectorAll("#rso > div"));

const removeTargetDom = (targetDeleteDomains, targetDOM) => {
  // 取得したNodeListはArray.form()で配列化して配列として扱えるようにする
  targetDOM.map(dom => {
    const DOMofIncludingUrl = dom.querySelector("div > cite"),
      // DOMofIncludingUrl.innerTextの中身 'https://developer.mozilla.org › API' のようになっており小さい空白部分をsplitさせる
      searchedUrlText = DOMofIncludingUrl.innerText.split(' ')[0],
      domainRegex = /(?:https?:\/\/www.|https?:\/\/)([^\/]+)/,
      searchedUrlDomain = searchedUrlText.match(domainRegex)[1];
    // findIndexはマッチしない場合の返り値が -1 となる
    const hasDomain = targetDeleteDomains.findIndex(domain => searchedUrlDomain === domain);
    if(hasDomain > -1) dom.parentElement.removeChild(dom);
  });
}

(async() => {
  const saveData = await getSaveData().then((res) => res)
  const targetDomains = Object.values(saveData);
  removeTargetDom(targetDomains, googleTargetDOM);
})();
