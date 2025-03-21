import { mount } from 'svelte'

import CopyButton from '$/components/control/CopyButton.svelte'

const observer = new MutationObserver(addCopyButtons)
document.addEventListener('DOMContentLoaded', addCopyButtons)

function addCopyButtons() {
  observer.disconnect()

  for (const codeBlock of document.querySelectorAll('pre')) {
    // check if we've already handled this element
    if (
      codeBlock.parentElement?.nodeName === 'DIV'
      && codeBlock.parentElement.classList.contains('code-block')
    ) {
      continue
    }

    // create and insert the wrapper element
    const wrapper = document.createElement('div')
    wrapper.className = 'code-block'

    codeBlock.parentNode?.insertBefore(wrapper, codeBlock)

    // add the elements to the DOM
    // eslint-disable-next-line unicorn/prefer-dom-node-text-content
    mount(CopyButton, { props: { text: codeBlock.innerText }, target: wrapper })
    wrapper.appendChild(codeBlock)
  }

  observer.observe(document.body, { childList: true, subtree: true })
}
