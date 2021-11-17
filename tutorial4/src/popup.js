'use strict';
const addDomainBtn = document.getElementById('AddDomain');
const domainLists = document.getElementById('DomainLists');

// Create処理 //
const getSaveData = () =>
  new Promise((resolve) => {
    chrome.storage.sync.get(null, resolve);
  });

addDomainBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const inputElm = document.getElementById('InputStr');
  const domainRegex = /(?:https?:\/\/www.|https?:\/\/)([^\/]+)/;
  const domain = inputElm.value.match(domainRegex)[1];
  if (domain === null) return;

  const saveDataObj = await getSaveData().then((res) => res);
  const length = Object.keys(saveDataObj).length;
  chrome.storage.sync.set({ [`key${length + 1}`]: domain }, () => {
    console.log('ドメイン名' + domain + 'を除外ドメインとして登録しました');
  });
  readSaveData();
});

// Read処理 //
const readSaveData = () => {
  chrome.storage.sync.get(null, (res) => {
    console.log(res);
    const domainDOMs = Object.values(res)
      .map(
        (domain, i) =>
          `<li class="domains__list">${domain}<button id="key${
            i + 1
          }" class="domains__list-btn">消す</button></li>`,
      )
      .join('');
    domainLists.innerHTML = domainDOMs;
  });
};

// Update処理 //
//省略

// Delete処理 //
const deleteSaveData = async (e) => {
  await chrome.storage.sync.remove(e.key);
  readSaveData();
};

// domainListsの中身のliリストに変更があったら発火する処理
const observer = new MutationObserver(async (records) => {
  const domainLists = Array.from(records[0].addedNodes);
  domainLists.forEach(async (li) => {
    li.querySelector('.domains__list-btn').addEventListener(
      'click',
      async (e) => {
        // 消すボタンを押すと対象エレメントを消してkey1,key2...で入れ直す処理
        await chrome.storage.sync.remove(e.target.id);
        const saveDataObj = await getSaveData().then((res) => res);
        await chrome.storage.sync.clear();
        Object.values(saveDataObj).map((domain, i) =>
          chrome.storage.sync.set({ [`key${i + 1}`]: domain }),
        );
        readSaveData();
      },
    );
  });
});

observer.observe(domainLists, {
  childList: true,
});

readSaveData();
