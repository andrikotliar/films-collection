<template>
    <div class="trailers-modal" @click="closeModalWithLayer">
        <div class="trailers-modal__content">
            <iframe class="trailers-modal__video" width="853" height="480" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <button class="trailers-modal__close" @click="closeModal">
            <img src="images/icons/close.svg" alt="">
        </button>
    </div>
</template>
<script>
    export default {
        name: 'TailersModal',
        props: {
            currentVideo: String
        },
        methods: {
            closeModal() {
                let trailersModal = document.querySelector('.trailers-modal');
                trailersModal.classList.remove('trailers-modal--visible');
                let trailersVideo = document.querySelector('.trailers-modal__video');
				trailersVideo.removeAttribute('src');
                document.body.style.overflow = '';
            },
            closeModalWithLayer(e) {
				if(e.target.classList.contains('trailers-modal')) {
                    this.closeModal();
                }
			}
        }
    }
</script>
<style>
    .trailers-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.8);
        visibility: hidden;
        opacity: 0;
        transition: .2s;
        z-index: 9999;
        padding: 50px;
    }
    .trailers-modal__content {
        position: absolute;
        height: 90vh;
        width: 80vw;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    @media (max-width: 990px) {
        .trailers-modal__content {
            height: 50vh;
        }
    }
    @media (max-width: 700px) {
        .trailers-modal__content {
            height: 30vh;
        }
    }
    .trailers-modal--visible {
        visibility: visible;
        opacity: 1;
    }
    .trailers-modal__video {
	    width: 100%;
	    height: 100%; 
        background-color: #000;  
    }
    .trailers-modal__close {
        position: absolute;
        top: 20px;
        right: 20px;
        border: none;
        background: none;
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
</style>