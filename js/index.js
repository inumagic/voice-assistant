$(document).ready(function () {
    let playQueue = [];
    let currentPlayingIndex = 0;

    $.getJSON('json/buttons.json', function (data) {
        const container = $('#buttonContainer');
        data.categories.forEach(function (category) {
            const buttonGroup = $('<div>').addClass('button-group grid-container').attr('id', category.id).hide();

            category.buttons.forEach(function (button) {
                const btn = $('<button>')
                    .addClass('btn btn-primary w-100 playButton')
                    .text(button.text)
                    .attr('data-media', JSON.stringify(button.media)); // 將物件轉換為 JSON 字串

                buttonGroup.append(btn);
            });
            container.append(buttonGroup);
        });

        // 按鈕點擊事件
        $('.playButton').click(function () {
            const mediaFiles = $(this).data('media');
            if (mediaFiles) {
                playQueue = mediaFiles; // 直接使用解析過的物件
                currentPlayingIndex = 0;
                playNext();
            }
        });

        $.getJSON('json/navigation.json', function (data) {
            const container = $('#navContainer');
            data.forEach(function (item) {
                let buttonClass = item.type === "internal" ? "btn btn-primary navButton" : "btn btn-secondary";
                const button = $('<button>').addClass(buttonClass).text(item.label);

                if (item.id) {
                    button.attr('data-category', item.id);
                }

                if (item.url) {
                    button.attr('onclick', "location.href='" + item.url + "'");
                }

                container.append(button);
            });

            // 按鈕生成後的其他初始化代碼，例如綁定點擊事件等
            // 當點擊導航按鈕時，顯示對應的按鈕組
            $('.navButton').click(function () {
                const category = $(this).data('category');
                if (category) {
                    hideAllButtonGroups();
                    $('#' + category).show();
                }
            });
        });
    });

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
