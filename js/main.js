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

function addDropdown(dropdownId) {
  var dropdown = document.getElementById(dropdownId);
  var dropdowns = document.querySelectorAll("[class*=dropdown]");

  if (dropdowns.length > 0) {
    for (var i = 0; i <= dropdowns.length - 1; i++) {
      if (dropdowns[i] != dropdown) {
        dropdowns[i].className = "hidden";
      }
    }
  }

  if (dropdown.className == dropdownId) {
    dropdown.className = "hidden";
  } else {
    dropdown.className = dropdownId;
  }
}

rangy.init();

//Makes appliers with class name in ColorObject object
function makeColorAppliers(ColorObject, classesNumber, colorName) {
  var number = 0;
  while (number <= classesNumber) {
    className = "text-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Text[number] = rangy.createClassApplier(className);

    className = "background-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Background[number] = rangy.createClassApplier(
      className
    );
    number++;
  }
}

var classesNumber = 4,
  ColorAppliers = {},
  colors = ["Black", "Red", "Orange", "Yellow", "Green", "Blue", "Violet"];
//Add Text and Background objects to all colors
for (var i = 0; i <= colors.length - 1; i++) {
  ColorAppliers[colors[i]] = {};
  ColorAppliers[colors[i]]["Text"] = {};
  ColorAppliers[colors[i]]["Background"] = {};
}

//Make color appliers for colors in array
for (var i = 0; i <= colors.length - 1; i++) {
  makeColorAppliers(ColorAppliers, classesNumber, colors[i]);
}

var capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

//Toggle class to selected text
function addColor(color, type, number) {
  color = capitalizeFirstLetter(color);
  type = capitalizeFirstLetter(type);
  ColorAppliers[color][type][number].toggleSelection();
  clearExtraClasses();
}

//Options to surround text with specific tag
var Options = {
  Strong: { elementTagName: "strong" },
  U: { elementTagName: "u" },
  Em: { elementTagName: "em" },
  Strike: { elementTagName: "strike" },
  A: { elementTagName: "a" },
  Sup: { elementTagName: "sup" },
  Sub: { elementTagName: "sub" },
};

var TagAppliers = {
  Strong: rangy.createClassApplier("strong", Options["Strong"]),
  U: rangy.createClassApplier("underlined", Options["U"]),
  Em: rangy.createClassApplier("emphasized", Options["Em"]),
  Strike: rangy.createClassApplier("strike", Options["Strike"]),
  A: rangy.createClassApplier("anchor", Options["A"]),
  Sup: rangy.createClassApplier("superscript", Options["Sup"]),
  Sub: rangy.createClassApplier("subscript", Options["Sub"]),
};

var backgroundHighlightApplier = rangy.createClassApplier("background-yellow0");

//Add tag to selected text
var time = 0;
function addTag(tagName, url) {
  tagName = capitalizeFirstLetter(tagName);
  TagAppliers[tagName].toggleSelection();
  if (url) {
    var anchors = document.querySelectorAll("[class=anchor]"),
      url = document.getElementById("url");
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].href = url.value;
      anchors[i].className = anchors[i].className + time;
    }
    time++;
    url.value = "";
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

clearExtraSpaces = (string) => string.replace(/\s+/g, " ");

function clearExtraClasses() {
  var classes = document.querySelectorAll("[class*=text-]");

  for (var i = 0; i < classes.length; i++) {
    var classElement = classes[i],
      className = () => classes[i].className,
      namesInClass = () => className().split(" "),
      lastNamesInClass = namesInClass();

    (function ClearText() {
      classElement.className = className().trim();
      classElement.className = clearExtraSpaces(className());
    })();

    var textClassesAmount = 0,
      backgroundClassesAmount = 0,
      textBeginning = "text-",
      backgroundBeginning = "background-";
    for (var j = 0; j <= lastNamesInClass.length - 1; j++) {
      if (
        lastNamesInClass[j].substring(0, textBeginning.length) == textBeginning
      ) {
        textClassesAmount++;
      } else if (
        lastNamesInClass[j].substring(0, backgroundBeginning.length) ==
        backgroundBeginning
      ) {
        backgroundClassesAmount++;
      }
    }

    function deleteExtraClasses(classesAmount, classBeginning) {
      for (var j = 0; j <= classesAmount - 2; j++) {
        if (
          lastNamesInClass[j].substring(0, classBeginning.length) ==
          classBeginning
        ) {
          lastNamesInClass.splice(j, 1);
          classesAmount--;
          j--;
        }
      }
    }

    deleteExtraClasses(textClassesAmount, "text-");
    deleteExtraClasses(backgroundClassesAmount, "background-");

    classElement.className = lastNamesInClass.join(" ");
  }
}

tests = () => {
  console.log(document.querySelectorAll("[class*=text-]"));
  console.log(document.getSelection());
  console.log(document.getSelection().getRangeAt(0));

  function replaceElement(source, newType) {
    // Create the document fragment
    const frag = document.createDocumentFragment();
    // Fill it with what's in the source element
    while (source.firstChild) {
      frag.appendChild(source.firstChild);
    }
    // Create the new element
    const newElem = document.createElement(newType);
    // Empty the document fragment into it
    newElem.appendChild(frag);
    // Replace the source element with the new element on the page
    source.parentNode.replaceChild(newElem, source);
  }
  // Replace the <b> with a <div>
  // replaceElement(document.querySelector('p'), 'div');
  replaceElement(document.getSelection().anchorNode.parentElement, 'h1');
};
