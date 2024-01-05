import { LINK_ANIMATION } from "./animations/animations.js";
import Registry from "./classes/Registry.js";
import { openingScreen, shop } from "./screens/screens.js";

export const canvas = document.getElementById("gameScreen");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext("2d");
const TILE_SIZE = 70;

class Game {
    constructor() {
        this.player = undefined;
        this.registry = new Registry()
        this.gameTime = Date.now();
        this.isDebug = true;
        this.eventBus = [];

        //screen size
        this.numRows = 13;
        this.numCols = 18;
    }

    initialise = () => {
        
        this.registry.addSystem("CollisionSystem");
        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");
        this.registry.addSystem("TransitionSystem");
        
        this.createPlayer();

        // handle user input
        document.addEventListener("keyup", this.userInput)
        document.addEventListener("keydown", this.userInput)

        this.loadScreen(openingScreen);

    }

    update = () => {

        this.gameTime = Date.now();

        const event = this.eventBus[this.eventBus.length - 1];
        if(event){
            /*
            {
                args: {
                    screen,
                    coX,
                    coY,
                    eventTime : number
                },
                func: Function
            }
            */
            const {args, func} = event;
            if(args.eventTime <= this.gameTime){
                func(args);
                this.eventBus.pop();
            }
            

        }
       
        // this continuously updates game
        this.registry.update();
        this.registry.getSystem("CollisionSystem").update(this.player);
        this.registry.getSystem("MovementSystem").update();
        this.registry.getSystem("TransitionSystem").update(this.player, this.eventBus, this.loadNewScreen);
        requestAnimationFrame(this.update);

    }

    render = () => {
        // this continuously renders game
        this.registry.getSystem("RenderSystem").update(this.isDebug);
        this.registry.getSystem("AnimationSystem").update(this.gameTime);
        requestAnimationFrame(this.render);
    }

    loadNewScreen = ({coX, coY, screen}) => {

        this.registry.removeAllEntities();

        let newScreenObject;
        switch(screen){
            case "shop": {
                newScreenObject = shop;
                break;
            }
            default:
                break;
        }

        this.createPlayer(coX, coY);
        this.loadScreen(newScreenObject);        

    }

    createPlayer = (coX, coY) => {
        let newComponents = [];
        if(this.player){
            const {components} = this.player;
            Object.values(components).forEach((component) => {

                if(component.componentType === "Position"){
                    component.x = coX * TILE_SIZE;
                    component.y = coY * TILE_SIZE;
                }

                if(component.componentType == "Sprite"){
                    component.path = component.sprite.src;
                }
                newComponents.push({name: component.componentType, value: {...component}});
            })
            newComponents.push(LINK_ANIMATION);

        } else {

            const dummyPositionComponent = {
                name: "Position",
                value: {
                    x: 500,
                    y: 500,
                    height: TILE_SIZE - 15,
                    width: TILE_SIZE - 15
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
    
            const dummyCollisionComponent = {
                name: "Collision"
            }

            newComponents = [dummyCollisionComponent, dummyPositionComponent, dummySpriteComponent, dummyMovementConponent, LINK_ANIMATION]

        }
        this.player = this.registry.createEntity(newComponents);


        console.log("New components", newComponents);
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
                        playerMovementComponent.vY = -5;
                        break;
                    }
                    case "a": {
                        playerAnimationComponent.shouldAnimate = true;
                        playerAnimationComponent.facing = "left"
                        playerMovementComponent.vX  = -5;
                        break;
                    }
                    case "s": {
                        playerAnimationComponent.shouldAnimate = true;
                        playerAnimationComponent.facing = "down";
                        playerMovementComponent.vY = 5;
                        break;
                    }
                    case "d": {
                        playerAnimationComponent.shouldAnimate = true;
                        playerAnimationComponent.facing = "right";
                        playerMovementComponent.vX = 5;
                        break;
                    }
                    case "g": {
                        this.isDebug = !this.isDebug;
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

    loadScreen = (screenObject) => {

        for(let i = 0; i < this.numRows; i++){
            for(let j = 0; j < this.numCols; j++){

                let components = [];

                let tile = screenObject.screen[i][j];
                let srcRect = undefined;
                let path = '';

                if(typeof tile === "number"){
                    path = "tiles/";
                } else if(typeof tile === "string"){
                    path = "collidables/";
                    const dummyCollisionComponent = {
                        name: "Collision",

                    }
                    components.push(dummyCollisionComponent);
                } else if(typeof tile === "object"){
                    /*
                    {
                        type: string - "door", "actionablefile"
                        tile: string/number - 0
                        coX: number
                        coY: number
                        screen: string
                    }

                    */

                    const {type} = tile;
                    if(type === "door"){
                        const {coX, coY, screen} = tile;
                        const dummyTransitionComponent = {
                            name: "Transition",
                            value: {coX, coY, screen}
                        };

                        components.push(dummyTransitionComponent);
                    }

                    path = "actionableTiles/";

                    tile = tile.tile;

                } else if (typeof tile === "undefined"){
                    continue;
                }

                const {assetPath} = screenObject;

                const dummySpriteComponent = {
                    name: "Sprite",
                    value: {
                        path: assetPath + path + tile + ".png",  // tiles/0.png
                        srcRect
                    }
                }

                components.push(dummySpriteComponent);

                const dummyPositionComponent = {
                    name: "Position",
                    value: {
                        x: j * TILE_SIZE,
                        y: i * TILE_SIZE,
                        width: TILE_SIZE,
                        height: TILE_SIZE
                    }
                }

                components.push(dummyPositionComponent);

                this.registry.createEntity(components);
            }
        }
    }

}

const game = new Game();
game.initialise();
game.update();
game.render();