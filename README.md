# アンチ検索 Chrome 拡張機能

苦手なサイトを登録して検索結果から消し去る Chrome 拡張機能です。  
Chrome 拡張に関する勉強会用に作ってみました。
  
  
  ![AntiSearchApp](https://media.giphy.com/media/BHuu3DZK001ttPQ1At/giphy.gif)

  
## TIPS

### 任意のページへ何かスクリプトを挿入したい

Chrome Dev 公式ページ：https://developer.chrome.com/docs/extensions/mv3/content_scripts/

### この拡張機能に使われている JS の技術

一通りこなすことで以下の基本的な JavaScript の技術をアウトプットできます。

・純粋な JavaScript の基本的な関数の使い方  
・非同期処理  
・DOM 操作  
・正規表現  
・for 文関係  
・CRUD 処理  
  
## チュートリアル解説
  
各チュートリアルは回答（の一例）になっています。チュートリアル１をこなしたい人はチュートリアル０のフォルダを使って回答を進めます。
  
チュートリアル５で完成です。
  
### チュートリアル１
  
どのようなコードでも良いのでまずは Google の検索結果から DOM を削除するまでのコード実装してみてください。
  
<details>
<summary>ヒント</summary>
</br>
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
</br>
- 配列例：const dammyDomains = ['techacademy.jp','sejuku.net','tech-camp.in']のような形でダミーデータを用意してあげます。</br></br>  
- 最低でもGoogle検索結果の消したい範囲に合わせてDOMを１つ、対象ドメインを含んだURLのDOMを取得で２つのDOMはマストです。</br></br>  
- 手順としては①Googleから必要なDOMを取得、②ダミーデータのドメインと取得したDOMの中にダミーデータのドメインと一致するものがないのかチェック③もし一致するドメインがあれば対象のDOMを削除</br></br>  
- 取得したGoogle検索結果のDOMにあるURLは"正規表現"を使ってドメイン名だけ取得できます。（他の方法ももちろんあるかと）</br></br>  
</details>

### チュートリアル 3
  
popup の簡易フォームを作成するまでのコード実装。
（CSS スタイリングはお好みです。JS 学習メインで触っていて HTML/CSS 側を扱いたくない人はチュートリアル３の内容をコピペしてもらっても構いません。）
  
<details>
<summary>ヒント</summary>
</br>
- manifest.jsonでpopupに指定している src/index.html のファイルを編集すると拡張機能アイコンをクリックした際に表示される画面を編集することができます。</br></br>
- src/index.html で最低限、必要なものは①除外したいドメインを追加するためのInputタグ周りの実装、②追加された検除外したいドメインの一覧です。</br></br> 
- DOM操作が必要なタグにはidを設定しておきましょう。document.getElementByIdで取得したDOMの方が配列になっておらず扱いやすくまた一つのDOMしか取得していないということを明示的にできるメリットがあります。</br></br> 
</br></br>  
</details>

### チュートリアル 4
  
CRUD の実装（ただし Update は実装しなくて問題ありません。完成品も実装していません。）
  
<details>
<summary>ヒント</summary>
</br>
- 今回の実装では使っていませんがjQueryを使いたい方はscriptタグと一緒にjQueryを埋め込めば使えるようになります。</br></br>  
- popup.jsというファイルを作成しましょう。そして index.html へscriptタグと一緒に埋め込みましょう。index.htmlはユーザーが操作するためのポップアップ画面ですから、そこでのインプットを受け取って処理を続けていく必要があるためです。</br></br>  
- Create（ユーザーが新しくドメインを追加するための処理）、Read（すでに追加されたデータを読み込んだりデータが更新された際に読み込み直すための処理）、Update（追加したドメインの編集機能に当たりますが今回は実装していません。）、Delete（追加したドメインを削除する処理です。処理した直後はDOMの操作も必要です。）</br></br>  
</br></br>  
</details>

### チュートリアル 5

content-script.js へ CRUD 側で保存したデータを引っ張って検索結果に反映させる実装。

<details>
<summary>ヒント</summary>
</br>
- ダミーデータを使用してGoogle検索結果を削除する処理を書いていました。そこをchrome.storage.sync.getでデータを取得してから削除する処理に書き換えることで実現できます。</br></br>  
- chrome.storage.sync.getは非同期処理と一緒にデータを引っ張れば取得できます。データをstorageから取得した後に処理を続行させることができます。</br></br>  
</details>

## 作り終わった人へ

例：  
popup 側の見た目をリッチにする  
重複したドメインを登録できなくする  
お気に入りのサイトに色をつけてみる  
ディレクトリで登録したサイトを管理できるようにする  
検索結果のところにワンクリックで登録できるボタンを設置する  
不具合の修正（検索結果によって表示の仕方が異なる箇所にも対応するなど）  
削除した件数を表示させる  
Youtube 版を作ってみる

などなど、オリジナルの機能を追加してみようっっっ！！！！
