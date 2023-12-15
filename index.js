import Registry from "./classes/Registry.js";

export const canvas = document.getElementById("gameScreen");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext("2d");

class Game {
    constructor() {
        this.player = undefined;
        this.registry = new Registry()
    }

    initialise = () => {
        
        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("RenderSystem");

        const dummyPositionComponent = {
            name: "Position",
            value: {
                x: 0,
                y: 0,
                height: 50,
                width: 50
            }
        }

        const dummyMovementConponent = {
            name: "Movement",
            value: {
                vX: 0,
                vY: 0
            }
        }

        this.player = this.registry.createEntity([dummyMovementConponent, dummyPositionComponent]);
        this.registry.addEntityToSystem(this.player);
        console.log(this.registry.systems);

        // handle user input
        document.addEventListener("keyup", this.userInput)
        document.addEventListener("keydown", this.userInput)


    }

    update = () => {
       
        // this continuously updates game
        this.registry.getSystem("MovementSystem").update();
        this.registry.getSystem("RenderSystem").update();
        requestAnimationFrame(this.update);

    }

    render = () => {
        // this continuously renders game
        requestAnimationFrame(this.render);
    }

    userInput = (e) => {

        const {key, type} = e;

        if(this.player){
            let playerMovementComponent = this.player.components["Movement"];

            if(type === "keydown"){
                switch(key){
                    case "w":
                        playerMovementComponent.vY -= 1;
                        break;
                    case "a":
                        playerMovementComponent.vX  -= 1;
                        break;
                    case "s":
                        playerMovementComponent.vY += 1;
                        break;
                    case "d":
                        playerMovementComponent.vX += 1;
                        break;
                    default:
                        break;
                }
            } else if(type === "keyup"){
                switch (key){
                    case "w":
                    case "s":{
                        playerMovementComponent.vY = 0;
                        break;
                    }
                    case "a":
                    case "d":{
                        playerMovementComponent.vX = 0;
                        break;
                    }
                }
            }
        }

    }
}

const game = new Game();
game.initialise();
game.update();
game.render();