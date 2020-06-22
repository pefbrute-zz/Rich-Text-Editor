window.addEventListener("load", function () {
  document.getElementById("work-area").setAttribute("contenteditable", "true");
});

function format(command, value) {
  document.execCommand(command, false, value);
}

//Add dropdown class to element with dropdownId
function addDropdown(dropdownId) {
  let dropdown = document.getElementById(dropdownId),
    dropdowns = document.querySelectorAll("[class*=dropdown]"),
    dropdownsLength = dropdowns.length,
    dropdownsLastElementIndex = dropdownsLength - 1;

  if (dropdownsLength > 0) {
    for (let i = 0; i <= dropdownsLastElementIndex; i++) {
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
  let number = 0;

  while (number <= classesNumber) {
    let className = "text-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Text[number] = rangy.createClassApplier(className);

    className = "background-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Background[number] = rangy.createClassApplier(
      className
    );
    number++;
  }
}

let classesNumber = 4,
  ColorAppliers = {},
  colors = ["Black", "Red", "Orange", "Yellow", "Green", "Blue", "Violet"],
  colorsLastElementIndex = colors.length - 1;

//Add Text and Background objects to all colors
for (let i = 0; i <= colorsLastElementIndex; i++) {
  ColorAppliers[colors[i]] = {};
  ColorAppliers[colors[i]]["Text"] = {};
  ColorAppliers[colors[i]]["Background"] = {};
}

//Make color appliers for colors in array
for (let i = 0; i <= colorsLastElementIndex; i++) {
  makeColorAppliers(ColorAppliers, classesNumber, colors[i]);
}

//Makes first letter upper case
var capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

//Makes first letter lower case
var lowerFirstLetter = (string) =>
  string.charAt(0).toLowerCase() + string.slice(1);

//Clears spaces in the start and end of the text and also between words
var clearExtraSpaces = (string) => {
  let cleanedBetweenWords = string.replace(/\s+/g, " "),
    cleanedAtAll = cleanedBetweenWords.trim(),
    cleanedString = cleanedAtAll;

  return cleanedString;
};

//It deletes repeated classes (what starts with similar text)
function clearClasses(classNameBeginning) {
  let classes = document.querySelectorAll(
      "[class*=" + classNameBeginning + "]"
    ),
    classesLength = classes.length;

  for (let i = 0; i < classesLength; i++) {
    let classElement = classes[i],
      className = () => classes[i].className,
      namesInClass = () => className().split(" "),
      lastNamesInClass = namesInClass();

    classElement.className = clearExtraSpaces(className());

    let length = classNameBeginning.length;
    let classesAmount = 0,
      classesIndexes = [],
      k = 0;

    for (let j = 0; j <= lastNamesInClass.length - 1; j++) {
      if (lastNamesInClass[j].substring(0, length) == classNameBeginning) {
        classesIndexes[k] = j;
        classesAmount++;
        k++;
      }
    }
    if (classesAmount == 1) {
    } else {
      for (let j = 0; j < classesAmount; j++) {
        lastNamesInClass.splice(classesIndexes[j], 1);
        classesAmount--;
      }
    }

    classElement.className = lastNamesInClass.join(" ");
  }
}

//Toggle class to selected text
function addColor(color, type, number) {
  color = capitalizeFirstLetter(color);
  type = capitalizeFirstLetter(type);
  ColorAppliers[color][type][number].toggleSelection();

  let sign = "-",
    classNameBeginning = lowerFirstLetter(type) + sign;

  clearClasses(classNameBeginning);
}

//Options to surround text with specific tag
let Options = {
  Strong: { elementTagName: "strong" },
  U: { elementTagName: "u" },
  Em: { elementTagName: "em" },
  Strike: { elementTagName: "strike" },
  A: { elementTagName: "a" },
  Sup: { elementTagName: "sup" },
  Sub: { elementTagName: "sub" },
};

//Tags
let TagAppliers = {
  Strong: rangy.createClassApplier("strong", Options["Strong"]),
  U: rangy.createClassApplier("underlined", Options["U"]),
  Em: rangy.createClassApplier("emphasized", Options["Em"]),
  Strike: rangy.createClassApplier("strike", Options["Strike"]),
  A: rangy.createClassApplier("anchor", Options["A"]),
  Sup: rangy.createClassApplier("superscript", Options["Sup"]),
  Sub: rangy.createClassApplier("subscript", Options["Sub"]),
};

//Add tag to selected text
let time = 0;

//It adds tag with (tagName) to selected text.
//If it passes url then it makes anchor tag with (url)
function addTag(tagName, url) {
  tagName = capitalizeFirstLetter(tagName);
  TagAppliers[tagName].toggleSelection();

  if (url) {
    let anchors = document.querySelectorAll("[class=anchor]"),
      anchorsLength = anchors.length,
      url = document.getElementById("url");
    //Make refactoring!
    //
    for (let i = 0; i < anchorsLength; i++) {
      anchors[i].href = url.value;
      anchors[i].className = anchors[i].className + time;
    }
    time++;
    url.value = "";
    //
    //
  }
}

let FontAppliers = {
  Sofia: rangy.createClassApplier("sofia"),
  Slabo13px: rangy.createClassApplier("slabo-13px"),
  RobotoSlab: rangy.createClassApplier("roboto-slab"),
  Inconsolata: rangy.createClassApplier("inconsolata"),
  UbuntuMono: rangy.createClassApplier("ubuntu-mono"),
};

//It adds font class (sofia, ubuntu-mono, etc.) to selected text
function addFont(fontName) {
  let signIndex = fontName.indexOf("-");
  fontName = capitalizeFirstLetter(fontName);

  if (signIndex > 0) {
    fontName =
      fontName.substring(0, signIndex) +
      capitalizeFirstLetter(fontName.substring(signIndex + 1, fontName.length));
  }
  FontAppliers[fontName].toggleSelection();

  if (signIndex > 0) {
    fontName =
      lowerFirstLetter(fontName.substring(0, signIndex)) +
      "-" +
      lowerFirstLetter(fontName.substring(signIndex, fontName.length));
  } else {
    fontName = lowerFirstLetter(fontName);
  }

  let elements = document.querySelectorAll("[class*=" + fontName + "]"),
    length = elements.length;

  if (fontName == "sofia") {
    var i = 2;
  } else {
    var i = 1;
  }

  if (length > 1) {
    var names = [
        "sofia",
        "slabo-13px",
        "roboto-slab",
        "inconsolata",
        "ubuntu-mono",
      ],
      namesLength = names.length;

    for (i; i < length; i++) {
      if (elements[i].className.split(" ").length > 1) {
        var classNamesList = elements[i].className.split(" "),
          classNamesListLength = classNamesList.length;

        for (let k = 0; k < classNamesListLength; k++) {
          for (let j = 0; j < namesLength; j++) {
            if (
              classNamesList[k] == names[j] &&
              classNamesList[k] != fontName
            ) {
              classNamesList.splice(k, 1);
              classNamesListLength--;
            }
          }
        }
        elements[i].className = classNamesList.join(" ");
      }
    }
  }
}

let SizeAppliers = {
  small: rangy.createClassApplier("small"),
  normal: rangy.createClassApplier("normal"),
  large: rangy.createClassApplier("large"),
  huge: rangy.createClassApplier("huge"),
};

//It adds size class (normal, small, etc.) to selected text
function addSize(sizeName) {
  SizeAppliers[sizeName].toggleSelection();

  let elements = document.querySelectorAll("[class*=" + sizeName + "]"),
    length = elements.length;

  if (sizeName == "normal") {
    var i = 2;
  } else {
    var i = 1;
  }

  if (length > 1) {
    var names = ["small", "normal", "large", "huge"],
      namesLength = names.length;

    for (i; i < length; i++) {
      var classNamesList = elements[i].className.split(" "),
        classNamesListLength = classNamesList.length;

      if (classNamesListLength > 1) {
        for (let k = 0; k < classNamesListLength; k++) {
          for (let j = 0; j < namesLength; j++) {
            if (
              classNamesList[k] == names[j] &&
              classNamesList[k] != sizeName
            ) {
              classNamesList.splice(k, 1);
              classNamesListLength--;
            }
          }
        }
        elements[i].className = classNamesList.join(" ");
      }
    }
  }
}

//It finds child of (parent) element from some (element)
function getChild(element, parent) {
  if (element == undefined) {
    throw new Error("You didn't add child element");
  } else if (parent == undefined) {
    throw new Error("You didn't add parent element");
  } else {
    while (element.parentElement != parent) {
      element = element.parentElement;
    }

    child = element;

    return child;
  }
}

function getSecondChild(element, parent) {
  if (element == undefined) {
    throw new Error("You didn't add child element");
  } else if (parent == undefined) {
    throw new Error("You didn't add parent element");
  } else {
    while (element.parentElement.parentElement != parent) {
      element = element.parentElement;
    }

    child = element;

    return child;
  }
}

//It replaces any tag with new tag
function replaceElement(source, newType) {
  let attributes = [];

  // Create the document fragment
  const frag = document.createDocumentFragment();

  // Fill it with what's in the source element
  // Including attributes
  while (source.firstChild) {
    for (let i = 0; i < source.attributes.length; i++) {
      attributes.push(source.attributes[i]);
    }
    frag.appendChild(source.firstChild);
  }
  // Create the new element
  const newElem = document.createElement(newType);

  // Empty the document fragment into it
  newElem.appendChild(frag);

  // Add attributes of old element to new element
  let length = attributes.length;
  for (let i = 0; i <= length - 1; i++) {
    newElem.setAttribute(attributes[i].name, attributes[i].value);
  }

  // Replace the source element with the new element on the page
  let parentNode = source.parentNode;

  parentNode.replaceChild(newElem, source);
}

//It replaces selected childs tag of <div class="work-area"> with (tag)
function replaceContainerTag(tag) {
  var tag = tag.toUpperCase();

  let mainContainer = document.getElementById("work-area"),
    firstSelectedElement = getFirstSelectedChilds(mainContainer)[0],
    lastSelectedElement = getFirstSelectedChilds(mainContainer)[1];

  if (firstSelectedElement != undefined && lastSelectedElement != undefined) {
    let p = [],
      pCounter = 0,
      tagData = {
        tagName: tag,
        tagCounter: 0,
        selectedTags: [],
      };

    do {
      if (firstSelectedElement.tagName == tagData.tagName) {
        p[pCounter] = firstSelectedElement;
        pCounter++;
      } else {
        tagData.selectedTags[tagData.tagCounter] = firstSelectedElement;
        tagData.tagCounter++;
      }

      if (
        firstSelectedElement.nextElementSibling ==
        lastSelectedElement.nextElementSibling
      ) {
        break;
      }

      firstSelectedElement = firstSelectedElement.nextElementSibling;
    } while (firstSelectedElement != lastSelectedElement.nextElementSibling);
    pCounterMinus1 = pCounter - 1;
    if (pCounter != 0) {
      for (let i = 0; i <= pCounterMinus1; i++) {
        replaceElement(p[i], "p");
      }
    }
    if (tagData.tagCounter != 0) {
      for (let i = 0; i <= tagData.tagCounter - 1; i++) {
        replaceElement(tagData.selectedTags[i], tagData.tagName);
      }
    }

    if (tag == "PRE") {
      clearTagsAtPreContainer();
      // init();
      removeSpellcheck();
      highlightNumbers();
      highlightKeywords();
    }
  }

  let selection = document.getSelection();
  selection.empty();
}

//It highlights specific words + all numbers in <pre>
function highlightPre() {
  let savedSelection = rangy.saveSelection();
  console.time();
  highlightKeywords();
  highlightNumbers();
  rangy.restoreSelection(savedSelection);
  localStorage.clear();
  console.timeEnd();
}

function getFirstSelectedChilds(bigParent) {
  let selection = document.getSelection(),
    range = selection.getRangeAt(0),
    wrongContainer = document.getElementById("sample-toolbar"),
    firstNode = selection.anchorNode,
    lastNode = selection.focusNode,
    verific =
      firstNode.nodeName == "#text" &&
      range.commonAncestorContainer != wrongContainer;
  if (bigParent != undefined) {
    if (verific) {
      // let mainContainer = document.getElementById("work-area"),
      let firstSelectedElement = firstNode,
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

      firstElement = getChild(firstSelectedElement, bigParent);
      secondElement = getChild(lastSelectedElement, bigParent);

      return [firstElement, secondElement];
    } else {
      return [undefined, undefined];
    }
  } else {
    throw new Error("You didn't add parent element");
  }
}

//It toggles class with (className) to selected first childs of <div class="work-area">
function addContainerClass(className) {
  let mainContainer = document.getElementById("work-area"),
    firstSelectedElement = getFirstSelectedChilds(mainContainer)[0],
    lastSelectedElement = getFirstSelectedChilds(mainContainer)[1];

  if (firstSelectedElement != undefined && lastSelectedElement != undefined) {
    if (className.substring(0, 6) == "indent") {
      let sign = className.substring(6, 7),
        classBeginning = "indent";

      do {
        if (firstSelectedElement.nodeName != "#text") {
          let firstSelectedElementClassName = firstSelectedElement.className,
            dataValue = firstSelectedElement.attributes["data-value"];

          if (dataValue != undefined) {
            let value = parseInt(
              firstSelectedElement.attributes["data-value"].nodeValue
            );
            if (sign == "+") {
              if (value <= 7) {
                let cleanElement = clearExtraSpaces(
                    firstSelectedElement.className
                  ),
                  classes = cleanElement.split(" "),
                  length = classes.length;
                for (let j = 0; j < length; j++) {
                  let classBeginning = classes[j].substring(0, 6);
                  if (classBeginning == "indent") {
                    classes.splice(j, 1);
                    j--;
                    length--;
                  }
                }
                classes = classes.join(" ");

                value++;

                firstSelectedElement.attributes["data-value"].nodeValue = value;

                firstSelectedElement.className = clearExtraSpaces(
                  classes + " " + classBeginning + "-" + value
                );
              }
            } else {
              if (value >= 1) {
                if (value == 1) {
                  let clearElement = clearExtraSpaces(
                      firstSelectedElement.className
                    ),
                    classes = clearElement.split(" "),
                    length = classes.length;

                  firstSelectedElement.removeAttribute("data-value");

                  if (length == 1) {
                    firstSelectedElement.removeAttribute("class");
                  } else {
                    for (let j = 0; j < length; j++) {
                      let classBeginning = classes[j].substring(0, 6);

                      if (classBeginning == "indent") {
                        classes.splice(j, 1);

                        j--;
                        length--;
                      }
                    }
                    if (length == 0) {
                      firstSelectedElement.removeAttribute("class");
                    }
                    classes = classes.join(" ");
                    firstSelectedElement.className = clearExtraSpaces(classes);
                  }
                } else {
                  // repeated code too
                  //
                  let classes = firstSelectedElement.className.split(" "),
                    length = classes.length;

                  for (let j = 0; j < length; j++) {
                    let classBeginning = classes[j].substring(0, 6);

                    if (classBeginning == "indent") {
                      classes.splice(j, 1);

                      j--;
                      length--;
                    }
                  }

                  classes = classes.join(" ");
                  value--;

                  firstSelectedElement.attributes[
                    "data-value"
                  ].nodeValue = value;

                  firstSelectedElement.className = clearExtraSpaces(
                    classes + " " + classBeginning + "-" + value
                  );
                  //
                  //
                }
              }
            }
          } else if (className == "indent+") {
            firstSelectedElement.setAttribute("data-value", 1);

            let value = firstSelectedElement.attributes["data-value"].value;

            firstSelectedElement.className = clearExtraSpaces(
              firstSelectedElementClassName + " " + classBeginning + "-" + value
            );
          }
        }

        firstSelectedElement = firstSelectedElement.nextSibling;
      } while (
        firstSelectedElement.nextSibling !=
        lastSelectedElement.nextElementSibling
      );
    } else {
      do {
        if (firstSelectedElement.className == className) {
          firstSelectedElement.removeAttribute("class");
        } else if (firstSelectedElement.className != undefined) {
          if (firstSelectedElement.className == "") {
            firstSelectedElement.className = className;
          } else {
            let classes = firstSelectedElement.className.split(" "),
              length = classes.length;

            if (length == 1) {
              let classNameIndex = className.indexOf("-"),
                classNameBeginning = className.substring(0, classNameIndex),
                classIndex = firstSelectedElement.className.indexOf("-"),
                classBeginning = firstSelectedElement.className.substring(
                  0,
                  classIndex
                );

              if (classNameBeginning == classBeginning) {
                firstSelectedElement.className = className;
              } else {
                firstSelectedElement.className =
                  firstSelectedElement.className + " " + className;
              }
            } else {
              // repeated code
              //
              let classNameIndex = className.indexOf("-"),
                classNameBeginning = className.substring(0, classNameIndex);

              for (let j = 0; j < length; j++) {
                let classIndex = classes[j].indexOf("-"),
                  classBeginning = classes[j].substring(0, classIndex);

                if (classBeginning == classNameBeginning) {
                  classes.splice(j, 1);
                  j--;
                  length--;
                }
              }
              classes = classes.join(" ");
              firstSelectedElement.className = clearExtraSpaces(
                classes + " " + className
              );
              //
              //
            }
          }
        }
        firstSelectedElement = firstSelectedElement.nextSibling;
      } while (
        firstSelectedElement.nextSibling !=
        lastSelectedElement.nextElementSibling
      );
    }
  } else {
    throw new Error("You selected something wrong!");
  }
}

//It highlights specific words in <pre> tag
function highlightKeywords() {
  let words = ["for", "while", "var", "and", "is"],
    wordsLastElementIndex = words.length - 1;
  let preList = document.getElementsByTagName("PRE"),
    preListLastIndexElement = preList.length - 1;

  for (let i = 0; i <= preListLastIndexElement; i++) {
    let pre = preList[i];
    // preInner = pre.innerHTML;

    for (let j = 0; j <= wordsLastElementIndex; j++) {
      let word = words[j],
        regExp = new RegExp("\\b" + word + "\\b", "gi"),
        replacing = "<span class=pre-keyword>" + word + "</span>";
      replacedInner = pre.innerHTML.replace(regExp, replacing);
      pre.innerHTML = replacedInner;
    }
  }
  // }
}

//It highlights all numbers in <pre> tag
function highlightNumbers() {
  let preList = document.getElementsByTagName("PRE"),
    selection = document.getSelection(),
    preElement = selection.anchorNode;

  if (selection.type == "Caret") {
    while (preElement.tagName != "PRE") {
      preElement = preElement.parentElement;
    }

    let regExp = new RegExp("\\b" + "\\d+" + "\\b", "gi"),
      matches = preElement.innerHTML.match(regExp),
      matchesLastElementIndex = matches.length - 1;

    if (matches != null) {
      for (let j = 0; j <= matchesLastElementIndex; j++) {
        let match = matches[j],
          replacing = "<span class=pre-number>" + match + "</span>",
          regExp = new RegExp("\\b" + match + "\\b", "gi");

        replacedInner = preElement.innerHTML.replace(regExp, replacing);
        preElement.innerHTML = replacedInner;
      }
    }
  } else {
    for (let i = 0; i <= preList.length - 1; i++) {
      let regExp = new RegExp("\\b" + "\\d+" + "\\b", "gi"),
        element = preList[i],
        matches = element.innerHTML.match(regExp);

      if (matches != null) {
        for (let j = 0; j <= matches.length - 1; j++) {
          let match = matches[j],
            replacing = "<span class=pre-number>" + match + "</span>",
            regExp = new RegExp("\\b" + match + "\\b", "gi");
          replacedInner = element.innerHTML.replace(regExp, replacing);
          element.innerHTML = replacedInner;
        }
      }
    }
  }
}

//It deletes all tags in <pre> tag
function clearTagsAtPreContainer() {
  let preList = document.getElementsByTagName("PRE");
  for (let i = 0; i <= preList.length - 1; i++) {
    let preListTextContent = preList[i].textContent;
    preList[i].innerHTML = preListTextContent;
  }
}

//It sets spellcheck attribute to false (spellcheck=false) to selected <pre> tags
function removeSpellcheck() {
  let pres = document.querySelectorAll("pre:not([spellcheck])");
  for (let i = 0; i <= pres.length - 1; i++) {
    let pre = pres[i];
    pre.setAttribute("spellcheck", "false");
  }
}

function replaceDivs() {
  console.time();

  let element = document.getElementById("work-area"),
    childNodes = element.childNodes,
    childNodesLength = childNodes.length;
  for (let i = 0; i < childNodesLength; i++) {
    if (childNodes[i].nodeName == "DIV" || childNodes[i].nodeName == "#text") {
      replaceElement(childNodes[i], "p");
    }
  }

  console.timeEnd();
}

let element = document.getElementById("work-area");
element.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    let savedSelection = rangy.saveSelection();

    setTimeout(replaceDivs, 1);
    rangy.restoreSelection(savedSelection);
  }
});

