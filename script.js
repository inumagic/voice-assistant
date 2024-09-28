// script.js

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.navButton');
    const buttonGroups = document.querySelectorAll('.button-group');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const playButtons = document.querySelectorAll('.playButton');

    // 隱藏所有按鈕組
    function hideAllButtonGroups() {
        buttonGroups.forEach(group => {
            group.style.display = 'none';
        });
    }

    // 當點擊導航按鈕時，顯示對應的按鈕組
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            hideAllButtonGroups();
            const category = this.getAttribute('data-category');
            document.getElementById(category).style.display = 'block';
        });
    });

    // 為每個播放按鈕添加點擊事件
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioFile = this.getAttribute('data-audio');
            audioSource.src = audioFile;
            audioPlayer.load();
            audioPlayer.style.display = 'block';
            audioPlayer.play();
        });
    });
});
