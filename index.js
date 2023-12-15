import { LINK_ANIMATION } from "./animations/animations.js";
import Registry from "./classes/Registry.js";

export const canvas = document.getElementById("gameScreen");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext("2d");

class Game {
    constructor() {
        this.player = undefined;
        this.registry = new Registry()
        this.gameTime = Date.now();
    }

    initialise = () => {
        
        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");

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

        const dummySpriteComponent = {
            name: "Sprite",
            value: {
                path: "./assets/link.png",
                srcRect: {
                    x: 58,
                    y: -1,
                    width: 19,
                    height: 19
                }
            } 
        }

        this.player = this.registry.createEntity([dummyMovementConponent, dummyPositionComponent, dummySpriteComponent, LINK_ANIMATION]);
        this.registry.addEntityToSystem(this.player);
        console.log(this.player);

        // handle user input
        document.addEventListener("keyup", this.userInput)
        document.addEventListener("keydown", this.userInput)


    }

    update = () => {

        this.gameTime = Date.now();
       
        // this continuously updates game
        this.registry.getSystem("MovementSystem").update();
        this.registry.getSystem("RenderSystem").update();
        this.registry.getSystem("AnimationSystem").update(this.gameTime);
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
            let playerAnimationComponent = this.player.components["Animation"];
            if(type === "keydown"){
                switch(key){
                    case "w": {
                        playerAnimationComponent.shouldAnimate = true;
                        playerAnimationComponent.facing = "up";
                        playerMovementComponent.vY = -1;
                        break;
                    }
                    case "a": {
                        playerAnimationComponent.shouldAnimate = true;
                        playerAnimationComponent.facing = "left"
                        playerMovementComponent.vX  = -1;
                        break;
                    }
                    case "s": {
                        playerAnimationComponent.shouldAnimate = true;
                        playerAnimationComponent.facing = "down";
                        playerMovementComponent.vY = 1;
                        break;
                    }
                    case "d": {
                        playerAnimationComponent.shouldAnimate = true;
                        playerAnimationComponent.facing = "right";
                        playerMovementComponent.vX = 1;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            } else if(type === "keyup"){
                switch (key){
                    case "w":
                    case "s":{
                        playerAnimationComponent.shouldAnimate = false;
                        playerMovementComponent.vY = 0;
                        break;
                    }
                    case "a":
                    case "d":{
                        playerAnimationComponent.shouldAnimate = false;
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