function clearEmptyContainers() {
  let mainContainer = document.getElementById("work-area"),
    mainChildren = mainContainer.children,
    childrenAmount = mainChildren.length;

  for (let i = 0; i < childrenAmount; i++) {
    let child = mainChildren[i],
      textContent = child.textContent;

    textContent = clearExtraSpaces(textContent);
    if (textContent == "") {
      mainContainer.removeChild(child);
      childrenAmount--;
    }
  }
}

function makeList(type) {
  // console.time();
  type = type.toUpperCase();

  function getSelectedParents(mainContainer) {
    let selection = document.getSelection(),
      firstSelectedElement = selection.anchorNode,
      lastSelectedElement = selection.focusNode,
      parentOfFirstElement = getChild(firstSelectedElement, mainContainer),
      parentOfLastElement = getChild(lastSelectedElement, mainContainer);
    return [parentOfFirstElement, parentOfLastElement];
  }

  let mainContainer = document.getElementById("work-area"),
    parentOfFirstElement = getSelectedParents(mainContainer)[0],
    parentOfLastElement = getSelectedParents(mainContainer)[1];

  //Find indexes of parent of first selected element and last selected element
  function getParentsIndexes(
    mainChildren,
    parentOfFirstElement,
    parentOfLastElement
  ) {
    let childrenAmount = mainChildren.length,
      firstParentIndex = -1,
      lastParentIndex = -1;

    for (let i = 0; i < childrenAmount; i++) {
      let child = mainChildren[i];
      if (child == parentOfFirstElement) {
        firstParentIndex = i;
      }
      if (child == parentOfLastElement) {
        lastParentIndex = i;
      }
    }
    return [firstParentIndex, lastParentIndex];
  }

  let mainChildren = mainContainer.children,
    firstAndLastParentIndexes = getParentsIndexes(
      mainChildren,
      parentOfFirstElement,
      parentOfLastElement
    ),
    firstParentIndex = firstAndLastParentIndexes[0],
    lastParentIndex = firstAndLastParentIndexes[1];

  //Change indexes if selection was from the end
  function swapIndexes(firstParentIndex, lastParentIndex) {
    if (firstParentIndex > lastParentIndex) {
      [firstParentIndex, lastParentIndex] = [lastParentIndex, firstParentIndex];
    }
    return [firstParentIndex, lastParentIndex];
  }

  let parentsIndexes = swapIndexes(firstParentIndex, lastParentIndex);
  firstParentIndex = parentsIndexes[0];
  lastParentIndex = parentsIndexes[1];

  //Count how much list tags was selected
  function getListsamount(firstParentIndex, lastParentIndex) {
    let count = 0,
      index = lastParentIndex + 1;

    for (let i = firstParentIndex; i < index; i++) {
      let mainChild = mainChildren[i],
        mainChildName = mainChild.nodeName;

      if (mainChildName == type) {
        count++;
      }
    }
    return count;
  }

  let ListsAmount = getListsamount(firstParentIndex, lastParentIndex);

  // If we selected only list tags then turn them into <p> tags
  //
  //Think about condition!
  let index = lastParentIndex + 1;
  if (ListsAmount == index - firstParentIndex) {
    //
    //
    let selection = document.getSelection(),
      firstSelectedElement = selection.anchorNode,
      lastSelectedElement = selection.focusNode;

    function makeOnlyLists(
      firstSelectedElement,
      lastSelectedElement,
      firstParentIndex,
      mainContainer
    ) {
      function swapSelectionNodes() {
        function getSelectionIndexes() {
          //Get Selected <list> tag
          function getList() {
            let List = firstSelectedElement,
              getParent = (element) => element.parentElement;

            while (getParent(List) != mainContainer) {
              List = getParent(List);
            }
            return List;
          }

          //Get Selected <li> tags (first and last one)
          function getFirstLiAndLastLi() {
            let firstLi = firstSelectedElement,
              lastLi = lastSelectedElement,
              getParent = (element) => element.parentElement,
              getParentName = (element) => getParent(element).nodeName;

            while (getParentName(firstLi) != type) {
              firstLi = getParent(firstLi);
            }

            while (getParentName(lastLi) != type) {
              lastLi = getParent(lastLi);
            }

            return [firstLi, lastLi];
          }

          let parentNode = getList(),
            childs = parentNode.children,
            childrenAmount = childs.length,
            firstSelectedLi = getFirstLiAndLastLi()[0],
            lastSelectedLi = getFirstLiAndLastLi()[1],
            indexOfFirstSelectedLi = -1,
            indexOfLastSelectedLi = -1;

          for (let i = 0; i < childrenAmount; i++) {
            let child = childs[i];

            if (child == firstSelectedLi) {
              indexOfFirstSelectedLi = i;
            } else if (child == lastSelectedLi) {
              indexOfLastSelectedLi = i;
            }
          }

          return [indexOfFirstSelectedLi, indexOfLastSelectedLi];
        }

        let firstIndex = getSelectionIndexes()[0],
          lastIndex = getSelectionIndexes()[1];

        if (firstIndex > lastIndex) {
          [firstSelectedElement, lastSelectedElement] = [
            lastSelectedElement,
            firstSelectedElement,
          ];
        }

        return [firstSelectedElement, lastSelectedElement];
      }

      let selectedElements = swapSelectionNodes();
      firstSelectedElement = selectedElements[0];
      lastSelectedElement = selectedElements[1];

      function getFirstLiAndLastLi() {
        let firstLi = firstSelectedElement,
          lastLi = lastSelectedElement,
          getParent = (someElement) => someElement.parentElement,
          getParentName = (someElement) => getParent(someElement).nodeName;

        while (getParentName(firstLi) != type) {
          firstLi = getParent(firstLi);
        }

        while (getParentName(lastLi) != type) {
          lastLi = getParent(lastLi);
        }

        return [firstLi, lastLi];
      }

      function getList() {
        let List = firstSelectedElement,
          workAreaContainer = document.getElementById("work-area"),
          getParent = (element) => element.parentElement;

        while (getParent(List) != workAreaContainer) {
          List = getParent(List);
        }

        return List;
      }

      let firstLi = getFirstLiAndLastLi()[0],
        lastLi = getFirstLiAndLastLi()[1],
        List = getList(),
        ListIndex = firstParentIndex,
        children = List.children,
        childrenAmount = children.length;

      //Get indexes of first and last selected <li> elements in <list> tag
      function getFirstLiAndLastLiIndexes(
        listChildren,
        listChildrenAmount,
        firstLi,
        lastLi
      ) {
        let indexOfFirstSelectedLi = -1,
          lastLiIndex = -1;

        for (let i = 0; i < listChildrenAmount; i++) {
          let child = listChildren[i];

          if (child == firstLi) {
            indexOfFirstSelectedLi = i;
          } else if (child == lastLi) {
            lastLiIndex = i;
          }
        }

        if (lastLiIndex == -1) {
          lastLiIndex = indexOfFirstSelectedLi;
        }

        return [indexOfFirstSelectedLi, lastLiIndex];
      }

      let firstAndLastLiIndexes = getFirstLiAndLastLiIndexes(
          children,
          childrenAmount,
          firstLi,
          lastLi
        ),
        indexOfFirstSelectedLi = firstAndLastLiIndexes[0],
        indexOfLastSelectedLi = firstAndLastLiIndexes[1];

      let fragment = document.createDocumentFragment();

      //If selected only one <li> then remove only the <li> element
      //and add <p> tag with content of the <li> after selected <list> tag
      if (indexOfLastSelectedLi == indexOfFirstSelectedLi) {
        let p = document.createElement("p"),
          firstSelectedLi = children[indexOfFirstSelectedLi],
          liContent = firstSelectedLi.innerHTML;

        firstSelectedLi.remove();

        p.innerHTML = liContent;
        fragment.appendChild(p);
      } else {
        //Else remove all selected <li> elements and add <p> tags
        let index = indexOfLastSelectedLi + 1;

        while (indexOfFirstSelectedLi != index) {
          let p = document.createElement("p"),
            firstSelectedLi = children[indexOfFirstSelectedLi],
            liContent = firstSelectedLi.innerHTML;

          firstSelectedLi.remove();
          index--;

          p.innerHTML = liContent;
          fragment.appendChild(p);
        }
      }

      let indexOfLastLi = childrenAmount - 1;

      //If selection started from the start of the list, then append <p> tags before the list
      if (indexOfFirstSelectedLi == 0) {
        let mainContainerChildren = mainContainer.children,
          list = mainContainerChildren[ListIndex];

        mainContainer.insertBefore(fragment, list);
        //Else if selection ends in the end of list append after this list
      } else if (
        indexOfLastSelectedLi == indexOfLastLi ||
        indexOfFirstSelectedLi == indexOfLastLi
      ) {
        mainContainer.insertBefore(
          fragment,
          mainContainer.children[ListIndex + 1]
        );
      } else {
        let indexOfLastLiInFirstPart = indexOfFirstSelectedLi - 1,
          firstPart = document.createDocumentFragment(),
          lastPart = document.createDocumentFragment(),
          mainContainer = document.getElementById("work-area"),
          childrenOfMainContainer = mainContainer.children;
        (list = childrenOfMainContainer[ListIndex]),
          (listChildren = list.children);

        while (indexOfLastLiInFirstPart >= 0) {
          let listChildren = list.children,
            firstChild = listChildren[0];

          firstPart.appendChild(firstChild);
          indexOfLastLiInFirstPart--;
        }

        let amountOfChildrenOfList = listChildren.length;

        while (amountOfChildrenOfList != 0) {
          let listChildren = list.children,
            firstChildOfList = listChildren[0];

          lastPart.appendChild(firstChildOfList);
          amountOfChildrenOfList--;
        }

        list.remove();

        let firstUl = document.createElement(type),
          lastUl = document.createElement(type),
          childOfMainContainer = childrenOfMainContainer[ListIndex];

        firstUl.appendChild(firstPart);
        lastUl.appendChild(lastPart);

        mainContainer.insertBefore(firstUl, childOfMainContainer);
        mainContainer.insertBefore(fragment, childOfMainContainer);
        mainContainer.insertBefore(lastUl, childOfMainContainer);
      }

      //If <list> is empty then delete it.
      let childrenOfList = List.children,
        amountOfChildren = childrenOfList.length;
      if (amountOfChildren == 0) {
        List.remove();
      }
    }

    makeOnlyLists(
      firstSelectedElement,
      lastSelectedElement,
      firstParentIndex,
      mainContainer
    );
  } else {
    //If selected not just <list> tags then turn selected tags into <list> (if they're not already)
    function replaceNotList(firstParentIndex, lastParentIndex, mainChildren) {
      for (let i = firstParentIndex; i < lastParentIndex + 1; i++) {
        let child = mainChildren[i],
          nodeName = child.nodeName;

        if (nodeName != type) {
          replaceElement(child, type);
        }
      }
    }
    replaceNotList(firstParentIndex, lastParentIndex, mainChildren);

    //Remove all tags what don't have any content
    function clearEmptyContainers() {
      let mainContainer = document.getElementById("work-area"),
        mainChildren = mainContainer.children,
        childrenAmount = mainChildren.length;

      for (let i = 0; i < childrenAmount; i++) {
        let child = mainChildren[i],
          textContent = child.textContent;

        textContent = clearExtraSpaces(textContent);
        if (textContent == "") {
          mainContainer.removeChild(child);
          childrenAmount--;
        }
      }
    }
    clearEmptyContainers();

    // let fragment = document.createDocumentFragment(),
    let editor = document.getElementById("work-area"),
      editorChildren = editor.children,
      childrenAmount = editorChildren.length,
      elementsToTurnIntoLi = [],
      count = 0;

    function turnIntoLi(elementsToTurnIntoLi) {
      let fragment = document.createDocumentFragment(),
        elementsAmount = elementsToTurnIntoLi.length,
        index = 0;

      for (i = 0; i < elementsAmount; i++) {
        let element = elementsToTurnIntoLi[i],
          children = element.childNodes,
          length = children.length,
          innerFragment = document.createDocumentFragment(),
          isWithLI = false;

        function hasLi(element) {
          let children = element.childNodes,
            childAmount = children.length;

          for (let i = 0; i < childAmount; i++) {
            let child = children[i],
              childName = child.nodeName;

            if (childName == "LI") {
              return true;
            }
          }
          return false;
        }

        while (length != 0) {
          let child = children[0],
            childName = child.nodeName,
            firstChild = children[0];

          if (childName == "LI") {
            isWithLI = true;
            break;
          }

          innerFragment.appendChild(firstChild);
          length--;
        }

        if (isWithLI) {
        } else {
          let li = document.createElement("li");

          li.appendChild(innerFragment);
          fragment.appendChild(li);

          //If the next element is already done (turned into <list> tag with <li> elements)
          //Then append the element to the previous element
          let nextElement = elementsToTurnIntoLi[i + 1];
          if (nextElement != undefined) {
            if (hasLi(nextElement)) {
              let listForMerging = elementsToTurnIntoLi[index],
                elementAfterNextElement = elementsToTurnIntoLi[i + 2];

              listForMerging.appendChild(fragment);

              if (elementAfterNextElement != undefined) {
                index = i + 2;
              }
            }
          }
        }
      }

      let listForMerging = elementsToTurnIntoLi[index];
      listForMerging.appendChild(fragment);

      //Merge separated <list> tags
      let secondList = elementsToTurnIntoLi[1];
      while (secondList != undefined) {
        let firstList = elementsToTurnIntoLi[0],
          secondList = elementsToTurnIntoLi[1];

        if (secondList == undefined) {
          break;
        }

        let childrenOfSecondList = secondList.children,
          firstChildOfsecondList = () => childrenOfSecondList[0];

        while (firstChildOfsecondList() != undefined)
          firstList.appendChild(firstChildOfsecondList());

        elementsToTurnIntoLi.splice(1, 1);
        clearEmptyContainers();
      }
    }

    for (let i = 0; i < childrenAmount; i++) {
      let child = editorChildren[i],
        childName = child.nodeName;

      if (childName == type) {
        elementsToTurnIntoLi[count] = child;
        count++;
      } else if (count > 0) {
        turnIntoLi(elementsToTurnIntoLi);
        elementsToTurnIntoLi = [];

        if (count != 1) {
          childrenAmount -= count;
        }
        count = 0;
      }
    }

    //If stopped on last element and it didn't turned it into li
    if (count > 0) {
      turnIntoLi(elementsToTurnIntoLi);
      elementsToTurnIntoLi = [];
    }
  }

  elementsToTurnIntoLi = [];

  let selection = document.getSelection();
  selection.empty();

  // console.timeEnd();
}

