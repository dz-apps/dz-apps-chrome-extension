export const findAndReplaceDOMEls = () => {
  replacements.forEach(({ search, replace }) =>
    replaceOnDocument(new RegExp(`${search.join("|")}`, "gi"), replace, {
      attrs: [
        "title",
        "alt",
        "onerror", // This will be ignored
      ],
      props: [
        "value", // Changing an `<input>`’s `value` attribute won’t change its current value, so the property needs to be accessed here
      ],
    })
  );
};

// Credit: https://stackoverflow.com/a/41886794/6136828
const replaceOnDocument = (() => {
  console.log("FINDING AND REPLACING");

  const replacer = {
    [document.TEXT_NODE](node, pattern, string) {
      node.textContent = node.textContent.replace(pattern, string);
    },
    [document.ELEMENT_NODE](node, pattern, string, { attrs, props } = {}) {
      attrs.forEach((attr) => {
        if (typeof node[attr] !== "function" && node.hasAttribute(attr)) {
          node.setAttribute(
            attr,
            node.getAttribute(attr).replace(pattern, string)
          );
        }
      });
      props.forEach((prop) => {
        if (typeof node[prop] === "string" && node.hasAttribute(prop)) {
          node[prop] = node[prop].replace(pattern, string);
        }
      });
    },
  };

  return (
    pattern,
    string,
    {
      target = document.body,
      attrs: [...attrs] = [],
      props: [...props] = [],
    } = {}
  ) => {
    // Handle `string` — see the last section
    [
      target,
      ...[
        target,
        ...target.querySelectorAll("*:not(script):not(noscript):not(style)"),
      ].flatMap(({ childNodes: [...nodes] }) => nodes),
    ]
      .filter(({ nodeType }) => replacer.hasOwnProperty(nodeType))
      .forEach((node) =>
        replacer[node.nodeType](node, pattern, string, {
          attrs,
          props,
        })
      );
  };
})();
