$(document).ready(function () {
    let playQueue = [];
    let currentPlayingIndex = 0;

    // 隱藏所有按鈕組
    function hideAllButtonGroups() {
        $('.button-group').hide();
    }

    // 當點擊導航按鈕時，顯示對應的按鈕組
    $('.navButton').click(function () {
        const category = $(this).data('category');
        if (category) {
            hideAllButtonGroups();
            $('#' + category).show(); // 顯示對應的按鈕組
        }
    });

    // 為每個播放按鈕添加點擊事件
    $('.playButton').click(function () {
        const mediaFiles = $(this).data('media');
        if (mediaFiles) {
            playQueue = mediaFiles; // 更新播放隊列
            currentPlayingIndex = 0; // 重置播放索引
            playNext(); // 開始播放隊列中的第一個
        }
    });

    // 播放下一個文件
    function playNext() {
        if (currentPlayingIndex < playQueue.length) {
            const currentMedia = playQueue[currentPlayingIndex];

            if (currentMedia.type === "audio") {
                playAudio(currentMedia.src);
            } else if (currentMedia.type === "video") {
                playVideo(currentMedia.src);
            } else if (currentMedia.type === "youtube") {
                playYouTube(currentMedia.src);
            }
            currentPlayingIndex++; // 播放完當前項目後，自增索引
        }
    }

    // 播放音頻
    function playAudio(audioSrc) {
        const audioPlayer = document.getElementById('audioPlayer');
        const audioSource = document.getElementById('audioSource');

        audioSource.src = audioSrc;
        audioPlayer.load(); // 使用原生 JavaScript 來重新載入音頻
        $('#audioPlayer').removeClass('d-none'); // 顯示播放器
        audioPlayer.play(); // 使用原生 JavaScript 來播放音頻

        // 當音頻播放結束後，自動播放下一個
        audioPlayer.onended = function () {
            playNext();
        };
    }

    // 播放本地影片
    function playVideo(videoSrc) {
        const $videoContainer = $('<div>').addClass('video-container text-center my-4');
        const $videoPlayer = $('<video>', {
            src: videoSrc,
            controls: true,
            autoplay: true,
            css: { width: '100%', maxHeight: '500px' }
        });

        const $closeButton = $('<button>', {
            text: '關閉影片',
            class: 'close-video btn btn-danger mt-3',
            click: function () {
                $videoContainer.remove();
                playNext(); // 繼續播放下一個文件
            }
        });

        $videoContainer.append($videoPlayer).append($closeButton);
        $('body').append($videoContainer);

        // 當影片結束後，自動播放下一個
        $videoPlayer.on('ended', function () {
            $videoContainer.remove(); // 移除當前影片容器
            playNext(); // 播放下一個項目
        });
    }

    // 播放 YouTube 影片
    function playYouTube(youtubeUrl) {
        const $videoContainer = $('<div>').addClass('youtube-container text-center my-4');

        const $iframe = $('<iframe>', {
            src: youtubeUrl + "?autoplay=1",
            frameborder: 0,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowfullscreen: true,
            css: {
                width: '100%',
                height: '500px'
            }
        });

        const $closeButton = $('<button>', {
            text: '關閉影片',
            class: 'close-video btn btn-danger mt-3',
            click: function () {
                $videoContainer.remove();
                playNext(); // 繼續播放下一個文件
            }
        });

        $videoContainer.append($iframe).append($closeButton);
        $('body').append($videoContainer);

        // 假設 YouTube 影片自動播放結束後繼續播放下一個文件
        $iframe.on('ended', function () {
            $videoContainer.remove(); // 移除當前 YouTube 容器
            playNext(); // 播放下一個項目
        });
    }
});