// Make function of it smhw
//
let fileTag = document.getElementById("filetag");
fileTag.addEventListener("change", function () {
  changeImage(this);
});

function changeImage(input) {
  var reader,
    files = input.files,
    file = files[0],
    image = document.querySelector("img[src='']");

  if (files && file) {
    reader = new FileReader();

    reader.onload = function (event) {
      let target = event.target,
        result = target.result;

      image.setAttribute("src", result);
    };

    reader.readAsDataURL(file);
  }
}

function addImage() {
  let getElement = (id) => document.getElementById(id),
    fileTag = getElement("filetag"),
    selection = document.getSelection(),
    range = selection.getRangeAt(0),
    image = document.createElement("img");

  selection.deleteFromDocument();
  image.setAttribute("src", "");
  range.insertNode(image);

  fileTag.click();
}
//

function addVideoByURL() {
  let selection = document.getSelection(),
    range = selection.getRangeAt(0),
    iframe = document.createElement("iframe"),
    input = document.getElementById("url-input"),
    URL = input.value;

  selection.deleteFromDocument();
  iframe.setAttribute("src", URL);
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "true");
  range.insertNode(iframe);

  input.value = "";
}

tests = () => {
  function performanceTest(someFunction) {
    const t0 = performance.now();
    someFunction();
    const t1 = performance.now();
    console.log(
      `Clear formatting function completed in: ${t1 - t0} milleseconds`
    );
  }

  performanceTest(clearFormatting1);
};

