document.addEventListener("DOMContentLoaded", function() {
    const terminal = document.getElementById("terminal");
    const commands = [
        "Zidd@Computer:~$ ls",
        "Desktop Gallery",
        "Zidd@Computer:~$ cd Gallery"
    ];

    let index = 0;

    function typeCommand(command, callback) {
        let i = 0;
        const interval = setInterval(() => {
            terminal.innerHTML += command.charAt(i);
            i++;
            if (i >= command.length) {
                clearInterval(interval);
                terminal.innerHTML += '<br>';
                callback();
            }
        }, 300);
    }

    function executeCommands() {
        if (index < commands.length) {
            typeCommand(commands[index], () => {
                if (commands[index] === "Zidd@Computer:~$ cd Gallery") {
                    setTimeout(() => {
                        document.querySelector('.screen').style.display = 'none';
                        document.getElementById("modal").style.display = "block";
                    }, 100);
                }
                index++;
                executeCommands();
            });
        }
    }

    executeCommands();

    const modals = document.querySelectorAll(".modal");
    const galleryIcon = document.getElementById("gallery-icon");
    const closeButtons = document.querySelectorAll(".close");
    const modalIcons = document.querySelectorAll(".modal-icons .icon");

    galleryIcon.addEventListener("click", function() {
        document.getElementById("modal").style.display = "block";
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            button.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });

    modalIcons.forEach(icon => {
        icon.addEventListener("click", function() {
            const targetModalId = icon.getAttribute("data-target");
            document.getElementById(targetModalId).style.display = "block";
        });
    });

    const images = document.querySelectorAll(".gallery img");

    images.forEach(image => {
        image.addEventListener("click", () => {
            const src = image.getAttribute("src");
            const fullSizeImage = document.getElementById("full-size-image");
            fullSizeImage.setAttribute("src", src);
            document.getElementById("image-modal").style.display = "block";
        });
    });

    const clickSound = document.getElementById('click-sound');
    clickSound.play().catch(error => {
        console.log('Autoplay failed:', error);
    });
    
});

document.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.getElementById('click-sound');
    
    // Restore audio playback position
    if (localStorage.getItem('audioTime')) {
        audio.currentTime = parseFloat(localStorage.getItem('audioTime'));
    }
    
    // Save audio playback position
    audio.addEventListener('timeupdate', () => {
        localStorage.setItem('audioTime', audio.currentTime);
    });
});

