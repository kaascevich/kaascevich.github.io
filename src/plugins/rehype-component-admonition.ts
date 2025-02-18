import type { Properties, ElementContent, Element } from "hast"
import { h } from "hastscript"

/**
 * Creates an admonition component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} [properties.title] - An optional title.
 * @param {("tip" | "note" | "important" | "caution" | "warning")} type - The admonition type.
 * @param {ElementContent[]} children - The children elements of the component.
 * @returns {Element} The created admonition component.
 */
export const admonitionComponent = (
  properties: Properties & { title?: string | undefined },
  children: ElementContent[],
  type: "tip" | "note" | "important" | "caution" | "warning",
): Element => {
  if (children.length === 0)
    return h(
      "div",
      { class: "hidden" },
      'Invalid admonition directive. (Admonition directives must be of block type ":::note{name="name"} <content> :::")',
    )

  let label: Element | null = null
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (properties["has-directive-label"]) {
    label = children[0]! as Element // The first child is the label
    children.shift()
    label.tagName = "div" // Change the tag <p> to <div>
  }

  return h(`blockquote`, { class: `admonition bdm-${type}` }, [
    h("span", { class: `bdm-title` }, label ?? type.toUpperCase()),
    ...children,
  ])
}
