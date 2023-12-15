import { canvas, c } from "../index.js";

class System {
    constructor(systemType){
        this.systemType = systemType;
        this.entities = []
    }
}

class MovementSystem extends System {
    constructor(systemType){
        super(systemType)
        this.componentRequirements = ["Movement", "Position"];
    }

    update = () => {
        for(let i = 0; i < this.entities.length; i++){
            const entity = this.entities[i];
            let { Movement, Position } = entity.components;

            Position.x += Movement.vX;
            Position.y += Movement.vY;
        }
    }
}

class RenderSystem extends System {
    constructor(systemType){
        super(systemType);
        this.componentRequirements = ["Position", "Sprite"];
    }

    update = () => {
        // remember to clear the canvas
        c.clearRect(0,0, canvas.width, canvas.height)

        for(let i = 0; i < this.entities.length; i++){
            const { Position, Sprite } = this.entities[i].components;

            const { x , y , width , height } = Position;
            const { srcRect, path, sprite } = Sprite;
            const { x : sx,  y : sy , width : sw, height : sh } = srcRect;

            c.beginPath();
            //c.fillStyle = "red";
            //c.fillRect(x,y,width,height);
            c.drawImage(sprite, sx, sy, sw, sh, x, y, width, height,);
            c.stroke();
        }
    }
}

class AnimationSystem extends System {
    constructor(systemType){
        super(systemType);
        this.componentRequirements = ["Position", "Sprite", "Animation"];
    }

    update = (gameTime) => {

        for(let i = 0; i < this.entities.length; i++){
            const entity = this.entities[i];

            const { facing, shouldAnimate } = entity.components["Animation"];

            if(shouldAnimate){
                const currentFrame = Math.floor(
                    (gameTime - entity.components["Animation"]["currentTimeOfAnimation"]) *
                    entity.components["Animation"]["frames"][facing]["move"]["frameSpeedRate"] / 1000
                    ) % entity.components["Animation"]["frames"][facing]["move"]["numFrames"];
    
                entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing]["move"]["srcRect"][currentFrame];
                entity.components["Animation"]["frames"][facing]["move"]["currentFrame"] = currentFrame;
            }
            
        }

    }
}


export {MovementSystem, RenderSystem, AnimationSystem};