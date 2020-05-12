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

function addDropdown(type) {
  var dropdown = document.getElementById(type);
  if (dropdown.className == "hidden") {
    dropdown.className = type;
  } else {
    dropdown.className = "hidden";
  }
}

rangy.init();
var strongApplier = rangy.createClassApplier("strong"),
  uApplier = rangy.createClassApplier("u"),
  emApplier = rangy.createClassApplier("em"),
  strikeApplier = rangy.createClassApplier("strike"),
  backgroundHighlightApplier = rangy.createClassApplier("background-highlight"),
  textHighlightApplier = rangy.createClassApplier("text-highlight"),
  textHighlightBlack0Applier = rangy.createClassApplier(
    "text-highlight-black0"
  ),
  textHighlightRed0Applier = rangy.createClassApplier("text-highlight-red0"),
  textHighlightOrange0Applier = rangy.createClassApplier(
    "text-highlight-orange0"
  ),
  textHighlightYellow0Applier = rangy.createClassApplier(
    "text-highlight-yellow0"
  ),
  textHighlightGreen0Applier = rangy.createClassApplier(
    "text-highlight-green0"
  ),
  textHighlightBlue0Applier = rangy.createClassApplier("text-highlight-blue0"),
  textHighlightViolet0Applier = rangy.createClassApplier(
    "text-highlight-violet0"
  ),
  textHighlightBlack1Applier = rangy.createClassApplier(
    "text-highlight-black1"
  ),
  textHighlightRed1Applier = rangy.createClassApplier("text-highlight-red1"),
  textHighlightOrange1Applier = rangy.createClassApplier(
    "text-highlight-orange1"
  ),
  textHighlightYellow1Applier = rangy.createClassApplier(
    "text-highlight-yellow1"
  ),
  textHighlightGreen1Applier = rangy.createClassApplier(
    "text-highlight-green1"
  ),
  textHighlightBlue1Applier = rangy.createClassApplier("text-highlight-blue1"),
  textHighlightViolet1Applier = rangy.createClassApplier(
    "text-highlight-violet1"
  ),
  textHighlightBlack2Applier = rangy.createClassApplier(
    "text-highlight-black2"
  ),
  textHighlightRed2Applier = rangy.createClassApplier("text-highlight-red2"),
  textHighlightOrange2Applier = rangy.createClassApplier(
    "text-highlight-orange2"
  ),
  textHighlightYellow2Applier = rangy.createClassApplier(
    "text-highlight-yellow2"
  ),
  textHighlightGreen2Applier = rangy.createClassApplier(
    "text-highlight-green2"
  ),
  textHighlightBlue2Applier = rangy.createClassApplier("text-highlight-blue2"),
  textHighlightViolet2Applier = rangy.createClassApplier(
    "text-highlight-violet2"
  ),
  textHighlightBlack3Applier = rangy.createClassApplier(
    "text-highlight-black3"
  ),
  textHighlightRed3Applier = rangy.createClassApplier("text-highlight-red3"),
  textHighlightOrange3Applier = rangy.createClassApplier(
    "text-highlight-orange3"
  ),
  textHighlightYellow3Applier = rangy.createClassApplier(
    "text-highlight-yellow3"
  ),
  textHighlightGreen3Applier = rangy.createClassApplier(
    "text-highlight-green3"
  ),
  textHighlightBlue3Applier = rangy.createClassApplier("text-highlight-blue3"),
  textHighlightViolet3Applier = rangy.createClassApplier(
    "text-highlight-violet3"
  ),
  textHighlightBlack4Applier = rangy.createClassApplier(
    "text-highlight-black4"
  ),
  textHighlightRed4Applier = rangy.createClassApplier("text-highlight-red4"),
  textHighlightOrange4Applier = rangy.createClassApplier(
    "text-highlight-orange4"
  ),
  textHighlightYellow4Applier = rangy.createClassApplier(
    "text-highlight-yellow4"
  ),
  textHighlightGreen4Applier = rangy.createClassApplier(
    "text-highlight-green4"
  ),
  textHighlightBlue4Applier = rangy.createClassApplier("text-highlight-blue4"),
  textHighlightViolet4Applier = rangy.createClassApplier(
    "text-highlight-violet4"
  );

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
    case "text-highlight-black0":
      textHighlightBlack0Applier.toggleSelection();
      break;
    case "text-highlight-red0":
      textHighlightRed0Applier.toggleSelection();
      break;
    case "text-highlight-orange0":
      textHighlightOrange0Applier.toggleSelection();
      break;
    case "text-highlight-yellow0":
      textHighlightYellow0Applier.toggleSelection();
      break;
    case "text-highlight-green0":
      textHighlightGreen0Applier.toggleSelection();
      break;
    case "text-highlight-blue0":
      textHighlightBlue0Applier.toggleSelection();
      break;
    case "text-highlight-violet0":
      textHighlightViolet0Applier.toggleSelection();
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
