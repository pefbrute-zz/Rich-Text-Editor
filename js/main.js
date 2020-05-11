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

rangy.init();
var strongApplier;
strongApplier = rangy.createClassApplier("strong");
var underlinedApplier;
underlinedApplier = rangy.createClassApplier("u");
var emphasizedApplier;
emphasizedApplier = rangy.createClassApplier("em");
var alignRightApplier;
alignRightApplier = rangy.createClassApplier("align-right");
var alignLeftApplier;
alignLeftApplier = rangy.createClassApplier("align-left");
var alignCenterApplier;
alignCenterApplier = rangy.createClassApplier("align-center");
var alignJustifyApplier;
alignJustifyApplier = rangy.createClassApplier("align-justify");

function addDropdown() {
  var dropdown = document.getElementById("dropdown");
  if (dropdown.className == "hidden") {
    dropdown.className = "dropdown";
  } else {
    dropdown.className = "hidden";
  }
}

function addClass(className) {
  switch (className) {
    case "strong":
      strongApplier.toggleSelection();
    case "u":
      underlinedApplier.toggleSelection();
    case "em":
      emphasizedApplier.toggleSelection();
  }
}

function addContainerClass(className) {
  var selection = document.getSelection(),
    range = selection.getRangeAt(0),
    wrongContainer = document.getElementById("sample-toolbar");

  if (
    selection.type != "Caret" &&
    range.commonAncestorContainer != wrongContainer
  ) {
    var mainContainer = document.getElementById("work-area"),
      anchorNode = selection.anchorNode,
      focusNode = selection.focusNode,
      firstSelectedElement = anchorNode,
      lastSelectedElement = focusNode,
      startContainer = selection.getRangeAt(0).startContainer,
      endContainer = selection.getRangeAt(0).endContainer;

    if (
      firstSelectedElement != startContainer &&
      selection.focusNode != endContainer
    ) {
      firstSelectedElement = focusNode;
      lastSelectedElement = anchorNode;
    }
    while (lastSelectedElement.parentElement != mainContainer) {
      lastSelectedElement = lastSelectedElement.parentElement;
    }
    do {
      while (firstSelectedElement.parentElement != mainContainer) {
        firstSelectedElement = firstSelectedElement.parentElement;
      }
      if (firstSelectedElement.className == className) {
        firstSelectedElement.className = "";
      } else {
        firstSelectedElement.className = className;
      }
      firstSelectedElement = firstSelectedElement.nextSibling;
    } while (
      firstSelectedElement.nextSibling != null &&
      firstSelectedElement.nextSibling != lastSelectedElement.nextElementSibling
    );
  }
}
