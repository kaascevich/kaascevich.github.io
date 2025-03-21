export default function setup() {
  function setClickOutsideToClose(panel: string, ignores: readonly string[]) {
    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Node)) {
        return
      }

      for (const ignored of ignores) {
        const element = document.getElementById(ignored)
        if (element === event.target || element?.contains(event.target)) {
          return
        }
      }
      document.getElementById(panel)?.classList.add('float-panel-closed')
    })
  }

  setClickOutsideToClose('color-settings', [
    'color-settings',
    'color-settings-switch',
  ])
  setClickOutsideToClose('nav-menu-panel', [
    'nav-menu-panel',
    'nav-menu-switch',
  ])
  setClickOutsideToClose('search-panel', [
    'search-panel',
    'search-bar',
    'search-switch',
  ])
}