function clearFormatting() {
  console.time();

  let selection = document.getSelection(),
    anchorNode = selection.anchorNode,
    firstTag = anchorNode.parentElement,
    firstParentTag = anchorNode.parentElement,
    firstParentTagName = firstParentTag.nodeName,
    focusNode = selection.focusNode,
    // lastParentTag = anchorNode.parentElement,
    // lastParentTagName = lastParentTag.nodeName,
    range = selection.getRangeAt(0),
    fragment = range.cloneContents(),
    strippedContent = fragment.textContent,
    mainContainer = document.getElementById("work-area");

  if (getChild(anchorNode, mainContainer).nodeName == "P") {
    firstParentTag = getChild(anchorNode, mainContainer);
    firstParentTagName = "P";
    console.log(fragment);
    selection.deleteFromDocument();

    let textNode = document.createTextNode(strippedContent);
    range.insertNode(textNode);

    let firstTagName = firstTag.nodeName;

    console.log(firstTag);
    console.log(firstTag.childNodes);
    console.log(textNode);

    //If selection started and finished in some tag (not main <p>)
    //then devide this tag in two parts and insert cleaned text between them

    if (anchorNode == focusNode && firstTagName != "P") {
      let firstTagChilds = firstTag.childNodes;

      let firstElement = document.createElement(firstTagName),
        secondElement = document.createElement(firstTagName);

      firstElement.innerHTML = firstTagChilds[0].textContent;
      secondElement.innerHTML = firstTagChilds[2].textContent;
      debugger;

      firstTag.remove();
      range.insertNode(secondElement);
      range.insertNode(textNode);
      range.insertNode(firstElement);
    }
    //
    //
  } else if (
    getChild(anchorNode, mainContainer).nodeName == "UL" ||
    getChild(anchorNode, mainContainer).nodeName == "OL"
  ) {
    firstParentTag = getChild(anchorNode, mainContainer);
    firstParentTagName = firstParentTag.nodeName;
    // makeList(firstParentTagName);

    console.log(fragment, strippedContent);
    // console.log(getSecondChild(anchorNode, mainContainer));
    // selection.deleteFromDocument();
  }

  console.timeEnd();
}

