export default class Controls {
    constructor(container) {
        document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case 37: //left
                    break;
                case 38: // up
                    break;
                case 39: // right
                    break;
                case 40: // down
                    break;            
            }
        })
    }
}

/*
left = 37
up = 38
right = 39
down = 40*/