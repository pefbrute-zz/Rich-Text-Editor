window.addEventListener("load", function () {
  document.getElementById("work-area").setAttribute("contenteditable", "true");
});

function format(command, value) {
  document.execCommand(command, false, value);
}

function setUrl() {
  var url = document.getElementById("txtFormatUrl").value;
  var sText = document.getSelection();
  document.execCommand(
    "insertHTML",
    false,
    '<a href="' + url + '" target="_blank">' + sText + "</a>"
  );
  document.getElementById("txtFormatUrl").value = "";
}

function insertTag(tag) {
  var selected = document.getSelection();
  var selectedText = selected.toString();
  var element = document.createElement(tag);
  element.textContent = selectedText;

  var range = selected.getRangeAt(0);
  range.deleteContents();
  range.insertNode(element);
}

function insertTag2(tag) {
  var element = document.createElement(tag);
  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var range = sel.getRangeAt(0).cloneRange();
      range.surroundContents(element);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}

function test() {
  console.log(document.getSelection());
  console.log(document.getSelection().getRangeAt(0));
  console.log(document.getSelection().getRangeAt(0).cloneContents());
  var u = document.createElement('u');
  u.appendChild(document.getSelection().getRangeAt(0).cloneContents().children[0]);
  document.getSelection().getRangeAt(0).insertNode(u);
  // console.log(document.getSelection().getRangeAt(0).extractContents());
}