function getChildIndex(child, parent) {
  let children = parent.children,
    childrenAmount = children.length,
    indexOfChild = -1;

  for (let i = 0; i < childrenAmount; i++) {
    let childOfParent = children[i];

    if (child == childOfParent) {
      indexOfChild = i;
      break;
    }
  }

  return indexOfChild;
}

let someArray = [];

function clearFormatting1() {
  clearEmptyContainers();

  let selection = document.getSelection(),
    anchorNode = selection.anchorNode,
    firstTag = anchorNode.parentElement,
    firstParentTag = anchorNode.parentElement,
    firstParentTagName = firstParentTag.nodeName,
    focusNode = selection.focusNode,
    // lastParentTag = anchorNode.parentElement,
    // lastParentTagName = lastParentTag.nodeName,
    range = selection.getRangeAt(0),
    fragment = range.cloneContents(),
    fragmentChildren = fragment.children,
    fragmentChildrenAmount = fragmentChildren.length,
    fragmentWithFirstAndLastSelectedChildren = document.createDocumentFragment(),
    strippedContent = fragment.textContent,
    mainContainer = document.getElementById("work-area"),
    nodeWithStrippedContent,
    resultFragment = document.createDocumentFragment(),
    fragmentBeforeDeletion = document.createDocumentFragment(),
    createTextNode = (text) => document.createTextNode(text),
    elementsBetweenFirstAndLastSelectedChilds = [];

  let firstSelectedChild = getChild(anchorNode, mainContainer),
    lastSelectedChild = getChild(focusNode, mainContainer),
    indexOfFirstSelectedChild = getChildIndex(
      firstSelectedChild,
      mainContainer
    ),
    indexOfLastSelectedChild = getChildIndex(lastSelectedChild, mainContainer),
    distance = indexOfLastSelectedChild - indexOfFirstSelectedChild + 1;
  // mainContainer.
  console.log(indexOfLastSelectedChild - indexOfFirstSelectedChild);

  let clonedFirstSelectedChild = firstSelectedChild.cloneNode(true),
    clonedLastSelectedChild = lastSelectedChild.cloneNode(true);

  fragmentBeforeDeletion.append(clonedFirstSelectedChild);
  fragmentBeforeDeletion.append(clonedLastSelectedChild);

  console.log(firstSelectedChild, lastSelectedChild);

  console.log("Fragment before deletion: ", fragmentBeforeDeletion);
  console.log(
    "Fragment to what add cleaned text:",
    fragmentWithFirstAndLastSelectedChildren
  );
  console.log("Fragment what to clean:", fragment);
  console.log("Fragment what to add to editor", resultFragment);

  function clearElement(element) {
    let strippedContent = element.textContent;
    element.innerHTML = strippedContent;
    return element;
  }

  if (distance > 2) {
    let mainContainer = document.getElementById("work-area"),
      mainContainerChilds = mainContainer.children,
      mainChildsAmount = mainContainerChilds.length,
      nextElement = firstSelectedChild.nextElementSibling,
      someFragment = document.createDocumentFragment(),
      nextNextElement = firstSelectedChild.nextElementSibling,
      i = 0;

    while (
      mainContainerChilds[indexOfFirstSelectedChild + 1] != lastSelectedChild
    ) {
      let child = mainContainerChilds[indexOfFirstSelectedChild + 1];

      elementsBetweenFirstAndLastSelectedChilds[i] = child;

      someFragment.appendChild(clearElement(child));
      i++;
    }

    console.log(elementsBetweenFirstAndLastSelectedChilds);
    console.log(someFragment);

    selection.deleteFromDocument();
    let firstFragmentChild = fragmentChildren[0],
      lastFragmentChild = fragmentChildren[fragmentChildrenAmount - 1];
    console.log(firstFragmentChild, lastFragmentChild);

    firstSelectedChild.append(firstFragmentChild.textContent);
    lastSelectedChild.prepend(lastFragmentChild.textContent);
    firstSelectedChild.after(someFragment);
    // firstSelectedChild.remove();
    // lastSelectedChild.remove();
  } else if (distance == 2) {
    for (let i = 0; i < fragmentChildrenAmount; i++) {
      selection.deleteFromDocument();
      let fragmentChild = fragmentChildren[i];
      firstChildStrippedContent = fragmentChild.textContent;
      nodeWithStrippedContent = createTextNode(firstChildStrippedContent);
      if (firstSelectedChild == undefined) {
        let newNode = document.createElement(fragmentChild.nodeName);
        newNode.appendChild(nodeWithStrippedContent);
      } else {
        if (i + 1 == fragmentChildrenAmount) {
          firstSelectedChild.prepend(nodeWithStrippedContent);
          firstSelectedChild = firstSelectedChild.nextElementSibling;
        } else {
          firstSelectedChild.appendChild(nodeWithStrippedContent);
          firstSelectedChild = firstSelectedChild.nextElementSibling;
        }
      }
    }
  } else if (distance == 1) {
    console.log(selection);
    if (anchorNode.parentElement.nodeName == "P") {
      let textNode = createTextNode(strippedContent);
      selection.deleteFromDocument();
      range.insertNode(textNode);
    } else {
      let secondFirstParent = getSecondChild(anchorNode, mainContainer),
        secondLastParent = getSecondChild(focusNode, mainContainer);

      if (secondFirstParent == secondLastParent) {
        let endOfFirstPart = selection.anchorOffset,
          startOfSecondPart = selection.anchorOffset,
          parent = getSecondChild(anchorNode, mainContainer),
          parentName = parent.nodeName,
          tags = [],
          tag = anchorNode,
          tagParent = tag.parentElement,
          tagsAmount = 1,
          i = 0;
        fragmentChildren;

        while (tagParent != firstSelectedChild) {
          tags[i] = tagParent;
          i++;
          tagParent = tagParent.parentElement;
        }

        console.log(tags);

        for (let g = 0; g < i; g++) {
          addTag(tags[g].nodeName.toLowerCase());
        }
        range = selection.getRangeAt(0);
        let newFragment = document.createTextNode(
          range.cloneContents().textContent
        );
        console.log(newFragment);
        selection.deleteFromDocument();
        range.insertNode(newFragment);
      } else {
        let p = getChild(anchorNode, mainContainer),
          parentTag = getChild(anchorNode, p);

        selection.deleteFromDocument();
        parentTag.after(createTextNode(strippedContent));
        console.log(selection, selection.getRangeAt(0));
        console.log(parentTag);
      }
    }
  }
}
