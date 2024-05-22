import { Memo } from "./types";
import { STORAGE_KEY, readLocalStorage, saveLocalStorage } from "./storage";

// ************************************************************
// 要素一覧
// ************************************************************

const memoList = document.getElementById("list") as HTMLDivElement;
const memoTitle = document.getElementById("memoTitle") as HTMLInputElement;
const memoBody = document.getElementById("memoBody") as HTMLTextAreaElement;
const addButton = document.getElementById("add") as HTMLButtonElement;
const editButton = document.getElementById("edit") as HTMLButtonElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;
const deleteButton = document.getElementById("delete") as HTMLButtonElement;

// ************************************************************
// 処理
// ************************************************************

let memos: Memo[] = [];
let memoIndex: number = 0;

addButton.addEventListener("click", clickAddMemo);
editButton.addEventListener("click", clickEditMemo);
saveButton.addEventListener("click", clickSaveMemo);
deleteButton.addEventListener("click", clickDeleteMemo);

init();

// ************************************************************
// 関数一覧
// ************************************************************

/**
 * 初期化
 */
function init() {
  // ローカルストレージからすべてのメモを取得する
  memos = readLocalStorage(STORAGE_KEY);
  if (memos.length === 0) {
    // 新しいメモを２つ作成する
    memos.push(newMemo());
    memos.push(newMemo());
    // すべてのメモをローカルストレージに保存する
    saveLocalStorage(STORAGE_KEY, memos);
  }
  // すべてのメモのタイトルを一覧で表示する
  showMemoElements(memoList, memos);
  // メモ一覧のタイトルにアクティブなスタイルを設定する
  setActiveStyle(memoIndex + 1, true);
  // 選択中のメモ情報を表示用のメモ要素に設定する
  setMemoElement();
  // // 保存ボタンを非表示し編集ボタンを表示にする
  setHiddenButton(saveButton, false);
  setHiddenButton(editButton, true);
}

/**
 * 新しいメモを作成する
 * @returns {Memo} 新しいメモ
 */
