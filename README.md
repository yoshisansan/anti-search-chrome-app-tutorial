# アンチ検索 Chrome 拡張機能

苦手なサイトを登録して検索結果から消し去る Chrome 拡張機能です。  
Chrome 拡張に関する勉強会用に作ってみました。

## TIPS

### 任意のページへ何かスクリプトを挿入したい

Chrome Dev 公式ページ：https://developer.chrome.com/docs/extensions/mv3/content_scripts/

## チュートリアル解説

各チュートリアルは回答（の一例）になっています。進捗別にわかれています。チュートリアル５で完成です。

### チュートリアル１

チュートリアル０のフォルダをスタート地点にどのような形で良いのでまずは検索結果から DOM を削除するまでのコード実装してみてください。

<details>
<summary>ヒント</summary>
- DOMの取得は document.getElementById や document.querySelectorAll を使うことで取得できます。</br></br>  
- manifest.jsonのcontent_scriptsのプロパティmatchに設定されたURLでコードが実行されます。</br></br>  
- chrome.action.onClicked.addListener を使うとURLがmatchしたタイミングを検知できます。</br></br>  
- ↑はブラウザサイドの検知になるためbackground.jsに関わります。</br></br>  
- chrome.scripting.executeScriptで任意のファイルを実行できます。</br></br>  
- content-script.jsは表示されたURLのDOMツリーに対してコードを実行できます。</br></br>  
- 任意のDOMを取得したい人はブラウザのDevツールで表示したHTMLに対して「JSパスをコピー」で単一DOMを取得できるコードをコピーできます。</br></br>  
</details>  
  
### チュートリアル2
ダミー配列データを使って対象の検索結果を取り除くスクリプトを実装するまでのコード実装。
  
<details>
<summary>ヒント</summary>
- 配列例：const TARGET_DOMAINS = ['techacademy.jp','sejuku.net','tech-camp.in']</br>  
- 消したいDOMの取得はマストです。</br>  
- ↑はブラウザサイドの検知になるためbackground.jsに関わります。</br>  
- chrome.scripting.executeScriptで任意のファイルを実行できます。</br>  
- content-script.jsは表示されたURLのDOMツリーに対してコードを実行できます。</br>  
- 任意のDOMを取得したい人はブラウザのDevツールで表示したHTMLに対して「JSパスをコピー」で単一DOMを取得できるコードをコピーできます。</br>  
</details>  
### チュートリアル3
popupの簡易フォームを作成するまでのコード実装。
  
### チュートリアル4
CRUDの実装
  
### チュートリアル5
content-script.jsへCRUD側で保存したデータを引っ張って検索結果に反映させる実装。
## 作り終わった人へ
例：  
popup側の見た目をリッチにする  
重複したドメインを登録できなくする  
お気に入りのサイトに色をつけてみる  
ディレクトリで登録したサイトを管理できるようにする  
検索結果のところにワンクリックで登録できるボタンを設置する  
不具合の修正（検索結果によって表示の仕方が異なる箇所にも対応するなど）  
削除した件数を表示させる  
Youtube版を作ってみる  
  
  
などなど、オリジナルの機能を追加してみようっっっ！！！！
