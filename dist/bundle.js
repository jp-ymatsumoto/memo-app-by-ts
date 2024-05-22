/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/storage.ts\");\n\n// ************************************************************\n// 要素一覧\n// ************************************************************\nconst memoList = document.getElementById(\"list\");\nconst memoTitle = document.getElementById(\"memoTitle\");\nconst memoBody = document.getElementById(\"memoBody\");\nconst addButton = document.getElementById(\"add\");\nconst editButton = document.getElementById(\"edit\");\nconst saveButton = document.getElementById(\"save\");\nconst deleteButton = document.getElementById(\"delete\");\n// ************************************************************\n// 処理\n// ************************************************************\nlet memos = [];\nlet memoIndex = 0;\naddButton.addEventListener(\"click\", clickAddMemo);\neditButton.addEventListener(\"click\", clickEditMemo);\nsaveButton.addEventListener(\"click\", clickSaveMemo);\ndeleteButton.addEventListener(\"click\", clickDeleteMemo);\ninit();\n// ************************************************************\n// 関数一覧\n// ************************************************************\n/**\n * 初期化\n */\nfunction init() {\n    // ローカルストレージからすべてのメモを取得する\n    memos = (0,_storage__WEBPACK_IMPORTED_MODULE_0__.readLocalStorage)(_storage__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEY);\n    if (memos.length === 0) {\n        // 新しいメモを２つ作成する\n        memos.push(newMemo());\n        memos.push(newMemo());\n        // すべてのメモをローカルストレージに保存する\n        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveLocalStorage)(_storage__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEY, memos);\n    }\n    // すべてのメモのタイトルを一覧で表示する\n    showMemoElements(memoList, memos);\n    // メモ一覧のタイトルにアクティブなスタイルを設定する\n    setActiveStyle(memoIndex + 1, true);\n    // 選択中のメモ情報を表示用のメモ要素に設定する\n    setMemoElement();\n    // // 保存ボタンを非表示し編集ボタンを表示にする\n    setHiddenButton(saveButton, false);\n    setHiddenButton(editButton, true);\n}\n/**\n * 新しいメモを作成する\n * @returns {Memo} 新しいメモ\n */\nfunction newMemo() {\n    const timestamp = Date.now();\n    return {\n        id: timestamp.toString() + memos.length.toString(),\n        title: `new memo ${memos.length + 1}`,\n        body: \"\",\n        createdAt: timestamp,\n        updatedAt: timestamp,\n    };\n}\n/**\n * メモの設定する\n */\nfunction setMemoElement() {\n    const memo = memos[memoIndex];\n    // メモを表示する要素にタイトルと本文を設定する\n    memoTitle.value = memo.title;\n    memoBody.value = memo.body;\n}\n/**\n * メモの要素を作成する\n * @param {Memo} memo メモ\n * @returns {HTMLDivElement}\n */\nfunction newMemoElement(memo) {\n    // div要素を作成する\n    const div = document.createElement(\"div\");\n    // div要素にメモのタイトルを設定する\n    div.innerText = memo.title;\n    // div要素のdata-id属性にメモIDを設定する\n    div.setAttribute(\"data-id\", memo.id);\n    // div要素のclass属性にスタイルを設定する\n    div.classList.add(\"w-full\", \"p-sm\");\n    div.addEventListener(\"click\", selectedMemo);\n    return div;\n}\n/**\n * すべてのメモ要素を削除する\n * @param {HTMLDivElement} div メモ一覧のdiv要素\n */\nfunction clearMemoElements(div) {\n    div.innerText = \"\";\n}\n/**\n * すべてのメモ要素を表示する\n * @param {HTMLDivElement} div メモ一覧のdiv要素\n * @param {Memo[]} memos すべてのメモ\n */\nfunction showMemoElements(div, memos) {\n    // メモ一覧をクリアする\n    clearMemoElements(div);\n    memos.forEach((memo) => {\n        // メモのタイトルの要素を作成する\n        const memoElement = newMemoElement(memo);\n        // メモ一覧の末尾にメモのタイトルの要素を追加する\n        div.appendChild(memoElement);\n    });\n}\n/**\n * div要素にアクティブスタイルを設定する\n * @param {number} index 設定する要素のインデックス\n * @param {boolean} isActive true:追加 false:削除\n */\nfunction setActiveStyle(index, isActive) {\n    const selector = `#list > div:nth-child(${index})`;\n    const element = document.querySelector(selector);\n    if (isActive) {\n        element.classList.add(\"active\");\n    }\n    else {\n        element.classList.remove(\"active\");\n    }\n}\n/**\n * button要素の表示・非表示を設定する\n * @param {HTMLButtonElement} button\n * @param {boolean} isHidden true:\n */\nfunction setHiddenButton(button, isHidden) {\n    if (isHidden) {\n        button.removeAttribute(\"hidden\");\n    }\n    else {\n        button.setAttribute(\"hidden\", \"hidden\");\n    }\n}\n/**\n * タイトルと本文の要素のdisabled属性を設定する\n * @param editMode true:編集モード false:表示モード\n */\nfunction setEditMode(editMode) {\n    if (editMode) {\n        memoTitle.removeAttribute(\"disabled\");\n        memoBody.removeAttribute(\"disabled\");\n    }\n    else {\n        memoTitle.setAttribute(\"disabled\", \"disabled\");\n        memoBody.setAttribute(\"disabled\", \"disabled\");\n    }\n}\n// ************************************************************\n// イベント関連の関数一覧\n// ************************************************************\n/**\n * 追加ボタンが押された時の処理\n * @param {MouseEvent} event\n */\nfunction clickAddMemo(event) {\n    // タイトルと本文を編集モードにする\n    setEditMode(true);\n    // 保存ボタンを表示し編集ボタンを非表示にする\n    setHiddenButton(saveButton, true);\n    setHiddenButton(editButton, false);\n    // 新しいメモを追加する\n    memos.push(newMemo());\n    // すべてのメモをローカルストレージに保存する\n    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveLocalStorage)(_storage__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEY, memos);\n    // 新しいメモが追加されたインデックスを設定する\n    memoIndex = memos.length - 1;\n    // メモ一覧にタイトルを表示する\n    showMemoElements(memoList, memos);\n    // メモ一覧のタイトルにアクティブなスタイルを設定する\n    setActiveStyle(memoIndex + 1, true);\n    // 選択中のメモ情報を表示用のメモ要素に設定する\n    setMemoElement();\n}\n/**\n * メモが選択された時の処理\n * @param {MouseEvent} event\n */\nfunction selectedMemo(event) {\n    // タイトルと本文を表示モードにする\n    setEditMode(false);\n    // 保存ボタンを非表示し編集ボタンを表示にする\n    setHiddenButton(saveButton, false);\n    setHiddenButton(editButton, true);\n    // メモ一覧のタイトルにアクティブなスタイルを設定する\n    setActiveStyle(memoIndex + 1, false);\n    // クリックされたdiv要素を取得する\n    const target = event.target;\n    // div要素のdata-id属性からメモIDを取得する\n    const id = target.getAttribute(\"data-id\");\n    // すべてのメモから選択されたメモのインデックスを取得する\n    memoIndex = memos.findIndex((memo) => memo.id === id);\n    // 選択中のメモ情報を表示用のメモ要素に設定する\n    setMemoElement();\n    // メモ一覧のタイトルにアクティブなスタイルを設定する\n    setActiveStyle(memoIndex + 1, true);\n}\n/**\n * 編集ボタンが押された時の処理\n * @param {MouseEvent} event\n */\nfunction clickEditMemo(event) {\n    // タイトルと本文を編集モードにする\n    setEditMode(true);\n    // 保存ボタンを表示し編集ボタンを非表示にする\n    setHiddenButton(saveButton, true);\n    setHiddenButton(editButton, false);\n}\n/**\n * 保存ボタンが押された時の処理\n * @param {MouseEvent} event\n */\nfunction clickSaveMemo(event) {\n    const memo = memos[memoIndex];\n    memo.title = memoTitle.value;\n    memo.body = memoBody.value;\n    memo.updatedAt = Date.now();\n    // すべてのメモをローカルストレージに保存する\n    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveLocalStorage)(_storage__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEY, memos);\n    // タイトルと本文を表示モードにする\n    setEditMode(false);\n    // 保存ボタンを非表示し編集ボタンを表示にする\n    setHiddenButton(saveButton, false);\n    setHiddenButton(editButton, true);\n    // すべてのメモのタイトルを一覧で表示する\n    showMemoElements(memoList, memos);\n}\n/**\n * 削除ボタンが押された時の処理\n * @param {MouseEvent} event\n */\nfunction clickDeleteMemo(event) {\n    if (memos.length === 1) {\n        alert(\"これ以上削除できません。\");\n        return;\n    }\n    // 表示中のメモのIDを取得する\n    const memoId = memos[memoIndex].id;\n    // すべてのメモから表示中のメモを削除する\n    memos = memos.filter((memo) => memo.id !== memoId);\n    // ローカルストレージのデータを更新する\n    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveLocalStorage)(_storage__WEBPACK_IMPORTED_MODULE_0__.STORAGE_KEY, memos);\n    // 表示するメモのインデックスを一つ前のメモにする\n    if (1 <= memoIndex) {\n        memoIndex--;\n    }\n    // 表示するメモを設定する\n    setMemoElement();\n    // タイトルと本文を表示モードにする\n    setEditMode(false);\n    // 保存ボタンを非表示し編集ボタンを表示にする\n    setHiddenButton(saveButton, false);\n    setHiddenButton(editButton, true);\n    // すべてのメモのタイトルを一覧で表示する\n    showMemoElements(memoList, memos);\n    // メモ一覧のタイトルにアクティブなスタイルを設定する\n    setActiveStyle(memoIndex + 1, true);\n}\n\n\n//# sourceURL=webpack://memo-app-by-ts/./src/index.ts?");

/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   STORAGE_KEY: () => (/* binding */ STORAGE_KEY),\n/* harmony export */   readLocalStorage: () => (/* binding */ readLocalStorage),\n/* harmony export */   saveLocalStorage: () => (/* binding */ saveLocalStorage)\n/* harmony export */ });\n// ************************************************************\n// 変数一覧\n// ************************************************************\nconst STORAGE_KEY = \"memos\";\n// ************************************************************\n// 関数一覧\n// ************************************************************\n/**\n * ローカルストレージからすべてのメモを取得する\n * @param {string} key キー\n * @returns {Memo} すべてのメモ\n */\nfunction readLocalStorage(key) {\n    const data = localStorage.getItem(key);\n    if (data === null) {\n        return [];\n    }\n    else {\n        return JSON.parse(data);\n    }\n}\n/**\n * ローカルストレージにすべてのメモを保存する\n * @param {string} key キー\n * @param {Memo[]} data すべてのメモ\n */\nfunction saveLocalStorage(key, data) {\n    localStorage.setItem(key, JSON.stringify(data));\n}\n\n\n//# sourceURL=webpack://memo-app-by-ts/./src/storage.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;