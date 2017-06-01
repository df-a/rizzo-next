"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (el, words, options) {
  var settings = {
    className: "is-highlight",
    element: "span",
    caseSensitive: false,
    wordsOnly: false
  };

  $.extend(settings, options);

  if (words.constructor === String) {
    words = [words];
  }

  words = $.grep(words, function (word) {
    return word !== "";
  });
  words = $.map(words, function (word) {
    return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  });

  if (words.length === 0) {
    return el;
  }

  var flag = settings.caseSensitive ? "" : "i",
      pattern = "(" + words.join("|") + ")";

  if (settings.wordsOnly) {
    pattern = "\\b" + pattern + "\\b";
  }

  var re = new RegExp(pattern, flag);

  return $(el).each(function () {
    return highlight(el, re, settings.element, settings.className);
  });
};

var highlight = function highlight(node, re, nodeName, className) {
  if (node.nodeType === 3) {
    var match = node.data.match(re);

    if (match) {
      var highlightElement = document.createElement(nodeName || "span");
      highlightElement.className = className || "highlight";

      var wordNode = node.splitText(match.index);
      wordNode.splitText(match[0].length);

      var wordClone = wordNode.cloneNode(true);
      highlightElement.appendChild(wordClone);
      wordNode.parentNode.replaceChild(highlightElement, wordNode);

      return 1; //skip added node in parent
    }
  } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && !(node.tagName === nodeName.toUpperCase() && node.className === className)) {
    for (var i = 0; i < node.childNodes.length; i++) {
      i += highlight(node.childNodes[i], re, nodeName, className);
    }
  }
  return 0;
};