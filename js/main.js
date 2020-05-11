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
  if (className == "strong") {
    strongApplier.toggleSelection();
  }
  if (className == "u") {
    underlinedApplier.toggleSelection();
  }
  if (className == "em") {
    emphasizedApplier.toggleSelection();
  }
  if (className == "align-left") {
    alignleftApplier.toggleSelection();
  }
  if (className == "align-center") {
    alignCenterApplier.toggleSelection();
  }
  if (className == "align-right") {
    alignRightApplier.toggleSelection();
  }
  if (className == "align-justify") {
    alignJustifyApplier.toggleSelection();
  }
}

function addContainerClass(className) {
  var selection = document.getSelection();
  var range = selection.getRangeAt(0);
  var wrongContainer = document.getElementById("sample-toolbar");
  if (
    selection.type != "Caret" &&
    range.commonAncestorContainer != wrongContainer
  ) {
    var mainContainer = document.getElementById("work-area");
    var selectionParent = selection.anchorNode;
    var lastNode = selection.focusNode;
    var startContainer = selection.getRangeAt(0).startContainer;
    var endContainer = selection.getRangeAt(0).endContainer;
    if (
      selectionParent != startContainer &&
      selection.focusNode != endContainer
    ) {
      selectionParent = selection.focusNode;
      lastNode = selection.anchorNode;
    }
    while (lastNode.parentElement != mainContainer) {
      lastNode = lastNode.parentElement;
    }
    do {
      while (selectionParent.parentElement != mainContainer) {
        selectionParent = selectionParent.parentElement;
      }
      if (selectionParent.className == className) {
        selectionParent.className = "";
      } else {
        selectionParent.className = className;
      }
      selectionParent = selectionParent.nextSibling;
    } while (
      selectionParent.nextSibling != null &&
      selectionParent.nextSibling != lastNode.nextElementSibling
    );
    // }
  }
}
