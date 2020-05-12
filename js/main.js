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

// function addDropdown() {
//   var dropdown = document.getElementById("dropdown");
//   if (dropdown.className == "hidden") {
//     dropdown.className = "dropdown";
//   } else {
//     dropdown.className = "hidden";
//   }
// }

rangy.init();
var strongApplier = rangy.createClassApplier("strong"),
  uApplier = rangy.createClassApplier("u"),
  emApplier = rangy.createClassApplier("em"),
  strikeApplier = rangy.createClassApplier("strike"),
  backgroundHighlightApplier = rangy.createClassApplier("background-highlight"),
  textHighlightApplier = rangy.createClassApplier("text-highlight");
function addClass(className) {
  switch (className) {
    case "strong":
      strongApplier.toggleSelection();
      break;
    case "u":
      uApplier.toggleSelection();
      break;
    case "em":
      emApplier.toggleSelection();
      break;
    case "strike":
      strikeApplier.toggleSelection();
      break;
    case "background-highlight":
      backgroundHighlightApplier.toggleSelection();
      break;
    case "text-highlight":
      textHighlightApplier.toggleSelection();
      break;
  }
}

function findChild(element, parent) {
  while (element.parentElement != parent) {
    element = element.parentElement;
  }
  child = element;
  return child;
}

function addContainerClass(className) {
  var selection = document.getSelection(),
    range = selection.getRangeAt(0),
    wrongContainer = document.getElementById("sample-toolbar"),
    firstNode = selection.anchorNode,
    lastNode = selection.focusNode;
  if (
    firstNode.nodeName == "#text" &&
    range.commonAncestorContainer != wrongContainer
  ) {
    var mainContainer = document.getElementById("work-area"),
      firstSelectedElement = firstNode,
      lastSelectedElement = lastNode,
      startElement = range.startContainer,
      endElement = range.endContainer;

    if (
      firstSelectedElement != startElement &&
      lastSelectedElement != endElement
    ) {
      firstSelectedElement = lastNode;
      lastSelectedElement = firstNode;
    }

    lastSelectedElement = findChild(lastSelectedElement, mainContainer);
    firstSelectedElement = findChild(firstSelectedElement, mainContainer);

    do {
      if (firstSelectedElement.className == className) {
        firstSelectedElement.className = "";
      } else {
        firstSelectedElement.className = className;
      }
      firstSelectedElement = firstSelectedElement.nextSibling;
    } while (
      firstSelectedElement.nextSibling != lastSelectedElement.nextElementSibling
    );
  }
}
