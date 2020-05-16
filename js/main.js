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
function makeColorAppliers(ColorObject, classesNumber, colorName) {
  var number = 0;
  while (number <= classesNumber) {
    className = "text-highlight-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Text[number] = rangy.createClassApplier(className);

    className = "background-highlight-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Background[number] = rangy.createClassApplier(
      className
    );
    number++;
  }
}

var classesNumber = 4,
  ColorAppliers = {},
  colors = ["Black", "Red", "Orange", "Yellow", "Green", "Blue", "Violet"];
for (var i = 0; i <= colors.length - 1; i++) {
  ColorAppliers[colors[i]] = {};
  ColorAppliers[colors[i]]["Text"] = {};
  ColorAppliers[colors[i]]["Background"] = {};
}

for (var i = 0; i <= colors.length - 1; i++) {
  makeColorAppliers(ColorAppliers, classesNumber, colors[i]);
}

var capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

function addColor(color, type, number) {
  color = capitalizeFirstLetter(color);
  type = capitalizeFirstLetter(type);
  ColorAppliers[color][type][number].toggleSelection();
}

var Options = {
  Strong: { elementTagName: "strong" },
  U: { elementTagName: "u" },
  Em: { elementTagName: "em" },
  Strike: { elementTagName: "strike" },
};

var TagAppliers = {
  Strong: rangy.createClassApplier("strong", Options["Strong"]),
  U: rangy.createClassApplier("u", Options["U"]),
  Em: rangy.createClassApplier("em", Options["Em"]),
  Strike: rangy.createClassApplier("strike", Options["Strike"]),
};

var backgroundHighlightApplier = rangy.createClassApplier(
  "background-highlight"
);

function addTag(className) {
  className = capitalizeFirstLetter(className);
  TagAppliers[className].toggleSelection();
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
