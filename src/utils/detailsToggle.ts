interface DetailsState {
  isCollapsed: boolean;
}

const storageKey = 'tcfDetailsToggleState';

function applyState(
  state: DetailsState,
  container: HTMLElement,
  button: HTMLElement
) {
  container.classList.toggle('tcfDetailsToggle--collapsed', state.isCollapsed);
  button.classList.toggle('focus', state.isCollapsed);
}

function isDetailsState(value: any): value is DetailsState {
  return typeof value === 'object' && typeof value['isCollapsed'] === 'boolean';
}

function loadState(): DetailsState {
  try {
    let result = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
    if (!isDetailsState(result)) throw new Error('Invalid details state.');
    return result;
  } catch (e) {
    return { isCollapsed: false };
  }
}

function saveState(state: DetailsState) {
  sessionStorage.setItem(storageKey, JSON.stringify(state));
}

(function () {
  const state = loadState();
  const container = document.getElementById('main-content');
  if (!container) {
    return;
  }

  const button = document.createElement('div');
  button.className = `tcfDetailsToggle btn`;
  button.innerHTML = '<div class="tcfIcon craft">general</div>';
  button.addEventListener('click', () => {
    state.isCollapsed = !state.isCollapsed;
    saveState(state);
    applyState(state, container, button);
  });

  container.insertBefore(button, container.firstElementChild);
  applyState(state, container, button);
})();
