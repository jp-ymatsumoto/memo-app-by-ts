import { Memo } from "./types";
import { STORAGE_KEY, readLocalStorage, saveLocalStorage } from "./storage";

// ************************************************************
// 要素一覧
// ************************************************************

const memoList = document.getElementById("list") as HTMLDivElement;
const memoTitle = document.getElementById("memoTitle") as HTMLInputElement;
const memoBody = document.getElementById("memoBody") as HTMLTextAreaElement;
const addButton = document.getElementById("add") as HTMLButtonElement;
const deleteButton = document.getElementById("delete") as HTMLButtonElement;
const editButton = document.getElementById("edit") as HTMLButtonElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;

// ************************************************************
// 処理
// ************************************************************
let memos: Memo[] = [];
let memoIndex: number = 0;

addButton.addEventListener("click", clickAddMemo);
deleteButton.addEventListener("click", clickDeleteMemo);
editButton.addEventListener("click", clickEditMemo);
saveButton.addEventListener("click", clickSaveMemo);

init();

// ************************************************************
// 関数一覧
// ************************************************************

/**
 * 初期化
 */
function init() {
  memos = readLocalStorage(STORAGE_KEY);
  if (memos.length === 0) {
    memos.push(newMemo());
    memos.push(newMemo());
    saveLocalStorage(STORAGE_KEY, memos);

    memoIndex = 0;

    setMemoElement();
    showMemoElements(memoList, memos);
  } else {
    memoIndex = 0;
    setMemoElement();
    showMemoElements(memoList, memos);
  }
  setActiveStyle(memoIndex + 1, true);

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
  memoTitle.value = memo.title;
  memoBody.value = memo.body;
}

/**
 * メモの要素を作成する
 * @param {Memo} memo メモ
 * @returns {HTMLDivElement}
 */
function newMemoElement(memo: Memo): HTMLDivElement {
  const div = document.createElement("div");
  div.innerText = memo.title;
  div.setAttribute("data-id", memo.id);
  div.classList.add("w-full", "p-sm");
  div.addEventListener("click", selectedMemo);
  return div;
}

function setEditMode(mode: "enabled" | "disabled") {
  if (mode === "enabled") {
    memoTitle.removeAttribute("disabled");
    memoBody.removeAttribute("disabled");
  } else if (mode === "disabled") {
    memoTitle.setAttribute("disabled", "disabled");
    memoBody.setAttribute("disabled", "disabled");
  }
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
  clearMemoElements(div);
  memos.forEach((memo) => {
    const memoElement = newMemoElement(memo);
    div.appendChild(memoElement);
  });
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

// ************************************************************
// スタイル関連の関数一覧
// ************************************************************

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
// ************************************************************
// イベント関連の関数一覧
// ************************************************************

function clickAddMemo(event: MouseEvent) {
  // 新しいメモを追加する
  memos.push(newMemo());
  // すべてのメモを保存する
  saveLocalStorage(STORAGE_KEY, memos);

  // removeActiveStyle(
  //   document.querySelector(`#list > li:nth-child(${memoIndex + 1})`) as HTMLDivElement
  // );
  setActiveStyle(memoIndex + 1, false);

  // 新しいメモが追加されたインデックスを設定する
  memoIndex = memos.length - 1;

  console.log(`#list > li:nth-child(${memos.length})`);

  console.log(document.querySelector(`#list > li:nth-child(${memos.length})`) as HTMLDivElement);

  // 表示するメモを設定する
  setMemoElement();
  // メモの一覧をクリアから表示する
  showMemoElements(memoList, memos);
  setEditMode("enabled");
  setActiveStyle(memoIndex + 1, true);
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
  // メモの一覧をクリアから表示する
  showMemoElements(memoList, memos);
  setEditMode("disabled");
  setHiddenButton(saveButton, false);
  setHiddenButton(editButton, true);
  setActiveStyle(memoIndex + 1, true);
}

function clickEditMemo(event: MouseEvent) {
  setEditMode("enabled");
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
  setEditMode("disabled");
  setHiddenButton(saveButton, false);
  setHiddenButton(editButton, true);
}

/**
 * メモが選択された時の処理
 * @param {MouseEvent} event
 */
function selectedMemo(event: MouseEvent) {
  setEditMode("disabled");
  setHiddenButton(saveButton, false);
  setHiddenButton(editButton, true);
  setActiveStyle(memoIndex + 1, false);

  const target = event.target as HTMLDivElement;
  const id = target.getAttribute("data-id");
  memoIndex = memos.findIndex((memo) => memo.id === id);
  setMemoElement();
  setActiveStyle(memoIndex + 1, true);

  setHiddenButton(saveButton, false);
  setHiddenButton(editButton, true);
}
