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

function makeBold() {
  var strongApplier, underlinedApplier, emphasizedApplier;
  window.onload = function () {
    rangy.init();
    strongApplier = rangy.createClassApplier("strong");
    underlinedApplier = rangy.createClassApplier("u");
    emphasizedApplier = rangy.createClassApplier("em");
  };
}

rangy.init();
var strongApplier;
strongApplier = rangy.createClassApplier("strong");
var underlinedApplier;
underlinedApplier = rangy.createClassApplier("u");
var emphasizedApplier;
emphasizedApplier = rangy.createClassApplier("em");

function makeTag(tag) {
  if (tag == "strong") {
    strongApplier.toggleSelection();
  }
  if (tag == "u") {
    underlinedApplier.toggleSelection();
  }
  if (tag == "em") {
    emphasizedApplier.toggleSelection();
  }
}
