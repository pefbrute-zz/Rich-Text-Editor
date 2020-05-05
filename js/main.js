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

function test() {
  // makeBold();
  console.log(document.getSelection());
}

// function makeBold() {
//   let txtInput,
//     sel,
//     startPos,
//     endPos,
//     txt,
//     boldTxt,
//     range,
//     wholeTxt,
//     txtWithBold;
//   txtInput = document.getElementById("work-area");
//   sel = window.getSelection();
//   if (sel.anchorOffset != sel.focusOffset) {
//     console.log(sel.anchorOffset, sel.focusOffset);
//     txt = sel.toString();
//     boldTxt = txt.bold();
//     startPos = sel.anchorOffset;
//     endPos = sel.focusOffset;
//     if (startPos > endPos) {
//       startPos = endPos;
//     }
//     console.log(sel.anchorOffset, sel.focusOffset);
//     sel.deleteFromDocument();
//     sel.removeAllRanges();
//     range = document.createRange();
//     range.setStart(txtInput, 0);
//     range.setEnd(txtInput, 1);
//     sel.addRange(range);
//     wholeTxt = sel.toString();
//     console.log(
//       // sel, ' ',
//       txt,
//       " ",
//       boldTxt,
//       " ",
//       startPos,
//       " ",
//       endPos
//     );
//     // wholeTxt.slice(0, startPos) + boldTxt + wholeTxt.slice(startPos + Math.abs(0));
//     txtWithBold =
//       wholeTxt.substr(0, startPos) + boldTxt + wholeTxt.substr(startPos);
//     // window.getSelection().getRangeAt(0).deleteContents();

//     txtInput.innerHTML = "";
//     txtInput.innerHTML = txtWithBold;
//   } else {
//     window.alert("You selected nothing — select something");
//   }
// }
