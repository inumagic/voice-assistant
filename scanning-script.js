const videos = {
    '3shape': [
        { title: '3Shape - 隱形牙套教學', url: 'https://www.youtube.com/embed/KjflwASw6bM' },
        { title: '3Shape - 植牙教學', url: 'https://www.youtube.com/embed/WOv_cq4CEis' },
        { title: '3Shape - 假牙與支台齒教學', url: 'https://www.youtube.com/embed/oATialhuilI' },
        { title: '3Shape - 複製與導入訂單教學', url: 'https://www.youtube.com/embed/-URfDCTROVM' },
        { title: '3Shape - 植牙與假牙的相連訂單教學', url: 'https://www.youtube.com/embed/1YeG59bdeEg' },

    ],
    'shining': [
        { title: 'Shining - 隱形牙套教學', url: 'https://www.youtube.com/embed/79YopJKsRyo' },
        { title: 'Shining - 植牙教學', url: 'https://www.youtube.com/embed/JCF9EDVyn10' },
        { title: 'Shining - 假牙與支台齒教學', url: 'https://www.youtube.com/embed/pmS_ekhQ-4E' },
        { title: 'Shining - 植牙與假牙的相連訂單教學', url: 'https://www.youtube.com/embed/6rBBuitaEN0' },

    ]
};

function showVideos(device) {
    const videoList = document.getElementById('video-list');
    const deviceTitle = document.getElementById('device-title');

    // 更新標題
    deviceTitle.textContent = `${device === '3shape' ? '3Shape' : 'Shining'} 教學影片`;

    // 清空現有影片
    videoList.innerHTML = '';

    // 加入新影片
    videos[device].forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video');
        
        const videoTitle = document.createElement('h3');
        videoTitle.textContent = video.title;
        
        const iframe = document.createElement('iframe');
        iframe.src = video.url;
        iframe.width = '560';
        iframe.height = '315';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        videoDiv.appendChild(videoTitle);
        videoDiv.appendChild(iframe);
        videoList.appendChild(videoDiv);
    });
}
