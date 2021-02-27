const { remote } = window.require('electron');

// document.getElementById('closeid').addEventListener('click', closeWindow);

export default function closeWindow () {
    var window = remote.getCurrentWindow()
    window.close()
}