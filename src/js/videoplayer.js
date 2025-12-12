export default function videoPlayer() {
    const tag = document.createElement('script');
    const overlay = document.querySelector('.videooverlay'),
        btn = document.querySelector('.about__videoplayer-play'),
        close = document.querySelector('.close'),
        isSticky = document.querySelector('.sticky-wrapper')

    let player;

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function bindTriggers() {
        btn.addEventListener('click', () => {
            isSticky.classList.remove('sticky-wrapper')
            if (document.querySelector('iframe#frame')) {
                overlay.style.display = 'flex';
            } else {
                createPlayer();
            }
        })
    }


    function createPlayer() {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M9mA2HCu4S8',
        });

        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'
    }
    function bindCloseBtn() {
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            isSticky.classList.add('sticky-wrapper')
            document.body.style.overflow = 'visible'
            player.stopVideo();
        });
    }

    bindTriggers()
    bindCloseBtn()

}