function newMemo(): Memo {
  const timestamp: number = Date.now();
  return {
    id: timestamp.toString() + memos.length.toString(),
    title: `new memo ${memos.length + 1}`,
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

/**
 * メモの設定する
 */
function setMemoElement() {
  const memo: Memo = memos[memoIndex];
  // メモを表示する要素にタイトルと本文を設定する
  memoTitle.value = memo.title;
  memoBody.value = memo.body;
}

/**
 * メモの要素を作成する
 * @param {Memo} memo メモ
 * @returns {HTMLDivElement}
 */
function newMemoElement(memo: Memo): HTMLDivElement {
  // div要素を作成する
  const div = document.createElement("div");
  // div要素にメモのタイトルを設定する
  div.innerText = memo.title;
  // div要素のdata-id属性にメモIDを設定する
  div.setAttribute("data-id", memo.id);
  // div要素のclass属性にスタイルを設定する
  div.classList.add("w-full", "p-sm");
  div.addEventListener("click", selectedMemo);
  return div;
}

/**
 * すべてのメモ要素を削除する
 * @param {HTMLDivElement} div メモ一覧のdiv要素
 */
function clearMemoElements(div: HTMLDivElement) {
  div.innerText = "";
}

/**
 * すべてのメモ要素を表示する
 * @param {HTMLDivElement} div メモ一覧のdiv要素
 * @param {Memo[]} memos すべてのメモ
 */
function showMemoElements(div: HTMLDivElement, memos: Memo[]) {
  // メモ一覧をクリアする
  clearMemoElements(div);
  memos.forEach((memo) => {
    // メモのタイトルの要素を作成する
    const memoElement = newMemoElement(memo);
    // メモ一覧の末尾にメモのタイトルの要素を追加する
    div.appendChild(memoElement);
  });
}

/**
 * div要素にアクティブスタイルを設定する
 * @param {number} index 設定する要素のインデックス
 * @param {boolean} isActive true:追加 false:削除
 */
function setActiveStyle(index: number, isActive: boolean) {
  const selector = `#list > div:nth-child(${index})`;
  const element = document.querySelector(selector) as HTMLDivElement;
  if (isActive) {
    element.classList.add("active");
  } else {
    element.classList.remove("active");
  }
}

/**
 * button要素の表示・非表示を設定する
 * @param {HTMLButtonElement} button
 * @param {boolean} isHidden true:
 */
function setHiddenButton(button: HTMLButtonElement, isHidden: boolean) {
  if (isHidden) {
    button.removeAttribute("hidden");
  } else {
    button.setAttribute("hidden", "hidden");
  }
}

/**
 * タイトルと本文の要素のdisabled属性を設定する
 * @param editMode true:編集モード false:表示モード
 */
function setEditMode(editMode: boolean) {
  if (editMode) {
    memoTitle.removeAttribute("disabled");
    memoBody.removeAttribute("disabled");
  } else {
    memoTitle.setAttribute("disabled", "disabled");
    memoBody.setAttribute("disabled", "disabled");
  }
}

// ************************************************************
// イベント関連の関数一覧
// ************************************************************

/**
 * 追加ボタンが押された時の処理
 * @param {MouseEvent} event
 */
function clickAddMemo(event: MouseEvent) {
  // タイトルと本文を編集モードにする
  setEditMode(true);
  // 保存ボタンを表示し編集ボタンを非表示にする
  setHiddenButton(saveButton, true);
  setHiddenButton(editButton, false);
  // 新しいメモを追加する
  memos.push(newMemo());
  // すべてのメモをローカルストレージに保存する
  saveLocalStorage(STORAGE_KEY, memos);
  // 新しいメモが追加されたインデックスを設定する
  memoIndex = memos.length - 1;
  // メモ一覧にタイトルを表示する
  showMemoElements(memoList, memos);
  // メモ一覧のタイトルにアクティブなスタイルを設定する
  setActiveStyle(memoIndex + 1, true);
  // 選択中のメモ情報を表示用のメモ要素に設定する
  setMemoElement();
}

/**
 * メモが選択された時の処理
 * @param {MouseEvent} event
 */
function selectedMemo(event: MouseEvent) {
  // タイトルと本文を表示モードにする
  setEditMode(false);
  // 保存ボタンを非表示し編集ボタンを表示にする
  setHiddenButton(saveButton, false);
  setHiddenButton(editButton, true);
  // メモ一覧のタイトルにアクティブなスタイルを設定する
  setActiveStyle(memoIndex + 1, false);

  // クリックされたdiv要素を取得する
  const target = event.target as HTMLDivElement;
  // div要素のdata-id属性からメモIDを取得する
  const id = target.getAttribute("data-id");
  // すべてのメモから選択されたメモのインデックスを取得する
  memoIndex = memos.findIndex((memo) => memo.id === id);
  // 選択中のメモ情報を表示用のメモ要素に設定する
  setMemoElement();
  // メモ一覧のタイトルにアクティブなスタイルを設定する
  setActiveStyle(memoIndex + 1, true);
}

/**
 * 編集ボタンが押された時の処理
 * @param {MouseEvent} event
 */
function clickEditMemo(event: MouseEvent) {
  // タイトルと本文を編集モードにする
  setEditMode(true);
  // 保存ボタンを表示し編集ボタンを非表示にする
  setHiddenButton(saveButton, true);
  setHiddenButton(editButton, false);
}

/**
 * 保存ボタンが押された時の処理
 * @param {MouseEvent} event
 */
function clickSaveMemo(event: MouseEvent) {
  const memo = memos[memoIndex];
  memo.title = memoTitle.value;
  memo.body = memoBody.value;
  memo.updatedAt = Date.now();
  // すべてのメモをローカルストレージに保存する
  saveLocalStorage(STORAGE_KEY, memos);
  // タイトルと本文を表示モードにする
  setEditMode(false);
  // 保存ボタンを非表示し編集ボタンを表示にする
  setHiddenButton(saveButton, false);
  setHiddenButton(editButton, true);
  // すべてのメモのタイトルを一覧で表示する
  showMemoElements(memoList, memos);
}

/**
 * 削除ボタンが押された時の処理
 * @param {MouseEvent} event
 */
function clickDeleteMemo(event: MouseEvent) {
  if (memos.length === 1) {
    alert("これ以上削除できません。");
    return;
  }
  // 表示中のメモのIDを取得する
  const memoId = memos[memoIndex].id;
  // すべてのメモから表示中のメモを削除する
  memos = memos.filter((memo) => memo.id !== memoId);
  // ローカルストレージのデータを更新する
  saveLocalStorage(STORAGE_KEY, memos);
  // 表示するメモのインデックスを一つ前のメモにする
  if (1 <= memoIndex) {
    memoIndex--;
  }
  // 表示するメモを設定する
  setMemoElement();
  // タイトルと本文を表示モードにする
  setEditMode(false);
  // 保存ボタンを非表示し編集ボタンを表示にする
  setHiddenButton(saveButton, false);
  setHiddenButton(editButton, true);
  // すべてのメモのタイトルを一覧で表示する
  showMemoElements(memoList, memos);
  // メモ一覧のタイトルにアクティブなスタイルを設定する
  setActiveStyle(memoIndex + 1, true);
}
