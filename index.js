
const canvas = document.getElementById("gameScreen");
const c = canvas.getContext("2d");

class Game {
    constructor() {
        this.player = undefined;
    }

    initialise = () => {
        this.player = {
            x: 0,
            y: 0,
            height: 50,
            width: 60
        }

        // handle user input
        document.addEventListener("keyup", this.userInput)
        document.addEventListener("keydown", this.userInput)


    }

    update = () => {
       
        // this continuously updates game
        requestAnimationFrame(this.update);

    }

    render = () => {
        const {x, y, width, height} = this.player;

        // remember to clear the canvas
        c.clearRect(0,0, 1000, 1000)

        c.beginPath();
        c.fillStyle = "red";
        c.fillRect(x,y,height,width);
        c.stroke();

        // this continuously renders game
        requestAnimationFrame(this.render);
    }

    userInput = (e) => {

        const {key, type} = e;

        if(this.player){
            if(type === "keydown"){
                switch(key){
                    case "w":
                        this.player.y -= 1;
                        break;
                    case "a":
                        this.player.x -= 1;
                        break;
                    case "s":
                        this.player.y += 1;
                        break;
                    case "d":
                        this.player.x += 1;
                        break;
                    default:
                        break;
                }
            }
        }

    }



}

const game = new Game();
game.initialise();
game.update();
game.render();