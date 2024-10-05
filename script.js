document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.navButton');
    const buttonGroups = document.querySelectorAll('.button-group');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const playButtons = document.querySelectorAll('.playButton');

    let playQueue = [];
    let currentPlayingIndex = 0;

    // 確保頁面包含導航按鈕和按鈕組
    if (navButtons.length > 0 && buttonGroups.length > 0) {

        // 隱藏所有按鈕組
        function hideAllButtonGroups() {
            buttonGroups.forEach(group => {
                group.style.display = 'none';
            });
        }

        // 當點擊導航按鈕時，顯示對應的按鈕組
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // 如果按鈕沒有 category 則表示是其他功能（例如返回首頁）
                if (category) {
                    hideAllButtonGroups();
                    const targetGroup = document.getElementById(category);
                    if (targetGroup) {
                        targetGroup.style.display = 'block';
                    }
                }
            });
        });
    }

    // 為每個播放按鈕添加點擊事件
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mediaFiles = JSON.parse(this.getAttribute('data-media')); // 取得按鈕的播放文件列表 (音頻和視頻)
            playQueue = mediaFiles;  // 更新播放隊列
            currentPlayingIndex = 0; // 重置播放索引
            playNext();              // 開始播放隊列中的第一個
        });
    });

    // 播放下一個文件
    function playNext() {
        if (currentPlayingIndex < playQueue.length) {
            const currentMedia = playQueue[currentPlayingIndex];

            if (currentMedia.type === "audio") {
                playAudio(currentMedia.src);
            } else if (currentMedia.type === "video") {
                playVideo(currentMedia.src);
            }
            currentPlayingIndex++;
        }
    }

    // 播放音頻
    function playAudio(audioSrc) {
        audioSource.src = audioSrc;
        audioPlayer.load();
        audioPlayer.style.display = 'block';
        audioPlayer.play();

        // 當音頻播放結束後，自動播放下一個
        audioPlayer.onended = function() {
            playNext();
        };
    }

    // 播放影片
    function playVideo(videoSrc) {
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');

        const videoPlayer = document.createElement('video');
        videoPlayer.src = videoSrc;
        videoPlayer.controls = true;
        videoPlayer.autoplay = true;
        videoPlayer.style.width = "100%";

        videoContainer.appendChild(videoPlayer);
        document.body.appendChild(videoContainer);

        // 添加關閉按鈕
        const closeButton = document.createElement('button');
        closeButton.textContent = "關閉影片";
        closeButton.classList.add('close-video');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(videoContainer);
            playNext(); // 繼續播放下一個文件
        });

        videoContainer.appendChild(closeButton);

        // 當影片結束後，自動播放下一個
        videoPlayer.onended = function() {
            document.body.removeChild(videoContainer);
            playNext();
        };
    }
});
